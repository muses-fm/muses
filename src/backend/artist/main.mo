import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";

import Curator "canister:curator";

import Databases "./databases";
import Types "./types";

actor Artist {
  type ArtistProfile = Types.ArtistProfile;
  type ArtistProfileId = Types.ArtistProfileId;
  type Submission = Types.Submission;
  type SubmissionId = Types.SubmissionId;

  stable var artistStore : [(ArtistProfileId, ArtistProfile)] = [];
  let artists : Databases.ArtistDB = Databases.ArtistDB(artistStore);

  stable var submissionStore : [(SubmissionId, Submission)] = [];
  let submissions : Databases.SubmissionDB = Databases.SubmissionDB(submissionStore);

  public shared(msg) func submitTrack(spotifyTrackId : Text) : async Submission {
    let artist = artists.get(msg.caller);
    let submission = submissions.create(spotifyTrackId);
    let update : ArtistProfile = {
      id = artist.id;
      submissions = Array.append<Nat>(artist.submissions, [submission.id]);
    };
    artists.update(update);
    // TODO: curatorsIds should be generated from some sort of track-curator matching algorithm
    let curatorIds = await Curator.getAllCuratorIds();
    for (x in Iter.fromArray<Principal>(curatorIds)) {
      await Curator.receiveSubmission(x, submission.id);
    };
    submission;
  };

  public shared(msg) func getSubmissions() : async [Submission] {
    let artist = artists.get(msg.caller);
    Array.mapFilter<SubmissionId, Submission>(artist.submissions, func x { submissions.find(x) });
  };

  public func getSubmission(id : SubmissionId) : async ?Submission {
    submissions.find(id);
  };

  public shared(msg) func getAllReviews() : async [Curator.Review] {
    let artist = artists.get(msg.caller);
    return await Curator.getReviewsBySubmissions(artist.submissions);
  };

  system func preupgrade() {
    // save databases to stable variable before upgrade
    artistStore := artists.toArray();
    submissionStore := submissions.toArray();
  };

  system func postupgrade() {
    // empty the stores after upgrading to free memory
    artistStore := [];
    submissionStore := [];
  }
};

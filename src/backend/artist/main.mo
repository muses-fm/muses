import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";

import Curator "canister:curator";

import Databases "./databases";
import Types "./types";

actor Artist {
  type ArtistProfile = Types.ArtistProfile;
  type Submission = Types.Submission;
  type SubmissionId = Types.SubmissionId;

  // FIXME: these should be `stable` vars
  var artists : Databases.ArtistDB = Databases.ArtistDB();
  var submissions : Databases.SubmissionDB = Databases.SubmissionDB();

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
};

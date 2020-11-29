import Array "mo:base/Array";

import Databases "./databases";
import Types "./types";

actor {
  type ArtistProfile = Types.ArtistProfile;
  type Submission = Types.Submission;
  type SubmissionId = Types.SubmissionId;

  // FIXME: these should be `stable` vars
  var artists : Databases.ArtistDB = Databases.ArtistDB();
  var submissions : Databases.SubmissionDB = Databases.SubmissionDB();

  public shared(msg) func submitTrack(url : Text) : async Submission {
    let artist = artists.get(msg.caller);
    let submission = submissions.create(url);
    let update : ArtistProfile = {
      id = artist.id;
      submissions = Array.append<Nat>(artist.submissions, [submission.id]);
    };
    artists.update(update);
    submission;
  };

  public shared(msg) func getSubmissions() : async [Submission] {
    let artist = artists.get(msg.caller);
    Array.filterMap<SubmissionId, Submission>(artist.submissions, func x { submissions.find(x) });
  };

  public func getSubmission(id : SubmissionId) : async ?Submission {
    submissions.find(id);
  };
};

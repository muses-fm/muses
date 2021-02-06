import Array "mo:base/Array";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

import Types "./types";

module {
  type ArtistProfile = Types.ArtistProfile;
  type ArtistProfileId = Types.ArtistProfileId;
  type Submission = Types.Submission;
  type SubmissionId = Types.SubmissionId;

  public class ArtistDB() {
    func isEq(x: ArtistProfileId, y: ArtistProfileId): Bool { x == y };
    let hashMap = HashMap.HashMap<ArtistProfileId, ArtistProfile>(1, isEq, Principal.hash);

    public func create(principal : ArtistProfileId) : ArtistProfile {
      let profile : ArtistProfile = {
        id = principal;
        submissions = [];
      };
      hashMap.put(principal, profile);
      profile;
    };

    public func find(principal: ArtistProfileId): ?ArtistProfile {
      hashMap.get(principal);
    };

    public func get(userId: ArtistProfileId): ArtistProfile {
      let profile = find(userId);
      switch (profile) {
        case (?profile) { profile };
        case (null) { create(userId) };
      };
    };

    public func update(profile : ArtistProfile) {
      hashMap.put(profile.id, profile);
    };
  };

  public class SubmissionDB() {
    func isEq(x: SubmissionId, y: SubmissionId): Bool { x == y };
    let hashMap = HashMap.HashMap<SubmissionId, Submission>(1, isEq, Hash.hash);
    var nextId : SubmissionId = 1;

    public func create(spotifyTrackId_ : Text) : Submission {
      let submission = {
        id = nextId;
        spotifyTrackId = spotifyTrackId_;
      };
      hashMap.put(nextId, submission);
      nextId += 1;
      submission;
    };

    public func find(id : Nat) : ?Submission {
      hashMap.get(id);
    };
  }
}

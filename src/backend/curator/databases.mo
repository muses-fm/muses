import Array "mo:base/Array";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

import Types "./types";


module {
  type Profile = Types.Profile;
  type ProfileId = Types.ProfileId;
  type Playlist = Types.Playlist;
  type PlaylistId = Types.PlaylistId;
  type ReviewId = Types.ReviewId;
  type Review = Types.Review;
  type SubmissionId = Types.SubmissionId;
  type Submission = Types.Submission;

  public class CuratorDB() {
    func isEq(x: ProfileId, y: ProfileId): Bool { x == y };
    let hashMap = HashMap.HashMap<ProfileId, Profile>(1, isEq, Principal.hash);

    public func create(principal : ProfileId) : Profile {
      let profile : Profile = {
        id = principal;
        playlists = [];
        reviewed = [];
        pending = [];
      };
      hashMap.put(principal, profile);
      profile;
    };

    public func find(principal: ProfileId): ?Profile {
      hashMap.get(principal);
    };

    public func findAllIds() : [ProfileId] {
      var profiles : [ProfileId] = [];
      for ((id, profile) in hashMap.entries()) {
        profiles := Array.append<ProfileId>(profiles, [profile.id]);
      };
      profiles;
    };

    public func get(userId: ProfileId): Profile {
      let profile = find(userId);
      switch (profile) {
        case (?profile) { profile };
        case (null) { create(userId) };
      };
    };

    public func update(profile : Profile) {
      hashMap.put(profile.id, profile);
    };
  };

  public class PlaylistDB() {
    func isEq(x: PlaylistId, y: PlaylistId): Bool { x == y };
    let hashMap = HashMap.HashMap<PlaylistId, Playlist>(1, isEq, Hash.hash);
    var nextId : PlaylistId = 1;

    public func create(spotifyPlaylistId_ : Text) : ?Playlist {
      let existing = findBySpotifyPlaylistId(spotifyPlaylistId_);
      switch (existing) {
        case (?existing) { return null; };
        case (null) { () };
      };

      let playlist : Playlist = {
        id = nextId;
        spotifyPlaylistId = spotifyPlaylistId_;
      };
      hashMap.put(nextId, playlist);
      nextId += 1;
      ?playlist;
    };

    public func find(id : Nat): ?Playlist {
      hashMap.get(id);
    };

    public func findBySpotifyPlaylistId(spotifyPlaylistId : Text) : ?Playlist {
      for ((id, playlist) in hashMap.entries()) {
        if (spotifyPlaylistId == playlist.spotifyPlaylistId) {
          return ?playlist;
        };
      };
      return null;
    };
  };

  public class ReviewDB() {
    func isEq(x: ReviewId, y: ReviewId): Bool { x == y};
    let hashMap = HashMap.HashMap<ReviewId, Review>(1, isEq, Hash.hash);
    var nextId : ReviewId = 1;

    public func create(content_: Text, submissionId_: SubmissionId) : async ?Review {
      // TODO: prevent creating reviews for non-existing submissions
      let review : Review = {
        id = nextId;
        content = content_;
        submissionId = submissionId_;
      };
      hashMap.put(nextId, review);
      nextId += 1;
      return ?review;
    }
  };
}

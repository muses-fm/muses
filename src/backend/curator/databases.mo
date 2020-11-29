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

    public func create(url_ : Text) : ?Playlist {
      let existing = findByUrl(url_);
      switch (existing) {
        case (?existing) { return null; };
        case (null) { () };
      };

      let playlist : Playlist = {
        id = nextId;
        url = url_;
      };
      hashMap.put(nextId, playlist);
      nextId += 1;
      ?playlist;
    };

    public func find(id : Nat): ?Playlist {
      hashMap.get(id);
    };

    public func findByUrl(url : Text) : ?Playlist {
      for ((id, playlist) in hashMap.entries()) {
        if (url == playlist.url) {
          return ?playlist;
        };
      };
      return null;
    };
  };
}

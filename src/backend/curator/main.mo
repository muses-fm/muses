import Array "mo:base/Array";
import Option "mo:base/Option";

import Databases "./databases";
import Types "./types";
import Utils "./utils";

actor Curator {
  type PlaylistId = Types.PlaylistId;
  type Playlist = Types.Playlist;
  type Profile = Types.Profile;

  // FIXME: these should be `stable` vars
  var curators : Databases.CuratorDB = Databases.CuratorDB();
  var playlists : Databases.PlaylistDB = Databases.PlaylistDB();
  var reviews : Databases.ReviewDB = Databases.ReviewDB();

  public shared(msg) func qualifyPlaylist(url : Text) : async ?Playlist {
    let isQualified = Utils.checkPlaylist(url);
    if (not isQualified) {
      return null;
    };

    let playlist = playlists.create(url);
    switch (playlist) {
      case (?playlist) {
        let curator = curators.get(msg.caller);
        let update : Profile = {
          id = curator.id;
          playlists = Array.append<PlaylistId>(curator.playlists, [playlist.id]);
          reviewed = curator.reviewed;
          pending = curator.pending;
        };
        curators.update(update);
      };
      // TODO: return proper error
      case (null) { return null };
    };

    playlist;
  };
};

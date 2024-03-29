import Array "mo:base/Array";
import Error "mo:base/Error";
import Option "mo:base/Option";

import Databases "./databases";
import Types "./types";
import Utils "./utils";

actor Curator {
  type CuratorProfileId = Types.CuratorProfileId;
  type CuratorProfile = Types.CuratorProfile;
  type PlaylistId = Types.PlaylistId;
  type Playlist = Types.Playlist;
  type Review = Types.Review;
  type ReviewId = Types.ReviewId;
  type SubmissionId = Types.SubmissionId;

  stable var curatorStore : [(CuratorProfileId, CuratorProfile)] = [];
  let curators : Databases.CuratorDB = Databases.CuratorDB(curatorStore);

  stable var playlistStore : [(PlaylistId, Playlist)] = [];
  let playlists : Databases.PlaylistDB = Databases.PlaylistDB(playlistStore);

  stable var reviewStore : [(ReviewId, Review)] = [];
  let reviews : Databases.ReviewDB = Databases.ReviewDB(reviewStore);

  public shared(msg) func qualifyPlaylist(spotifyPlaylistId : Text) : async ?Playlist {
    let isQualified = Utils.checkPlaylist(spotifyPlaylistId);
    if (not isQualified) {
      throw Error.reject("Playlist cannot be qualified");
    };

    let playlist = playlists.create(spotifyPlaylistId);
    switch (playlist) {
      case (?playlist) {
        let curator = curators.get(msg.caller);
        let update : CuratorProfile = {
          id = curator.id;
          playlists = Array.append<PlaylistId>(curator.playlists, [playlist.id]);
          reviewed = curator.reviewed;
          pending = curator.pending;
        };
        curators.update(update);
      };
      case (null) {
        throw Error.reject("Playlist already exists")
      };
    };

    playlist;
  };

  public func getAllCuratorIds() : async [CuratorProfileId] {
    curators.findAllIds();
  };

  public shared(msg) func getPlaylists() : async [Playlist] {
    let curator = curators.get(msg.caller);
    Array.mapFilter<PlaylistId, Playlist>(curator.playlists, func x { playlists.find(x) });
  };

  public func receiveSubmission(curatorId: CuratorProfileId, submissionId: SubmissionId) : async () {
    let curator = curators.find(curatorId);
    switch (curator) {
      case (?curator) {
        let update : CuratorProfile = {
          id = curator.id;
          playlists = curator.playlists;
          reviewed = curator.reviewed;
          // TODO: prevent duplicates
          pending = Array.append<SubmissionId>(curator.pending, [submissionId]);
        };
        curators.update(update);
        return ();
      };
      case (null) {
        throw Error.reject("Curator with such id does not exist");
      };
    }
  };

  public shared(msg) func getPendingSubmissions() : async [SubmissionId] {
    let curator = curators.get(msg.caller);
    return curator.pending;
  };

  // FIXME: the `playlistId` should be of type `?PlaylistId`.
  // However, we currently do not know how to send an "opt Nat" argument from the frontend, so we use the value
  // zero to represent a null value.
  public shared(msg) func reviewSubmission(submissionId: SubmissionId, content: Text, playlistId: PlaylistId) : async ?Review {
    let curator = curators.get(msg.caller);
    let remainingPendingSubmissions = Array.filter<SubmissionId>(curator.pending, func x { x != submissionId });
    var review: ?Review = null;
    if (remainingPendingSubmissions.size() < curator.pending.size()) {
      let update : CuratorProfile = {
        id = curator.id;
        playlists = curator.playlists;
        reviewed = Array.append<SubmissionId>(curator.reviewed, [submissionId]);
        pending = remainingPendingSubmissions;
      };
      curators.update(update);
      // TODO: find out how to send an "opt Nat" argument from the frontend
      let sanitizedPlailistId : ?PlaylistId = if (playlistId == 0) { null } else { ?playlistId };
      review := await reviews.create(content, submissionId, sanitizedPlailistId);
    };

    return review;
  };

  public func getReviewsBySubmissions(submissionIds : [SubmissionId]) : async [Review] {
    return await reviews.getReviewsBySubmissions(submissionIds);
  };

  public shared(msg) func getAllReviews() : async [Review] {
    let curator = curators.get(msg.caller);
    return await reviews.getReviewsBySubmissions(curator.reviewed);
  };

  system func preupgrade() {
    // save databases to stable variable before upgrade
    curatorStore := curators.toArray();
    playlistStore := playlists.toArray();
    reviewStore := reviews.toArray();
  };

  system func postupgrade() {
    // empty the stores after upgrading to free memory
    curatorStore := [];
    playlistStore := [];
    reviewStore := [];
  }
};

import Array "mo:base/Array";

actor Curators {
  type Curator = {
    spotifyId : Text;
    playlistUrls: [Text];
    pendingSubmissionsIds : [Nat];
    reviewedSubmissionsIds : [Nat];
  };

  stable var curators : [Curator] = [];

  public func register(spotifyId_ : Text, playlistUrl : Text) : async () {
    // TODO: check that no other curator has the same spotifyId
    let curator : Curator = {
      spotifyId = spotifyId_;
      playlistUrls = [playlistUrl];
      pendingSubmissionsIds = [];
      reviewedSubmissionsIds = [];
    };
    curators := Array.append<Curator>([curator], curators);
  };


  public func getAll() : async [Curator] {
    return curators;
  };
};

import Principal "mo:base/Principal";
import ArtistTypes "../artist/types"

module {
  public type ProfileId = Principal;
  public type ReviewId = Nat;
  public type PlaylistId = Nat;

  public type SubmissionId = ArtistTypes.SubmissionId;
  public type Submission = ArtistTypes.Submission;

  public type CuratorProfile = {
    id : ProfileId;
    playlists : [PlaylistId];
    reviewed : [SubmissionId];
    pending : [SubmissionId];
  };

  public type Playlist = {
    id : PlaylistId;
    spotifyPlaylistId : Text;
  };

  public type Review = {
    id : ReviewId;
    content : Text;
    submissionId : SubmissionId;
  };
}

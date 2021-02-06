import Principal "mo:base/Principal";

module {
  public type ArtistProfileId = Principal;
  public type SubmissionId = Nat;

  public type ArtistProfile = {
    id : ArtistProfileId;
    submissions : [SubmissionId];
  };

  public type Submission = {
    id : SubmissionId;
    spotifyTrackId : Text;
  };
}

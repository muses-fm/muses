import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Card from "../../components/Card";
import { isValidSpotifyTrackUrl } from "../../utils";

const SubmitTrack = ({ submitTrackCallback }) => {
  const [trackUrl, setTrackUrl] = useState("");
  const [hasError, setHasError] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrackUrl(event.target.value);
  };
  const onFormSubmit = () => {
    if (isValidSpotifyTrackUrl(trackUrl)) {
      const url = new URL(trackUrl);
      submitTrackCallback(url.pathname.replace("/track/", ""));
      setTrackUrl("");
    } else {
      setHasError(true);
    }
  };

  return (
    <Card title="Submit track" sx={{ width: "100%" }}>
      <Box component="form" autoComplete="off">
        <TextField
          required
          label="Spotify Track URL"
          variant="filled"
          fullWidth
          helperText={hasError && `This is not a valid Spotify track URL`}
          error={hasError}
          value={trackUrl}
          onChange={handleChange}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={onFormSubmit}>
          Submit
        </Button>
      </Box>
    </Card>
  );
};

export default SubmitTrack;

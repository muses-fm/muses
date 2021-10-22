import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";

import Card from "../../components/Card";

const ArtistDashboard = () => {
  const match = useRouteMatch();
  const pageUrl = match.url;

  const myTracksLink = {
    path: `${pageUrl}/tracks`,
    label: "My tracks",
  };

  const submitTrackLink = {
    path: `${pageUrl}/submit`,
    label: "Submit a track",
  };

  return (
    <Grid container spacing={4}>
      <Grid item>
        <Card title="My tracks" buttons={[myTracksLink, submitTrackLink]}>
          I have uploaded 9 tracks.
        </Card>
      </Grid>
    </Grid>
  );
};

export default ArtistDashboard;

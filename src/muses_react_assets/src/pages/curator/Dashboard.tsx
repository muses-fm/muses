import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";

import Card from "../../components/Card";

const CuratorDashboard = () => {
  const match = useRouteMatch();
  const pageUrl = match.url;

  const myPlaylistsLink = {
    path: `${pageUrl}/playlists`,
    label: "My playlists",
  };

  const submitPlaylistLink = {
    path: `${pageUrl}/submit`,
    label: "Submit a playlist",
  };

  const myInboxLink = {
    path: `${pageUrl}/inbox`,
    label: "My inbox",
  };

  return (
    <Grid container spacing={4}>
      <Grid item>
        <Card title="My playlists" buttons={[myPlaylistsLink, submitPlaylistLink]}>
          I have submitted 4 playlists.
        </Card>
      </Grid>
      <Grid item>
        <Card title="My inbox" buttons={[myInboxLink]}>
          0 new messages.
        </Card>
      </Grid>
    </Grid>
  );
};

export default CuratorDashboard;

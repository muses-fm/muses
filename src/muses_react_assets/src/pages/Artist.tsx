import { Switch, Route, useRouteMatch } from "react-router-dom";

import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";

import Layout from "../components/Layout";
import ArtistDashboard from "./artist/Dashboard";

const user = { email: "artist@muses.fm", role: "artist", name: "James McArtist" };

const Artist = () => {
  const match = useRouteMatch();
  const pageUrl = match.url;

  const tracksPath = `${pageUrl}/tracks`;
  const submitPath = `${pageUrl}/submit`;

  const drawerLinks = [
    {
      path: "/",
      label: "Home",
      icon: HomeIcon,
    },
    {
      path: pageUrl,
      label: "Dashboard",
      icon: DashboardIcon,
    },
    {
      path: tracksPath,
      label: "My tracks",
      icon: QueueMusicIcon,
    },
    {
      path: submitPath,
      label: "Submit a track",
      icon: FileUploadIcon,
    },
  ];

  return (
    <Layout user={user} links={drawerLinks}>
      <Switch>
        <Route path={tracksPath}>My tracks</Route>
        <Route path={submitPath}>Submit tracks</Route>
        <Route path={pageUrl}>
          <ArtistDashboard />
        </Route>
      </Switch>
    </Layout>
  );
};

export default Artist;

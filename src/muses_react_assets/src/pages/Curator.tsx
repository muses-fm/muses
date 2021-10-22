import { Switch, Route, useRouteMatch } from "react-router-dom";

import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InboxIcon from "@mui/icons-material/Inbox";
import HomeIcon from "@mui/icons-material/Home";

import Layout from "../components/Layout";
import CuratorDashboard from "./curator/Dashboard";

const user = { email: "curator@muses.fm", role: "curator", name: "John McCurator" };

const Curator = () => {
  const match = useRouteMatch();
  const pageUrl = match.url;

  const playlistsPath = `${pageUrl}/playlists`;
  const submitPath = `${pageUrl}/submit`;
  const inboxPath = `${pageUrl}/inbox`;

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
      path: playlistsPath,
      label: "My playlists",
      icon: QueueMusicIcon,
    },
    {
      path: submitPath,
      label: "Submit a playlist",
      icon: FileUploadIcon,
    },
    {
      path: inboxPath,
      label: "My inbox",
      icon: InboxIcon,
    },
  ];

  return (
    <Layout user={user} links={drawerLinks}>
      <Switch>
        <Route path={playlistsPath}>My playlists</Route>
        <Route path={submitPath}>Submit playlist</Route>
        <Route path={inboxPath}>Inbox</Route>
        <Route path={pageUrl}>
          <CuratorDashboard />
        </Route>
      </Switch>
    </Layout>
  );
};

export default Curator;

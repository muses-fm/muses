import { useState } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";

import Layout from "../components/Layout";
import ArtistDashboard from "./artist/Dashboard";
import ArtistTracks from "./artist/MyTracks";
import SubmitTrack from "./artist/SubmitTrack";

const user = { email: "artist@muses.fm", role: "artist", name: "James McArtist" };

const Artist = () => {
  const history = useHistory();
  const [tracks, setTracks] = useState([
    { id: 1, title: "No Good - Remix", artist: "Possession Techno, Arma" },
    { id: 2, title: "Shapeshifter", artist: "Enui" },
    { id: 3, title: "Canto", artist: "L_cio" },
    { id: 4, title: "Asura", artist: "Charlotte De Witte" },
    { id: 5, title: "Woohman", artist: "Kölsch" },
  ]);

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
      path: submitPath,
      label: "Submit a track",
      icon: FileUploadIcon,
    },
  ];

  const onNewTrackSubmitted = (spotifyTrackId: string) => {
    // TODO: make API call to get track info
    const track = {
      id: tracks.length + 1,
      title: spotifyTrackId,
      artist: "James McArtist",
    };
    setTracks([...tracks, track]);
    history.push(pageUrl);
  };

  return (
    <Layout user={user} links={drawerLinks}>
      <Switch>
        <Route path={tracksPath}>
          <ArtistTracks tracks={tracks} />
        </Route>
        <Route path={submitPath}>
          <SubmitTrack submitTrackCallback={onNewTrackSubmitted} />
        </Route>
        <Route path={pageUrl}>
          <ArtistDashboard tracks={tracks} />
        </Route>
      </Switch>
    </Layout>
  );
};

export default Artist;

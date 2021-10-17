import Dashboard from "../components/Dashboard";

const Artist = () => (
  <Dashboard user={{ email: "artist@muses.fm", role: "artist", name: "James Bond" }}>Artist</Dashboard>
);

export default Artist;

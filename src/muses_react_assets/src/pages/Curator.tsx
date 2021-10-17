import Dashboard from "../components/Dashboard";

const Curator = () => (
  <Dashboard user={{ email: "curator@muses.fm", role: "curator", name: "John Doe" }}>Curator</Dashboard>
);

export default Curator;

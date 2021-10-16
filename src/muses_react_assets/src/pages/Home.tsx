import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Muses.fm!
        </Typography>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button component={Link} to="/artist">
            Artist
          </Button>
          <Button component={Link} to="/curator">
            Curator
          </Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
};

export default Home;

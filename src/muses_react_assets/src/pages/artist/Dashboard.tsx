import { useRouteMatch } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

import Card from "../../components/Card";

const ArtistDashboard = ({ tracks }) => {
  const match = useRouteMatch();
  const pageUrl = match.url;

  const submitTrackLink = {
    path: `${pageUrl}/submit`,
    label: "Submit a track",
  };

  const hasSubmittedTracks = tracks.length > 0;

  return (
    <Grid container spacing={4}>
      <Grid item>
        <Card title="My tracks" buttons={[submitTrackLink]} sx={{ minWidth: 500 }}>
          {hasSubmittedTracks ? (
            <List dense>
              {tracks.map((track) => (
                <ListItem
                  key={track.id}
                  disableGutters
                  // secondaryAction={
                  //   <IconButton edge="end" aria-label="delete">
                  //     <DeleteIcon />
                  //   </IconButton>
                  // }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <MusicNoteIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={track.title} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              You haven't submitted any tracks yet.
            </Typography>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default ArtistDashboard;

import { Link } from "react-router-dom";

import MUICard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Card = ({ title, children, buttons = [], sx = {} }) => {
  return (
    <MUICard sx={sx}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {children}
      </CardContent>
      <CardActions>
        {buttons.map(({ label, path }) => (
          <Button key={label} size="small" component={Link} to={path}>
            {label}
          </Button>
        ))}
      </CardActions>
    </MUICard>
  );
};

export default Card;

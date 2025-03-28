import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate } from "react-router";

type Props = {
  activity: Activity;
};

const ActivityCard = ({ activity }: Props) => {
  const { deleteActivity } = useActivities();
  const navigate = useNavigate();

  const handleSelectActivity = () => {
    navigate(`/activities/${activity.id}`);
  };
  const handleDeleteActivity = () => {
    deleteActivity.mutate(activity.id);
  };

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography sx={{ color: "text.secondary", mb: 1 }}>
          {activity.date}
        </Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1">
          {activity.city} / {activity.venue}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Chip label={activity.category} variant="outlined" />
        <Box display="flex" gap={3}>
          <Button
            size="medium"
            variant="contained"
            onClick={handleSelectActivity}
          >
            View
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="error"
            onClick={handleDeleteActivity}
            disabled={deleteActivity.isPending}
          >
            Delete Activity
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ActivityCard;

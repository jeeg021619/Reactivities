import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";

const ActivityDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { activity, isLoadingGetActivity } = useActivities(id);

  if (isLoadingGetActivity) return <Typography>Loading...</Typography>;
  if (!activity) return <Typography>Activity not found</Typography>;

  const handleOpenForm = () => {
    navigate(`/manage/${activity.id}`);
  };
  const handleCancel = () => {
    navigate("/activities");
  };
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia
        component="img"
        src={`/images/categoryImages/${activity.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" fontWeight="light">
          {activity.date}
        </Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={handleOpenForm}>
          Edit
        </Button>
        <Button color="inherit" onClick={handleCancel}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActivityDetails;

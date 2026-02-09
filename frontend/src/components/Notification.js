import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification === null) return null;

  if (notification && notification.includes("error")) {
    return (
      <Alert severity="error" className="notification">
        {notification.substring(6)}
      </Alert>
    );
  }

  return (
    notification && (
      <Alert severity="success" className="notification">
        {notification}
      </Alert>
    )
  );
};

export default Notification;

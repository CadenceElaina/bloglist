import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { updateUserProfile } from "../reducers/userReducer";
import { Button, TextField } from "@mui/material";

const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.find((u) => u.id === id));
  const login = useSelector((state) => state.login);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("");

  if (!user) {
    return null;
  }

  const isOwner = login && login.username === user.username;

  const startEditing = () => {
    setBio(user.bio || "");
    setStatus(user.status || "");
    setEditing(true);
  };

  const handleSave = (event) => {
    event.preventDefault();
    dispatch(updateUserProfile(user.id, { bio, status }));
    setEditing(false);
  };

  return (
    <div>
      <h2>{user.name || user.username}'s profile</h2>
      {user.status && (
        <p style={{ opacity: 0.7, fontStyle: "italic" }}>{user.status}</p>
      )}
      {user.bio && <p>{user.bio}</p>}
      {isOwner && !editing && (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={startEditing}
          sx={{ mb: 1 }}
        >
          edit profile
        </Button>
      )}
      {editing && (
        <form onSubmit={handleSave} style={{ marginBottom: "1rem" }}>
          <div>
            <TextField
              label="status"
              size="small"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{ mb: 1 }}
            />
          </div>
          <div>
            <TextField
              label="bio"
              size="small"
              multiline
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              sx={{ mb: 1 }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
          >
            save
          </Button>{" "}
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={() => setEditing(false)}
          >
            cancel
          </Button>
        </form>
      )}
      <h3>Blogs</h3>
      {user.blogs.length > 0 ? (
        <div className="user">
          <ul>
            {user.blogs.map((blog) => (
              <Link key={blog.id} to={`/blogs/${blog.id}`}>
                {" "}
                <li>{blog.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <p>{user.name || user.username} has no blogs...</p>
      )}
      {user.createdAt && (
        <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>
          member since {new Date(user.createdAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default User;

import { createComment, likeComment } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { Button, Grid, TextField } from "@mui/material";
import { useField } from "../hooks";

const Comments = ({ blog }) => {
  const dispatch = useDispatch();
  const { reset: resetComment, ...comment } = useField("text");

  const { id, comments } = blog;

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(createComment(id, comment));
    resetComment();
  };

  const handleLikeComment = (commentId) => {
    dispatch(likeComment(id, commentId));
  };

  const sorted = [...comments].sort((a, b) => (b.likes || 0) - (a.likes || 0));

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item>
            <TextField
              label="share your thoughts..."
              size="small"
              {...comment}
            />
          </Grid>
          <Grid item alignItems="stretch" style={{ display: "flex" }}>
            <Button
              id="comment-button"
              variant="contained"
              color="primary"
              type="submit"
            >
              Comment
            </Button>
          </Grid>
        </Grid>
      </form>
      {sorted.length > 0 ? (
        <ul>
          {sorted.map((c) => (
            <li key={c.id || c}>
              {c.text || c}{" "}
              {c.id && (
                <>
                  <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                    ({c.likes || 0} likes)
                  </span>{" "}
                  <Button size="small" onClick={() => handleLikeComment(c.id)}>
                    like
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>no comments...</p>
      )}
    </div>
  );
};

export default Comments;

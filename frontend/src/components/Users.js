import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { initializeUsers } from "../reducers/userReducer";

const Users = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);

  const filtered = users.filter(
    (user) =>
      user.username.toLowerCase().includes(filter.toLowerCase()) ||
      (user.name && user.name.toLowerCase().includes(filter.toLowerCase())),
  );

  return (
    <div>
      <h2>Users</h2>
      <TextField
        label="search users"
        size="small"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ my: 1 }}
      />
      <TableContainer sx={{ minWidth: 250 }} component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className="table-header">
                <strong>Name</strong>
              </TableCell>
              <TableCell className="table-header">
                <strong>Status</strong>
              </TableCell>
              <TableCell align="right" className="table-header">
                <strong>blogs created</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </TableCell>
                <TableCell>
                  {user.status && (
                    <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                      {user.status}
                    </span>
                  )}
                </TableCell>
                <TableCell align="right">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;

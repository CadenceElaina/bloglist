import * as React from "react";
import { useDispatch } from "react-redux";
import { logUserIn } from "../reducers/loginReducer";
import { setNotification } from "../reducers/notificationReducer";
import { initializeUsers } from "../reducers/userReducer";
import userService from "../services/users";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const SignupForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetName, ...name } = useField("text");
  const { reset: resetPassword, ...password } = useField("text");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await userService.create({
        username: username.value,
        name: name.value,
        password: password.value,
      });
      dispatch(
        logUserIn({ username: username.value, password: password.value }),
      );
      dispatch(initializeUsers());
      resetUsername();
      resetName();
      resetPassword();
      navigate("/blogs");
    } catch (error) {
      dispatch(
        setNotification(`error ${error.response?.data?.error || error}`, 5),
      );
    }
  };

  return (
    <div>
      <h2>Create account</h2>
      <form onSubmit={onSubmit}>
        <div>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <TextField
              id="signup-username"
              variant="standard"
              label="username"
              {...username}
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <TextField
              id="signup-name"
              variant="standard"
              label="name"
              {...name}
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="signup-password">Password</InputLabel>
            <Input
              id="signup-password"
              {...password}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <Button variant="contained" color="primary" type="submit">
          sign up
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;

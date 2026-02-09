import * as React from "react";
import { useDispatch } from "react-redux";
import { logUserIn } from "../reducers/loginReducer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const LoginForm = ({ handleLogin }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("text");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: username.value,
      password: password.value,
    };
    dispatch(logUserIn(user));
    resetUsername();
    resetPassword();
    navigate("/blogs");
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={onSubmit}>
        <div>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <TextField
              id="username"
              variant="standard"
              label="username"
              {...username}
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
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
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;

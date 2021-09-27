import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";

import { useAuth } from "../Context/MyContext";
const Login = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const { currentUser, loginWithEmail } = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (currentUser) {
      history.replace(from);
    }
  }, [currentUser, from, history]);
  const handleInput = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
  };
  const togglePasswordVisibility = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleLogin = async () => {
    setLoginError("");
    setLoading(true);
    try {
      await loginWithEmail(values.email, values.password);
    } catch (error) {
      setLoginError(error.message);
      setLoading(false);
    }
  };
  return (
    <Container>
      <Typography variant="h2">IoT Project</Typography>

      <Box justifyContent="center" alignItems="center" display="flex">
        <Box width={"100%"} maxWidth={600}>
          <Box m={4}>
            <FormControl fullWidth>
              <InputLabel htmlFor="email">EMAIL</InputLabel>
              <OutlinedInput
                id="email"
                label="Email"
                value={values.email}
                name="email"
                onChange={handleInput}
                startAdornment={
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box m={4}>
            <FormControl fullWidth>
              <InputLabel htmlFor="password" error={loginError.length > 0}>
                PASSWORD
              </InputLabel>
              <OutlinedInput
                error={loginError.length > 0}
                id="password"
                label="Password"
                value={values.password}
                name="password"
                onChange={handleInput}
                type={values.showPassword ? "text" : "password"}
                autoComplete="current-password"
                startAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="start"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {loginError.length > 0 && (
                <FormHelperText error>{loginError}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box m={4}>
            <LoadingButton
              onClick={handleLogin}
              loading={loading}
              loadingIndicator="Loading..."
              variant="contained"
              fullWidth
            >
              Login
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

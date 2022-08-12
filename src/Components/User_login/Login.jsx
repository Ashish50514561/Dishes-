import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router";
import {
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";

export default function Login() {
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "amar",
      password: "amar123",
    },
    {
      id: 2,
      username: "akbar",
      password: "akbar123",
    },
    {
      id: 3,
      username: "antony",
      password: "antony123",
    },
    {
      id: 4,
      username: "john",
      password: "john123",
    },
    {
      id: 5,
      username: "paul",
      password: "paul123",
    },
  ]);

  const handleVisibility = () => {
    setVisible(!visible);
  };

  const handleChange = (e) => {
    if (e.target.name === "userName") {
      setUserName(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleLogin = () => {
    if (!userName) {
      setError("Please enter username");
    } else if (!password) {
      setError("Please enter password");
    } else {
      const validUser = users.find(
        (user) => user.username === userName && user.password === password
      );
      validUser
        ? navigate("/dishes")
        : setError("Invalid Username or password");
    }
  };

  return (
    <Stack
      className="login_page"
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        spacing={3}
        className="login_form"
        sx={{
          width: { xs: "90vw", sm: "60vw", md: "50vw", lg: "40vw" },
          height: "50vh",
        }}
      >
        <Stack aria-label="login_heading" alignItems="center">
          <Typography
            sx={{
              fontSize: { xs: "30px", sm: "33px", md: "40px", lg: "42px" },
            }}
          >
            Welcome ! Please Login
          </Typography>
        </Stack>

        <Stack aria-label="userName" pl={2} pr={2}>
          <TextField
            onChange={handleChange}
            name="userName"
            label="email or username "
          />
        </Stack>

        <Stack aria-label="password" pl={2} pr={2}>
          <TextField
            name="password"
            label="password "
            onChange={handleChange}
            type={visible ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleVisibility}>
                    {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        {error && (
          <Stack aria-label="error" alignItems="center">
            <Typography color="red">{error}</Typography>
          </Stack>
        )}

        <Stack aria-label="login_btn" pl={2} pr={2}>
          <Button
            onClick={handleLogin}
            variant="contained"
            sx={{
              height: "8vh",
              color: "black",
              bgcolor: "#ebecf0",
              ":hover": {
                bgcolor: "#aaaaaa",
                color: "white",
              },
            }}
          >
            SIGN In
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

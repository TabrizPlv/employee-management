import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { User } from "../../types/User/user.type";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useLoginMutation } from "../../features/auth/authApi";
import { useAppDispatch } from "../../hooks/hooks";
import { setUser } from "../../features/auth/authSlice";

const LoginPage: React.FC = () => {
  const [state, setState] = useState<Partial<User>>({
    username: "",
    password: "",
  });

  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = () => {
    navigate("/register");
  };

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    await login(state)
      .unwrap()
      .then((response) => {
        const { user, token } = response;
        dispatch(setUser({ user, token }));
        navigate("/home");
      })
      .catch((error) => alert("Error trying to log in, Try again."));
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <h2>Login</h2>
      </div>
      <form>
        <Stack spacing={2} direction="column" sx={{ margin: 4 }}>
          <TextField
            name="username"
            type="text"
            variant="outlined"
            color="secondary"
            label="Username"
            onChange={updateState}
            value={state.username}
            fullWidth
            required
          />
          <TextField
            type="password"
            name="password"
            variant="outlined"
            color="secondary"
            label="Password"
            onChange={updateState}
            value={state.password}
            fullWidth
            required
          />
        </Stack>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            gap: "20px",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            size="large"
            onClick={handleSubmit}
          >
            Login
          </Button>

          <Button
            variant="outlined"
            color="primary"
            type="submit"
            size="large"
            onClick={handleRegister}
          >
            Register
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;

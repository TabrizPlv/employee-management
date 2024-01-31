import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { User } from "../../types/User/user.type";
import { useRegisterMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [state, setState] = useState<Partial<User>>({
    username: "",
    password: "",
    department_id: 0,
  });

  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateDepartment = (event: SelectChangeEvent) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    try {
      await register(state);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
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
        <h2>Register Account</h2>
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
          <Select
            name="department_id"
            labelId="select-label"
            id="select"
            onChange={updateDepartment}
            label="Department"
          >
            <MenuItem>Select an Option</MenuItem>
            <MenuItem value={2}>Admin</MenuItem>
            <MenuItem value={3}>HR</MenuItem>
            <MenuItem value={4}>PS</MenuItem>
          </Select>
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
            Register
          </Button>
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            size="large"
            onClick={() => navigate("/")}
          >
            Back To Login
          </Button>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;

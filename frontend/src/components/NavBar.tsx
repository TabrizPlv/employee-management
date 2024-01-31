import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#063970" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontSize: "2.5rem" }}
          >
            <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
              Employees
            </Link>
          </Typography>
          {screenWidth > 900 ? (
            <Link to="/create">
              <Button sx={{ color: "white", bgcolor: "green", gap: "10px" }}>
                <AddCircleIcon />
                Add Employee
              </Button>
            </Link>
          ) : (
            <Link to="/create">
              <Button sx={{ color: "white" }}>
                <AddCircleIcon fontSize="large" />
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;

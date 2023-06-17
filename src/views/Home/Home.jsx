import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { CartContext } from "../../store/CartContext/CartContext";
import { Navigate } from "react-router-dom";
import EditPassword from "../../components/EditPassword/EditPassword";

const Home = () => {
  const { session } = useContext(CartContext);
  const [button, setButton] = useState(false);

  return (
    <div>
      {!session ? <Navigate to="/signin" /> : ""}
      <Typography variant="h2" textAlign="center">
        User successfully logged in!
      </Typography>
      <Box display="flex" justifyContent="center" marginTop="4rem">
        <Button variant="contained" onClick={() => setButton(!button)}>
          Change password
        </Button>
      </Box>
      {button ? <EditPassword /> : ""}
    </div>
  );
};

export default Home;

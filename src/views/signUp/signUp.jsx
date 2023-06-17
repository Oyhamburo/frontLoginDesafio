import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as LinkRouter, Navigate } from "react-router-dom";
import { CartContext } from "../../store/CartContext/CartContext";

const defaultTheme = createTheme();

export default function SignUp() {
  const [register, setRegister] = React.useState(false);
  const [firstNameForm, setFirstNameForm] = React.useState(false);
  const [lastNameForm, setLastNameForm] = React.useState(false);
  const [emailForm, setEmailForm] = React.useState(false);
  const [errorPasswordMax, setErrorPasswordMax] = React.useState(false);
  const [errorPasswordEspecial, setErrorPasswordEspecial] =
    React.useState(false);
  const [errorPasswordMayus, setErrorPasswordMayus] = React.useState(false);
  const [errorPasswordNumber, setErrorPasswordNumber] = React.useState(false);
  const { API } = React.useContext(CartContext);

  const validateForm = (form) => {
    let password = validatePassword(form.password);
    let firstName = form.firstName.length === 0;
    setFirstNameForm(firstName);
    let lastName = form.lastName.length === 0;
    setLastNameForm(lastName);
    let email = form.email.length === 0;
    setEmailForm(email);

    const isValid = password && !firstName && !lastName && !email;

    return isValid;
  };

  const validatePassword = (password) => {
    // Realiza las validaciones necesarias para la contraseña
    // Puedes personalizar estas validaciones según tus requisitos

    // La contraseña debe tener al menos 8 caracteres
    const isLengthValid = password.length >= 8;
    setErrorPasswordMax(!isLengthValid);

    // La contraseña debe contener al menos una letra mayúscula
    const hasUppercase = /[A-Z]/.test(password);
    setErrorPasswordMayus(!hasUppercase);

    // La contraseña debe contener al menos un número
    const hasNumber = /[0-9]/.test(password);
    setErrorPasswordNumber(!hasNumber);

    // La contraseña debe contener al menos un carácter especial
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    setErrorPasswordEspecial(!hasSpecialChar);

    // Comprueba si todas las validaciones son verdaderas
    const isValidPassword =
      isLengthValid && hasUppercase && hasNumber && hasSpecialChar;

    return isValidPassword;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let form = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    let valid = validateForm(form);
    if (valid) {
      const URL = API + "/user/signup";
      let PARAMS = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      };
      let res = await fetch(URL, PARAMS);
      if (res.ok) {
        setRegister(true);
      } else {
        alert("Error creating user, please try again");
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {register ? <Navigate to="/signin" /> : ""}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={firstNameForm}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  helperText={firstNameForm ? "This field is required" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={lastNameForm}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  helperText={lastNameForm ? "This field is required" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={emailForm}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={emailForm ? "This field is required" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    errorPasswordMax ||
                    errorPasswordNumber ||
                    errorPasswordMayus ||
                    errorPasswordEspecial
                  }
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <Typography
                  variant="body2"
                  color={errorPasswordMax ? "error" : ""}
                >
                  *la contraseña requiere mas de 8 caracteres
                </Typography>
                <Typography
                  variant="body2"
                  color={errorPasswordEspecial ? "error" : ""}
                >
                  *la contraseña requiere un caracter especial
                </Typography>
                <Typography
                  variant="body2"
                  color={errorPasswordMayus ? "error" : ""}
                >
                  *la contraseña requiere una mayuscula
                </Typography>
                <Typography
                  variant="body2"
                  color={errorPasswordNumber ? "error" : ""}
                >
                  *la contraseña requiere un numero
                </Typography>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <LinkRouter to="/signin" className="linkRouter">
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </LinkRouter>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

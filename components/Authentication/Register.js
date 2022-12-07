import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { InputLabel } from '@mui/material';
import {MenuItem} from '@mui/material';
import {Select} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {FormControl} from '@mui/material';
import {useEffect} from 'react'
import {useState} from 'react';
import { useRouter } from 'next/router'; 


async function createUser(user) {

  const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    }
  ); 

  const data = await response; 

  if (!response.ok){
    throw new Error( data.message || "Error !! Something went wrong")
  }

  return data; 
}

export default function SignUp() {


  const router = useRouter(); 

  const [userType, setUserType] = React.useState("Student");
  const [registrationError, setRegistrationError] = useState("") 

  const userTypeChangeHandler = (event) => {
    event.preventDefault(); 
    setUserType(event.target.value); 
    console.log(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const user = {
      email: data.get('email'),
      password: data.get('password'),
      userType: userType, 
      firstName: data.get('firstName'),
      lastName: data.get('lastName')
    };

    try {
      const result = await createUser(user);
      router.replace('/authentication/login')

    } catch(err) {
      console.log(err)
      setRegistrationError(err); 
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
              <Grid item xs={12}>
                <InputLabel id="demo-select-small">User Type*</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={userType}
                  onChange={userTypeChangeHandler}
                  fullWidth
                  
                >
                  <MenuItem value={"Student"}>Student</MenuItem>
                  <MenuItem value={"Supervisor"}>Supervisor</MenuItem>
                </Select>
                
              </Grid>

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
                <Link href="/authentication/login" style={{fontSize: "12px", color: "#1976D2"}}>
                    Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}
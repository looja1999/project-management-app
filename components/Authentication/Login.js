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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {signIn} from 'next-auth/client';
import {useState} from 'react'; 
import { useRouter } from 'next/router';

export default function SignIn() {

  const [loginFailedMessage, setloginFailedMessage] = useState();
  const router = useRouter(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
   

    const result = await signIn("credentials", {
      redirect: false, 
      email: data.get('email'),
      password: data.get('password')
    }); 


    if(result.error){
      setloginFailedMessage(result.error); 
    }

    if(!result.error){
      // Set some state
      router.replace("/");
    }
    
   };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} >
            <Grid container spacing={2}>
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
            </Grid>

           { loginFailedMessage &&
            ( 
              <Grid container justifyContent="center">
                <Grid item>
                  <p style={{fontSize: "16px", padding: "0px", marginBottom: "0px", color: "red", fontWeight: "strong"}}>{loginFailedMessage}</p>
                </Grid>
              </Grid>)
            }

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/authentication/register" style={{fontSize: "12px", color: "#1976D2"}}>
                    Dont have an account? Register here
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        
    </Container>
  );
}

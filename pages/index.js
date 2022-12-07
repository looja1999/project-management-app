import Head from 'next/head'
import Image from 'next/image'
import Register from '../components/Authentication/Register';
import { Fragment, useEffect } from 'react';
import LoginPage from './authentication/Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dashboard from './dashboard/index';
import { useSession, getSession } from 'next-auth/client'; 
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import { useState } from 'react';

const theme = createTheme();


export default function Home() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();

  useEffect(() => {
    getSession().then(
      session => {
        if(!session){
          window.location.href = '/authentication/login'; 
        } else {
          setIsLoading(false); 
          setLoadedSession(session)
        }
      }
    )
  }, [])

  return (
    <ThemeProvider theme={theme}>
      {/* { session && <Dashboard />}
      { !session && !loading && <LoginPage /> } */}
      {loadedSession && <Dashboard />}
    </ThemeProvider>
  )
}

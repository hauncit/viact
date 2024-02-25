'use client';
import React, { useState } from 'react';
import styles from './style.module.css';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Logo from '@/components/Logo';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signup } from '@/apis/api';

const commonInputStyle = {
  marginBottom: 2,
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgb(235, 87, 87)',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'rgb(235, 87, 87)',
  },
};

interface FormValues {
  firstName: string;
  username: string;
  password: string;
  lastName: string;
  confirmPassword: string;
  email: string;
  phoneNumber: string;
}

const Signup = () => {
  const router = useRouter();
  const [mess, setMess] = useState<any>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const data = await signup(formData).catch((err) => {
      setMess({ mess: err?.response?.data?.message });
    });
    if (data?.id) {
      setMess({ ...data, mess: 'Signup success' });
      router.push('/');
    }
  };

  return (
    <div className={styles.jss1323}>
      <Box className={styles.jss8}>
        <Paper elevation={3} className={styles.jss750} sx={{ borderRadius: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Logo />
              <Box className={styles.jss936}>
                <Typography>CREATE NEW ACCOUNT</Typography>
                <Typography
                  color="rgb(235, 87, 87)"
                  fontSize={20}
                  fontWeight={700}
                >
                  Build smart risk free
                </Typography>
              </Box>
              <Box className={styles.jss752}>
                <ul className={styles.jss753}>
                  <li>
                    Understand why Viact is being used on millions of customers
                    everyday
                  </li>
                  <li>Find out if Viact is the right fit for your business</li>
                  <li>Get all your questions answered (personally)</li>
                  <li>
                    Completely risk-free with 14-day free trial and a 30-day
                    money back guarantee!
                  </li>
                </ul>
              </Box>
            </Grid>
            <Grid item xs={6} className={styles.jss224}>
              <Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl fullWidth>
                    <TextField
                      id="firstName"
                      label="First Name"
                      variant="outlined"
                      sx={commonInputStyle}
                      {...register('firstName', {
                        required: 'First Name is a required field',
                      })}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                    <TextField
                      id="lastName"
                      label="Last Name"
                      variant="outlined"
                      sx={commonInputStyle}
                      {...register('lastName', {
                        required: 'Last Name is a required field',
                      })}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                    <TextField
                      id="username"
                      label="Username"
                      variant="outlined"
                      sx={commonInputStyle}
                      {...register('username', {
                        required: 'Username is a required field',
                      })}
                      error={!!errors.username}
                      helperText={errors.username?.message}
                    />
                    <TextField
                      id="email"
                      label="Email"
                      variant="outlined"
                      type="email"
                      sx={commonInputStyle}
                      {...register('email', {
                        required: 'Email is a required field',
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                    <TextField
                      id="phoneNumber"
                      label="phone"
                      variant="outlined"
                      sx={commonInputStyle}
                    />
                    <TextField
                      id="password"
                      label="Password"
                      variant="outlined"
                      type="password"
                      sx={commonInputStyle}
                      {...register('password', {
                        required: 'Password is a required field',
                      })}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                    <TextField
                      id="confirmPassword"
                      label="Confirm Password"
                      variant="outlined"
                      type="password"
                      sx={commonInputStyle}
                      {...register('confirmPassword', {
                        required: 'Confirm Password is a required field',
                      })}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                    />
                    <Box className={styles.jss149}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label={
                          <Typography fontSize={14}>Show password</Typography>
                        }
                      />
                    </Box>
                    {mess?.mess && (
                      <Alert
                        variant="filled"
                        severity={mess?.id ? 'success' : 'error'}
                        sx={{ marginBottom: 2 }}
                      >
                        {mess?.mess}
                      </Alert>
                    )}
                    <Box mt={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        className={styles.jss17}
                        sx={{
                          background: 'rgb(35, 182, 216)',
                          ':hover': {
                            background: 'rgb(35, 182, 216)',
                          },
                        }}
                      >
                        SIGN UP
                      </Button>
                    </Box>
                  </FormControl>
                </form>
              </Box>
              <Box className={styles.jss226}>
                <Typography fontSize={12}>
                  By clicking Sign up or Continue with Google, you agree to
                  viAct’s
                  <span
                    style={{
                      color: 'rgb(235, 87, 87)',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Terms and Conditions for Free Trial.
                  </span>
                </Typography>
                <Typography fontSize={12}>
                  Already have an account?
                  <span
                    style={{
                      color: 'rgb(235, 87, 87)',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                    onClick={() => {
                      router.push('/');
                    }}
                  >
                    Log In.
                  </span>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};
export default Signup;

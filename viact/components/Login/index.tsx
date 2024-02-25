'use client';
import React, { useState } from 'react';
import styles from './style.module.css';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import Logo from '../Logo';
import { Alert, FormGroup } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { login } from '@/apis/api';

interface FormValues {
  username: string;
  password: string;
}

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

const Login = () => {
  const router = useRouter();
  const [mess, setMess] = useState<any>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const data = await login(formData).catch((err) => {
      setMess({ mess: err?.response?.data?.message });
    });
    if (data?.accessToken) {
      setMess({ ...data, mess: 'Login success' });
    }
  };

  return (
    <div className={styles.jss1323}>
      <Box className={styles.jss8}>
        <Paper
          elevation={3}
          className={styles.jss1316}
          sx={{ borderRadius: 5 }}
        >
          {' '}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ borderRadius: 5 }}>
              <CardContent>
                <Logo />
                <Box className={styles.jss99}>
                  <Typography>LOGIN</Typography>
                  <Typography className={styles.welcome}>
                    Welcome Back
                  </Typography>
                </Box>
                <Box className={styles.jss3}>
                  {mess?.mess && (
                    <Alert
                      variant="filled"
                      severity={mess?.accessToken ? 'success' : 'error'}
                      sx={{ marginBottom: 2 }}
                    >
                      {mess?.mess}
                    </Alert>
                  )}
                  <FormControl fullWidth component="fieldset">
                    <FormGroup>
                      <TextField
                        id="username"
                        label="Email or Username"
                        variant="outlined"
                        sx={commonInputStyle}
                        {...register('username', {
                          required: 'Username is a required field',
                        })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
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
                      <Box className={styles.jss149}>
                        <FormControlLabel
                          control={<Checkbox />}
                          label={
                            <Typography fontSize={14}>Show password</Typography>
                          }
                        />
                        <Typography
                          fontSize={12}
                          color="rgb(235, 87, 87)"
                          fontWeight={700}
                        >
                          Forgot password?
                        </Typography>
                      </Box>
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
                          LOGIN
                        </Button>
                        <Typography textAlign="center" marginBottom={1}>
                          OR
                        </Typography>
                        <Button
                          fullWidth
                          variant="contained"
                          className={styles.jss17}
                          sx={{
                            background: 'rgb(235, 87, 87)',
                            ':hover': {
                              background: 'rgb(235, 87, 87)',
                            },
                          }}
                          startIcon={<GoogleIcon />}
                        >
                          LOGIN WITH GOOGLE
                        </Button>
                      </Box>
                    </FormGroup>
                  </FormControl>
                </Box>
                <Box>
                  <Typography className={styles.jss550}>
                    Not on Viact yet?
                    <span
                      onClick={() => {
                        router.push('/signup');
                      }}
                      style={{ color: 'rgb(235, 87, 87)', cursor: 'pointer' }}
                    >
                      {' '}
                      Signup{' '}
                    </span>
                    now.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </form>
        </Paper>
      </Box>
    </div>
  );
};
export default Login;

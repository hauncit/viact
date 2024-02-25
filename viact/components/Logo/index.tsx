'use client';
import React from 'react';
import styles from './style.module.css';
import Image from 'next/image';
import Typography from '@mui/material/Typography';

type FieldType = {
  username?: string;
  password?: string;
};

const Logo = () => {
  return (
    <div className={styles.jss1357}>
      <Image src="/logo.png" alt="Logo" width={280} height={113} />
      <Typography className={styles.jss59}>
        Automate
        <br />
        Construction
        <br />
        Monitoring
      </Typography>
    </div>
  );
};
export default Logo;

'use client';
import axios from 'axios';

export const useCallApi = (method = 'GET', endpoint = '', data = {}) => {
  try {
    const result = axios({
      method: method,
      url: process.env.NEXT_PUBLIC_API + endpoint,
      data,
    });
    return result;
  } catch (error) {
    console.log('error useCallApiClient: ', error);
  }
};

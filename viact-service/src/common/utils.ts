export const resError = (data?: any) => {
  return {
    status: false,
    error: {
      ...data,
      message: data?.message,
    },
  };
};

export const resSuccess = (data = {}) => {
  return {
    status: true,
    error: null,
    data,
  };
};

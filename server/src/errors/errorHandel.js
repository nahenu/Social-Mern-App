const errorHandel = (statusCode, message) => {
  return {
    success: false,
    statusCode,
    message,
  };
};
export default errorHandel;

const handleSuccess = (res, { statusCode = 200, message = 'Success', data = null, pagination = null }) => {
  const response = {
    status: statusCode,
    message,
    ...(data !== null && { data }),
    ...(pagination !== null && { pagination }),
  };

  return res.status(statusCode).json(response);
};

module.exports = { handleSuccess };
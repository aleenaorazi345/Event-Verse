export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not found - ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  // 🚨 THIS WILL PRINT THE ERROR IN YOUR VS CODE TERMINAL
  console.log("\n🚨 BACKEND ERROR 🚨");
  console.log(err);
  console.log("-------------------\n");

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
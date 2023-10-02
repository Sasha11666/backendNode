const loggerOne = (request, response, next) => {
  console.log("Request Url:", request.originalUrl);
  next();
};

module.exports = loggerOne;

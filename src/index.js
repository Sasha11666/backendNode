const http = require("http");
const port = 3003;
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  let addr = new URL(request.url, "http://127.0.0.1");
  const params = new URLSearchParams(addr.search);
  const arr = request.url.split("?");
  if (arr.length > 1 && arr[1] !== "") {
    for (const key of params.keys()) {
      if (key === "hello" || key === "users") {
        if (params.get("hello")) {
          response.statusCode = 200;
          response.statusMessage = "OK";
          response.setHeader("Content-Type", "text/plain");
          response.write(`Hello, ${params.get("hello")}!`);
          response.end();
        } else if (key === "users") {
          response.statusCode = 200;
          response.statusMessage = "OK";
          response.setHeader("Content-Type", "application/json");
          response.write(getUsers());
          response.end();
        } else {
          response.statusCode = 400;
          response.setHeader("Content-Type", "text/plain");
          response.write("Enter a name please");
          response.end();
        }
      } else {
        response.statusCode = 500;
        response.setHeader("Content-Type", "text/plain");
        response.end();
      }
    }
  } else {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "text/plain");
    response.write("Hello, World!");
    response.end();
  }
});
server.listen(3003, () => {
  console.log(`Сервер запущен по адресу http://127.0.0.1:${port}`);
});

import express from "express";
import router from "./routers/index.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import sendError from "./controllers/errors.controller.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const originalJson = res.json;

  res.json = function (body) {
    if (res.statusCode < 400) {
      body = {
        status: res.statusCode,
        data: body,
      };
    }
    originalJson.call(res, body);
  };

  next();
});

router(app);

app.use(sendError);

export default app;

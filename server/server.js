import env from "./utils/env.js";
import app from "./app.js";
import * as mongoose from "mongoose";

const DB = env("DATABASE");
mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const port = env("PORT") || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

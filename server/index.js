import app from "./app.js";
import { connectDB } from "./src/db/db.js";

const PORT = process.env.PORT || 6000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

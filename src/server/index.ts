import express from "express";
import movieRoutes from "./movieRouter";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/", movieRoutes);

export default function startServer() {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

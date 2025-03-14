import express from "express";
import movieRouter from "./routes/movieRouter.js";

const app = express();
const port = 3000;

app.use("/movies", movieRouter);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
});
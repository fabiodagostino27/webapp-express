import express from "express";
import movieRouter from "./routes/movieRouter.js";
import imagePath from "./middlewares/imagePath.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(imagePath);
app.use("/movies", movieRouter);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
});
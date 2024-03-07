import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import fileUpload from 'express-fileupload'
// import bodyParser from "body-parser";




// s3
import s3Routes from "./Routes/s3.routes.js";    


// Initialize express
const app = express();

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}))


// Settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 4);


// middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json()) //? Leer Json del body
app.use(express.urlencoded({extended: false})) //? leer datos de formularios
app.use(cors()); //*para connectar

// routes
app.use("/s3", s3Routes);



export default app;
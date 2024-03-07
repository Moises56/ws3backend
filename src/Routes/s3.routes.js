// routes/apiRoutes.js
import express from 'express'
import fileUpload from 'express-fileupload'
import { uploadFile } from '../Controllers/s3.js'
import fs from 'fs'

const app = express()

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '../uploads'
}))



import { Router } from "express";
const router = Router();

import s3Ctrl from '../Controllers/s3.controller.js';


router.get('/files', s3Ctrl.listar);
router.get('/files/:fileName', s3Ctrl.BuscarNombre);
router.get('/files/download/:fileName', s3Ctrl.Descargar);
router.post('/files/upload', s3Ctrl.Upload);
router.delete('/files/:fileName', s3Ctrl.Eliminar);


export default router;

const S3Ctrl = {};

import express from 'express'
import fileUpload from 'express-fileupload'
import { uploadFile, getFiles, getFile, downloadFile, getFileURL, deleteFile } from './s3.js'
import fs from 'fs'

const app = express()

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '../uploads'
}))

S3Ctrl.listar = async (req, res) => {
    // console.log("hola: ", req)
    const result = await getFiles()
    res.json(result.Contents)
}

S3Ctrl.BuscarNombre = async (req, res) => {
    const result = await getFileURL(req.params.fileName)
    // console.log('el result: ', result)

    //separar el url de la firma
    const url = result.split("?")[0]
    // console.log(url)

    //separar el nombre del archivo
    const key = url.split("/")[3]
    // console.log(key)

    //si la extencion es .jpg o .png o pdf, separar la extencion del nombre del archivo
    const extencion = key.split(".")[1]


    res.json({
        url: url,
        fileName: key,
        ext: extencion

    })
}


S3Ctrl.Descargar = async (req, res) => {
    await downloadFile(req.params.fileName)
    res.json({message: "archivo descargado"})
}


S3Ctrl.Upload = async (req, res) => {
    // console.log("file1: ", req.files.file);
    try {
        const result = await uploadFile(req.files.file);

        // await fs.promises.unlink(req.files.file.tempFilePath);

        //eliminar el archivo temporal de la carpeta uploads
        await fs.unlinkSync(req.files.file.tempFilePath);

        res.json({ result });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ message: "Error uploading file" }); // Send a more specific error message to the client
    }
};


//eliminar archivo de s3

S3Ctrl.Eliminar = async (req, res) => {
    const result = await deleteFile(req.params.fileName)
    // console.log(result)
    res.json({ result })
}




export default S3Ctrl;
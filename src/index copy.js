import express from 'express'
import fileUpload from 'express-fileupload'
import { uploadFile, getFiles, getFile, downloadFile, getFileURL, deleteFile } from './Controllers/s3.js'
import fs from 'fs'

const app = express()

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}))

app.get('/files', async (req, res) => {
    console.log("hola: ", req)
    const result = await getFiles()
    res.json(result.Contents)
})

app.get('/files/:fileName', async (req, res) => {
    const result = await getFileURL(req.params.fileName)
    console.log(result)

    //separar el url de la firma
    const url = result.split("?")[0]
    console.log(url)

    res.json({
        url: url
    })
})

app.get('/downloadfile/:fileName', async (req, res) => {
    await downloadFile(req.params.fileName)
    res.json({message: "archivo descargado"})
})


app.post('/files', async (req, res) => {
    const result = await uploadFile(req.files.file)

    //eliminar el archivo temporal de la carpeta uploads
    fs.unlinkSync(req.files.file.tempFilePath)

    res.json({ result })
})

//eliminar archivo de s3
app.delete('/files/:fileName', async (req, res) => {
    const result = await deleteFile(req.params.fileName)
    console.log(result)
    res.json({ result })
})


app.use(express.static('images'))

app.listen(3000)
console.log(`Server on port ${3000}`)
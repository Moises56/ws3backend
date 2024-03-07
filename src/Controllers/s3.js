import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { AWSREGION, AWS_PUBLIC, AWSKEY, AWSNAME } from '../config.js'
import fs from 'fs'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

const client = new S3Client({
    region: AWSREGION,
    credentials: {
        accessKeyId: AWS_PUBLIC,
        secretAccessKey: AWSKEY
    }
})

export async function uploadFile(file) {
    console.log("file S3: ", file)
    const stream = fs.createReadStream(file.tempFilePath)
    const uploadParams = {
        Bucket: AWSNAME,
        Key: file.name, //nombre del archivo
        Body: stream,
        ACL: 'public-read',
        ContentType: file.mimetype
    }
    const command = new PutObjectCommand(uploadParams)
    
    //enviar el archivo temporal de la carpeta uploads
    return await client.send(command)
}

export async function getFiles() {
    const command = new ListObjectsCommand({
        Bucket: AWSNAME
    })
    return await client.send(command)
}

export async function getFile(filename) {
    const command = new GetObjectCommand({
        Bucket: AWSNAME,
        Key: filename
    })
    return await client.send(command)
}

export async function downloadFile(filename) {
    const command = new GetObjectCommand({
        Bucket: AWSNAME,
        Key: filename
    })
    const result = await client.send(command)
    console.log(result)
    result.Body.pipe(fs.createWriteStream(`./images/${filename}`))
}

export async function getFileURL(filename) {
    const command = new GetObjectCommand({
        Bucket: AWSNAME,
        Key: filename
    })
    return await getSignedUrl(client, command, { expiresIn: 3600 })
}

//eliminar archivo de s3 
export async function deleteFile(filename) {
    const command = new DeleteObjectCommand({
        Bucket: AWSNAME,
        Key: filename
    })
    return await client.send(command)
}

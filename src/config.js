import { config } from 'dotenv'
config()

export const AWSNAME = process.env.AWSNAME
export const AWSREGION = process.env.AWSREGION
export const AWSPUBLIC = process.env.AWSPUBLIC
export const AWSKEY = process.env.AWSKEY
export const PORT = process.env.PORT || 3000;
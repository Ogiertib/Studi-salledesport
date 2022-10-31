import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
type Data = {
    name : string
}

export default (req : NextApiRequest, res : NextApiResponse<Data>) => {
    if(req.method === 'POST'){
    const {name , email, text} = req.body
    }
}
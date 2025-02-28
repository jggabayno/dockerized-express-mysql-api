import nodemailer from 'nodemailer'

interface IMail {
  email: string
  subject: string
  body: string
}

export type ISendEmailPersistence = typeof sendEmailPersistence


export const sendEmailPersistence = async (
  { email : to, subject, body }: IMail
) => {

  const from : string | undefined = process.env.GOOGLE_APP_EMAIL

  const transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
      user: from,
      pass: process.env.GOOGLE_APP_PASSWORD
    }
  })

  await transport.sendMail({
    from,
    to,
    subject,
    html: `<div>${body}</div>`
  })

}
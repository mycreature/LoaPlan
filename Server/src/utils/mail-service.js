const { transporter } = require('../config/smtpConfig')

const verificationCode = {}

const sendVerificationEmail = async (toEmail) => {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase() // 6자리 코드

  verificationCode[toEmail] = code

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: 'LOAPLAN 이메일 인증 요청',
    html: `
      <h1>이메일 인증 안내</h1>
      <p>이메일 인증코드 : <strong>${code}</strong></p>
    `,
  }

  await transporter.sendMail(mailOptions)
}

module.exports = { sendVerificationEmail, verificationCode }

const nodemailer = require('nodemailer')

exports.transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
})

exports.verify = async (transporter) => {
  try {
    const connection = await transporter.verify()
    if (connection) {
      console.log("✅ Server is ready to take our mail messages")
    }

  } catch (error) {
    console.log(`❌ something wrong in mail connection ${error}`)
  }
}

exports.welcome = (user) => {
  return {
    from: `<${process.env.MAIL_USER}>`,
    to: user.email,
    subject: "Bienvenido a CannaDev",
    html: `
      <div>
        <h1> Bienvenido(a) ${user.nameUser}<h1>
        <p> ¡Ahora ya eres parte de nuestra comunidad canábica! </p>
        <p> Accede a nuestra página web y compra los productos que se te antojen. </p>
      </div>
    `,
    text: `Bienvenido(a) ${user.nameUser}, estamos contentos porque ya eres parte de nuestra comunidad canábica. Ya puedes acceder a nuestra página web y comprar los productos que se te antojen.`
  }
}

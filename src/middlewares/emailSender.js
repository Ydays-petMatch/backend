const nodemailer = require('nodemailer');

// Transporteur mail (exemple avec Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    //   user: 'testpetmatch@gmail.com',
    //   pass: 'test-12345678'
      user: 'testpetmatch@gmail.com',
      pass: 'rhgq lgep ptbn crdt'
    }
  });
  
  // Route POST pour envoyer un e-mail
const sendEmail = async (req, res) => {
    const { email } = req.userToken;
    const { text, subject } = req.body;
  
    const mailOptions = {
      from: email,
      to: "testpetmatch@gmail.com",
      subject: subject,
      message: text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'E-mail envoyé !', info });
      } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l’envoi', error });
      }

};
module.exports = sendEmail;
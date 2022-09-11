const nodemailer = require("nodemailer");

exports.sendMail =  async (subject,to , message, html ) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nilanallam@gmail.com', // use env variable => gmail
          pass: 'befashberuhbxqoo', // use env variable => password
        },
      });
  
      transporter.sendMail({
        from: '"KIST Workshop" Nalin Malla', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: message, // plain text body
        html: ((html)?html: null),
        // "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
      }).then(info => {
        console.log({info});
        return info;
      }).catch(console.error);
  }
  // sendMail()
  
  
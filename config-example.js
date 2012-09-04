// copy this to config.js and modify

exports.config = {
  // see https://github.com/andris9/Nodemailer for more information on email options
  email : {
    transport: {
      type: 'SMTP',
      options: {
      service: 'Gmail',
        auth: {
          user: 'gmail.user@gmail.com',
          pass: 'my gmail pass'
        }
      }
    },
    from: 'user@mydomain.com',
    // You can typically send text messages to a phone by using an email address like:
    // phonenumber@txt.att.net
    // phonenumber@vtext.com
    // phonenumber@tmomail.net
    to: 'user1@mydomain.com, 1234567890@txt.att.net'
  }
}


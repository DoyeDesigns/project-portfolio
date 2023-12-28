var nodemailer = require("nodemailer");

export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        name,
        email,
        message,
      } = req.body;

      // Your email sending logic
      var transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.PASS_WORD,
        },
      })

      var mailOptions = {
        from: "dvdogoba23@zohomail.com",
        to: 'dvdogoba23@gmail.com',
        subject: "Job offer",
        text: "That was easy!",
        html: `
          <p>
          	Hello, my name is ${name}. ${message}.  
          </p>
          <p>You can reach out to me here ${email}</p>
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error("Error sending email:", error);
          // Send an error response back to the client
          res.status(500).json({ error: "Failed to send email" });
        } else {
          console.log("Email sent: " + info.response);
          // Send a success response back to the client
          res.status(200).json({ message: "Email sent successfully" });
        }
      });
    } catch (error) {
      console.error("Error:", error);
      // Send an error response back to the client
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
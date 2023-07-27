const SendEmail = require('../../utils/SendEmail')
const {EMAIL} = require('../../../constant')

// send email
const resetPassword = async ({ name, email, link }) => {
  
  const options = {
    from: `Corporate Basketball League <${EMAIL}>`,
    to: `${email}`,
    subject: "Reset Password",
    html: `
      <div style="font-family: sans-serif; width: 100%; background-color: #f3f9ff; padding: 5rem 0">
        <div style="max-width: 100%; background-color: white; margin: 0 auto">
          <div style="width: 100%; background-color:black; padding: 20px 0">
            <a href="https://thecbl.in" >
              <img
                src="https://ik.imagekit.io/uz4hsgydu/Default/logo.png?updatedAt=1681908076921"
                style="width: 100%; height: 70px; object-fit: contain"
              />
            </a> 
            <h3 style="color: rgb(162, 162, 162); text-align: center;">Corporate Basketball League</h3>
          </div>
          <div style="width: 100%; padding: 0px 30px; margin-top: 30px;">
            <div style="width: 100%; font-weight: 600; color: white; margin-top: auto; margin-bottom: auto; font-size: 1rem;">
              <p>Dear ${name},</p>

              <p>To reset your password, simply click on the link provided below:</p>
              <h3> 
                <a href=${link} style="text-decoration: none;">Reset Password</a>
              </h3>
            </div>
          </div>
          <div style="width: 100%; gap: 10px; padding: 20px 0; display: grid">
            <div style="font-size: 0.9rem; margin: 0px 30px">
              <p style="font-weight:700; color: #ee6730" >Team CBL</b></p>
            </div>
          </div>
        </div>
      </div>
        `,
  };
  await SendEmail(options);
};
module.exports = resetPassword;

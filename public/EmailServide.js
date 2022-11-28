import nodemailer from "nodemailer";

const sendMail = async(to,subject,content)=>{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'brishabh139@gmail.com',
          pass: 'oipbcgxljyrcbpyj'
        }
      });
      
      var mailOptions =  {
        from: 'brishabh139@gmail.com',
        to: `${to}`,
        subject: `${subject} : SleepPad OTP Verification `,
        html : `<center><h1 style='color: blue;'>Sleep Pad </h1> </center> <div style='border:1px solid;padding:20px;margin:20px  ;'> <strong style='padding-top:20px;text-align:start;font-size:15px;'>Hello, User</strong> <h4> <label>Please use this verification code to verify your SleepPad Account </label><h4><h1>${content}</h1><label style='padding-top:20px;text-align:start;font-size:14px;'>Verification code will exxpire in 10 minutes... </label>`
      };
      
      transporter.sendMail(mailOptions, async(error, info)=>{
       try{
        if (error) {
            return error;
          } else {
            return true;
          }
       }
       catch(err){
        console.log(`Send Mail Error ${err}`);
        return err;
       }
      }); 

}

export default  sendMail;

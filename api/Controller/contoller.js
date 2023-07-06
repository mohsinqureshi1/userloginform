const Form = require("../Model/form")
const nodemailer = require("nodemailer")
const randomstring = require("randomstring")
const form = require("../Model/form");
const jwt=require("jsonwebtoken")
const secretKey="secretKey"
const bcrypt = require('bcrypt');
const Productt=require("../Model/Product");
const { json } = require("express");

// const configure=require("../config/confi")
// const config = require("../config/confi")


// const form_create = async (req, res) => {    //signin 
//     try {
//       const form = new Form({
//         Firstname: req.body.Firstname,
//         Lastname: req.body.Lastname,
//         email: req.body.email,
//         password: req.body.password

//       });
  
//       const savedForm = await form.save();
//       res.send(savedForm);
//     } catch (error) {
//       // Handle the error appropriately, e.g., send an error response
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
// }



//ya wali api b sahi hain

// const sign_in = async (req, res) => {

//   let email = req.body.email;
//   let password = req.body.password;
//   console.log(`${email} is trying to login`);
//   let login = await form.findOne({ email: email, password: password });
//   if (login === null) {
//       res.status(401).json({
//           message: "User not found",
//       });
//   } 
//   else if (login.email == email && login.password == password)
//   jwt.sign({login}, secretKey,{expiresIn:'0s'},(err,token)=>{
//     return res.status(200).json({
//       message: 'login Sucess',
//       token
//     })
//   })
//   else {
//     return res.status(400).json({
//       message: 'Invalid Credentials'
//     })
//   }}
  




// function midware(req, res, next) {
// let headerToken = req.headers["authorization"];
// if (headerToken) {
//   next();
// } else {
//   res.status(401).json({ err });
// }
// };






//ak or new api

const form_create = async (req, res) => {
  console.log('12313');
  // Other code to handle the POST request

  const{name,email,password}=req.body;
  
  try{
const existinguser=await Form.findOne({email:email})
if(existinguser){
  return res.status(400).json({message:"user already exist"})
}


const hashpassword= await bcrypt.hash(password,10)//hashing password here



const result =await Form.create({
  name:name,
  email:email,
  password:hashpassword
})
const token =jwt.sign({email:result.email,id:result._id},secretKey)
res.status(201).json({user:result,token:token});//registerd successfully
  }

 
  catch(error){
console.log(error)
res.status(500).json({
message:"something went wrong"
})
  }


};



// const form_create= async (req, res) => { 
//   console.log('12313')

//   const{name,email,password}=req.body;
  
//   try{
// const existinguser=await Form.findOne({email:email})
// if(existinguser){
//   return res.status(400).json({message:"user already exist"})
// }


// const hashpassword= await bcrypt.hash(password,10)//hashing password here



// const result =await Form.create({
//   name:name,
//   email:email,
//   password:hashpassword
// })
// const token =jwt.sign({email:result.email,id:result._id},secretKey)
// res.status(201).json({user:result,token:token});//registerd successfully
//   }

 
//   catch(error){
// console.log(error)
// res.status(500).json({
// message:"something went wrong"
// })
//   }
// }



//
const create_product=async(req,res)=>{
  // console.log(req.userId)
  const{name,title,price}=req.body;
  const userId = req.userId;
  
  const product = new Productt({
    name,
    title,
    price,
    userId
});
  try {
  
      const savedProduct=await product.save();
      res.send(savedProduct);

      }
    catch (error) {
     res.status(400).send(error)
    }

}

const get_product=async(req,res)=>{
try {
      const showProduct=await Productt.find({userId : req.userId});
      res.status(200).json(showProduct);

      }

 
    catch (error) {
      console.log(error)
     res.status(400).json({message:"error arha hai ksi chz mai"})
    }

}











///ya new wala ha error free and changes wala
// const sign_in = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const existingUser = await Form.findOne({ email: email });
//     if (!existingUser) {
//       return res.status(404).json({ message: "User does not exist" });
//     }
//     const matchPassword = await bcrypt.compare(
//       password,
//       existingUser.password
//     );

//     if (!matchPassword) {
//       return res.status(400).json({
//         message: "Invalid details",
//       });
//     }
//     const token = jwt.sign(
//       { email: existingUser.email, id: existingUser._id },
//       secretKey
//     );
//     res.status(201).json({ user: existingUser, token: token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Something went wrong",
//     });
//   }
// };

// // Middleware

// const auth = (req, res, next) => {
//   try {
//     let token = req.headers.authorization;
//     if (token) {
//       token = token.split("  ")[1];
//       let user = jwt.verify(token, secretKey);
//       req.userId = user.id;
//     } else {
//       res.status(401).json({
//         message: "Unauthorized user",
//       });
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({
//       message: "Unauthorized user",
//     });
//   }
// };













//ya purany wala code hai 

const sign_in = async (req, res) => {

  const{email,password}=req.body;
  try{
    const existinguser=await Form.findOne({email:email})
    if(!existinguser){
      return res.status(404).json({message:"user not exist"})
    }
    const matchpassword=await bcrypt.compare(password,existinguser.password);


    if(!matchpassword){
      return res.status(400).json({
        message:"invalid details"
      })
    }


    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      secretKey,
      { expiresIn: '1s' } // Token expiration time
    );


    res.status(201).json({token, user:existinguser});
  }   
  catch(error){
    console.log(error)
    res.status(500).json({
    message:"something went wrong"
  })
}
}

//middelware

// const auth=(req,res,next)=>{
//   try{
//       let token=req.headers.authorization;
//       if(token){
//  token=token.split(" ")[1]
//  let user= jwt.verify(token,secretKey)
//  req.userId=user.id;
//       }
//       else{
//          res.status(401).json({
//              message:"unauthorized user"
//          })
//       }
//       next();
//   }
//   catch(error){
// console.log(error)
// res.status(401).json({
//   message:"unauthorized user"
// })
//   }
// }


//idhr tk







// const sign_in = async (req, res) => {

//   let email = req.body.email;
//   let password = req.body.password;
//   console.log(`${email} is trying to login`);

//   if (email === "email" && password === "password") {
//     var token = jwt.sign({ email: email }, secretKey);
//     return res.status(200).json({
//       message: 'login Sucess',
//       token
//     })
//   }
//   else {
//     return res.status(400).json({
//       message: 'Invalid Credentials'
//     })
//   }
// }






const user_data = async (req, res,next) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, secretKey);
    const username = user.email;

    form.findOne({ email: username })
      .then((login) => {
        res.send({ status: "ok", login: login });
      })
      .catch((error) => {
        res.send({ status: "error", login: error });
      });
  } catch (error) {
    res.send({ status: "error", message: "Invalid token" });
  }
};


  
// const user_data=async(midware,req,res) => {
// const{token}=req.body;
// try{
//   const user=jwt.verify(token,secretKey);
//   const username=user.email;
//   form.findOne({email:username}).then((login)=>{
//   res.send({status:"ok",login:login});
  
//   }).catch((error)=>{
//     res.send({status:"error",login:error});
//   });

// }
// catch(error){

// }

  
// }
    
  





const forget_password = async (req, res) => {
    try {
        const email = req.body.email;
        const userdata = await form.findOne({ email: email });
        if (userdata) {
            const random = randomstring.generate();
            const data = await form.updateOne({ email: email }, { $set: { token: random } });
            console.log(data)
            sentresetpasswordmail( userdata.email, random);

            res.status(200).json({ success: true, msg: "Please check your inbox for mail and reset your password" });
        } else {
            res.status(200).json({ success: true, msg: "This email does not exist" });
        }
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};


const sentresetpasswordmail = async (email, token) => {
  let testAccount = await nodemailer.createTestAccount();
//connect with smptp
  let transporter = await  nodemailer.createTransport({
    host: "smtp.ethereal.email",
   
   port:587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'angel.emmerich@ethereal.email',
      pass: 'rsJGGFGVusM2VKfDs2'
    },
  });


  let info = await transporter.sendMail({
    from: '"Mohsin Qureshi" <mohsin@gmail.com>',
    to: email,
    subject: 'Password Reset Link',
    text: 'Please click on the following link to reset your password: ' +
      `http://localhost:3000/reset?token=${token}`,
    html: `<p>Please click on the following link to reset your password:</p> 
           <a href="http://localhost:3000/reset?token=${token}">Reset Password</a>`,
  });

// res.json(info)

console.log('Message sent: %s', info.messageId);
console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

return info; // Return the info object
};






const reset_password = async (req, res) => {
  try {
    const token = req.query.token;
    const tokendata = await form.findOne({token});

    if (tokendata) {
      // Token is valid, proceed with password reset
      const newPassword = req.body?.password;

      // Update the user's password in the database
      tokendata.password = newPassword;
      await tokendata?.save();

      res.status(200).send({ success: true, msg: "Password reset successful" });
    } else {
      res.status(400).send({ success: false, msg: "This link has expired or is invalid" });
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: error.message });
  }
};








//signout


const signout = async (req, res) =>{
    const { email } = req.body;
  
    try {
      // Find the user by email and delete it
      await form.findOneAndDelete({ email });
  
      res.json({ message: 'User signed out successfully.' });
    } catch (error) {
      console.error('Error signing out:', error);
      res.status(500).json({ error: 'An error occurred while signing out.' });
    }

}



 
  
  
  

module.exports = {
  form_create,
  create_product,
    sign_in,
    get_product
    
    // forget_password,
  //   user_data,
  //   reset_password,
  //   signout,
    // midware
}
















//newcode reset/forget

// const forget_password = async (req, res) => {
//   let data = await form.findOne({ email: req.body.email });

//   const responseType = {};

//   if (data) {
//     let optcode = Math.floor(Math.random() * 10000) + 1;
//     let otpData = new OTP({
//       email: req.body.email,
//       code: optcode,
//       expireIn: new Date().getTime() + 300 * 1000,
//     });

//     let otpResponse = await otpData.save();

//     responseType.statusText = 'success';
//     sentResetPasswordMail(data.email, otpResponse.code);

//     responseType.message = 'Please check your email for the password reset link.';
//   } else {
//     responseType.statusText = 'error';
//     responseType.message = 'Email does not exist.';
//   }

//   res.status(200).json(responseType);
// };

// const sentResetPasswordMail = async (email, token) => {
//   let testAccount = await nodemailer.createTestAccount();

//   // Connect with SMTP using Ethereal credentials
//   let transporter = await nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//       user: testAccount.user,
//       pass: testAccount.pass,
//     },
//   });

//   let info = await transporter.sendMail({
//     from: '"Mohsin Qureshi" <mohsin@gmail.com>',
//     to: email,
//     subject: 'Password Reset Link',
//     text: 'Please click on the following link to reset your password: ' +
//       `http://localhost:3000/reset-password?token=${token}`,
//     html: `<p>Please click on the following link to reset your password:</p> 
//            <a href="http://localhost:3000/reset-password?token=${token}">Reset Password</a>`,
//   });

//   console.log('Message sent: %s', info.messageId);
//   // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//   res.json(info);
// };


// {


    
//       const mailOptions = {
//         from:'code@getMaxListeners.com',
//         to: 'mohsanqureshi2000@gmailcom',
//         subject: 'Password Reset',
//         html: `<p>Hi ${email},</p><p>Please click <a href="http://localhost:4000/api/reset-password?token=${token}">here</a> to reset your password.</p>`,
//       };
//       transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Mail has been sent:', info.response);
//         }
//       });
//     } catch (error) {
//       console.log('Error sending email:', error.message);
//     }
//   };
  

//reset password

// const reset_password = async (req, res) => {
//     try {
//         const token = req.query.token;
//         const tokendata = await form.findOne({ token: token });
//         if (tokendata) {
//             const passowrd = req.body.passowrd;

//         }
//         else {
//             res.status(200).send({ success: false, msg: "this link has been expired" })
//         }
//     }
//     catch (error) {
//         res.status(400).send({ success: false, msg: error.message })
//     }
// }



// const reset_password = async (req, res) => {
//   let data= await OTP.find({email:req.body.email,code:req.body.optcode})
//   const response={}
//   if (data){
//     let currentTime= new Date().getTime();
//     let diff=data.expireIn - currentTime;
//     if (diff<0){
//       response.message='Token Expire',
//       response.statusText='erro';
//     }
//     else{
//       let user= await OTP.findOne({email:req.body.email})
//       console.log(user,"dsdddd");

//       user.password=req.body.password
//       user.save();
//       response.message="Password change successfully",
//       response.statusText="success"
//     }
//    }
//   else{
//     response.message='Invalid OTP',
//     response.statusText='error';
//   }
//   res.status(200).json(response)
// }




// const sign_in = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Check if the user exists
//         const user = await Form.findOne({ email });

//         if (!user) {
//             return res.status(401).json({ error: 'Invalid username or password' });
//         }

//         // Check if the password matches
//         if (password !== user.password) {
//             return res.status(401).json({ error: 'Invalid username or password' });
//         }

//         // Successful sign-in
//         return res.json({ message: 'Sign-in successful' });
//     } catch (err) {
//         console.error('Sign-in error:', err);
//         return res.status(500).json({ err: 'Internal server error' });
//     }
// };


//signin 
// const sign_in = async (req, res) => {

//     let email = req.body.email;
//     let password = req.body.password;
    
//     let login = await form.findOne({ email: email, password: password });
//     jwt.sign({login}, secretKey,{expiresIn:'300s'},(err,token)=>{
//       res.json({
//         token,
//       })
//     })
//     if (login === null) {
//         res.status(401).json({
//             message: "User not found",
//         });
//     } else if (login.email == email && login.password == password) {
//         res.status(200).json({
//             message: "Login Successfully!",
//         });
//     } else {
//         res.status(401).json({
//             message: "Invalid email or password",
//         });
//     }
    


// }





//       const forget_password=async(req,res)=>{

// try{
//     const email=req.body.email
// const userdata=await Form.findOne({email:email});
// if(userdata){
// const random=randomstring.generate();//use generate method to generate random string
// const data=await Form.updateOne({email:email},{$set:{token:random}})
// sentresetpasswordmail(userdata.Firstname,userdata.Lastname,userdata.email,random)

// res.status(200).json({success:true,msg:"please check your inbox for mail and reset yor password"})
// }
// else{
//     res.status(200).json({success:true,msg:"This email does not exist"})
// }
// }

// catch (error) 
// {
// // res.status(400).json({success:false,msg:error.message});
// res.status(200).json({ message: 'Password reset successful' });
// }

//       }



//forget password


// const sentresetpasswordmail = async (Firstname, Lastname, email, token) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             // port:587,
//             secure: false,
//             requireTLS: true,
//             auth: {
//                 user: config.emailPassword,
//                 pass: config.emailUSer
//             }

//         });
//         const mailoptions = {
//             from: config.emailUSer,
//             to: email,
//             subject: "for Reset password",
//             html: '<p>hi' + name + ',please copy the link<a href="http://localhost:4000/api/reset-password?token=' + token + '">reset password </a></p>'
//         }
//         transporter.sendMail(mailoptions, function (error, info) {
//             if (error) {
//                 console.log(error)
//             }
//             else {
//                 console.log("mail has been sent:-", info.response)

//             }

//         })
//     }
//     catch (error) {
//         res.status(400).send({ success: false, msg: error.message })
//     }
// }

//newone


// const forget_password = async (req, res) => {
//   let data = await form.findOne({email:req.body.email})
  
//   const responseType={};
//   if(data){
//     let optcode=Math.floor((Math.random()*10000)+1);
//     let otpData=new OTP({
// email:req.body.email,
// code:optcode,
// expireIn: new Date().getTime() + 300 * 1000

//     })
//     let otpresponse=await otpData.save();
//     responseType.statusText='success';
//     sentresetpasswordmail(data.email, );

//     responseType.message='please check your email for mail'
//   }
//   else{
//     responseType.statusText='erro';
//     responseType.message='mail not exist'
//   }
// res.status(200).json(responseType)
// }


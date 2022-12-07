import { connectDb } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth"; 

async function handler (req, res) {

  if (req.method !== "POST") {
    return; 
  }

  const data = req.body; 

  const { firstName, lastName, email, password, userType } = data; 


  //  Name validator
  if ( firstName.trim().length < 1 || lastName.trim().length < 1 ) {
    return res.status(422).json({
      message : "Invalid Name Input - Please enter name again "
    })
  }; 

  // Email validator

  if (!email){
    return res.status(422).json({
      message : "Invalid Email Input - Please enter email again"
    })
  }

  // Password validator
  if (!password || password.trim().length < 7){
    return res.status(422).json({
      message : "Invalid Password - Please enter password again"
    })
  }

  if (!userType === "Student" || !userType === "Supervisor"){
    return res.status(422).json({
      message : "Invalid user type - Please reload the page"
    }); 
  }

  // Hashing password
  const hashedPassword = await hashPassword(password); 

  const client = await connectDb();  

  const database = client.db();

  const existingUsers = await database.collection("users").findOne({
    email: email
  })

  // Validate email exists
  if(existingUsers){
    res.status(422).json({
      message: "Email already been used"
    }); 
    client.close(); 
    return; 
  }
  
  const result = await database.collection("users").insertOne({
    firstName : firstName, 
    lastName : lastName, 
    email : email, 
    password : hashedPassword, 
    userType : userType 
  }); 

  res.status(201).json({
    message : "User created"
  })

  client.close(); 
}

export default handler; 
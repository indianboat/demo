const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../model/dbcollection");
// const auth = require("../middlewares/auth");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config.env" });
router.use(express.json());
router.use(cookieParser());

router.post("/signup", async (req, res) => {
	const { name, email,password } = req.body;

	if (!name || !email || !password) {
		res.status(400).json({ message: "Fill Form Correctly" });
	} else {
		try {
			const userExist = await User.findOne({ email });

			if (userExist) {
				res.status(409).json({ message: "User Exist" });
			} else {
				const newUser = new User({
					name,
					email,
					password,
				});
				const result = await newUser.save();

				if (result) {
					res.status(201).json({ message: "Sign up success !" });
				} else {
					res.status(400).json({ message: "Sign up Failed !" });
				}
			}
		} catch (error) {
			console.log("Server Error: " + error);
		}
	}
});

router.post("/signin", async (req, res) => {

	const { email, password } = req.body;

	console.log("hello req body", req.body);

	if (!email || !password) {
		res.status(422).json({ message: "Required email and password." });
	} 
	
	else {
		try {
			const dbUser = await User.findOne({ email: email });

			if (!dbUser) {
				res.status(422).json({message: "This email id is not exist. Please sign up first." });

			} 
			else 
			{
				const dbPassword = dbUser.password;
				const isPassMatch = await bcrypt.compare(req.body.password, dbPassword);
				console.log(isPassMatch);

				if (!isPassMatch) {
					res.status(422).json({ message: "Invalid credentials !",authenticated:false });
				} 
				
				else 
				{
					token = await dbUser.createToken();
					res.status(200).json({ message: "login success !", authenticated:true, token });
				}
			}
		} catch (error) {
			console.log("Server error", error);
		}
	}
});

router.get("/", (req, res) => {
	res.send('hello world');
});


router.get("/users", async (req, res) => {
	try {
        const users = await User.find({});
        res.send(users);
        
    } catch (error) {
        res.send('error');
    }
});

// router.post("/contactform", async (req, res) => {
// 	const { email, message } = req.body;

// 	if (!email || !message) {
// 		res.status(400).json({ msg: "Required (*) Mandatory fields" });
// 	}

//   else{
//     try {
//       const user = await User.findOne({ email });
  
//       if (!user) {
//         res.status(409).json({ msg: "user not exist" });
//       } else {
//         await user.addMsg(message);
//         await user.save();
//         res.status(201).json({ msg: "message send done" });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
	
// });

module.exports = router;

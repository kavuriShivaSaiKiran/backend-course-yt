import { db } from "../prisma/db.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
    const { name, email, password } = req.body
    const userExist = await db.orm.public.User.where((u) => u.email.eq(email)).first();

    if (userExist){
        return res.status(400)
        .json({error: "User already exists with this email"});
    }

    // hashpassword
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create User
    const user = await db.orm.public.User.create({
        name,
        email,
        password: hashedPassword
    })

    // Generate JWT
    const token = generateToken(user.id)

    res.status(201).json({
        status: "success",
        data: {
            user:{
                id: user.id,
                name: name,
                email: email
            } 
        },
        token
    })
};

const login = async(req, res) => {
    const { email, password } = req.body

    const user = await db.orm.public.User.first({email: email})

    if (!user){
        return res.status(401).json({error: "User doesn't exist"})
    }

    // verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid){
        return res.status(401).json({error: "Email or Password doesn't exist"})
    }

    // Generate JWT
    const token = generateToken(user.id, res)
    

    res.status(201).json({
        status: "success",
        data: {
            user:{
                id: user.id,
                email: user.email
            }
        },
        token
    })
}

const logout = async(req, res) => {
    res.cookie("jwt", "", {
        expires: new Date(0)
    })
    res.status(200).json({
        status: "success",
        message: "Logged out successfully"
    })
}


export { register, login, logout };
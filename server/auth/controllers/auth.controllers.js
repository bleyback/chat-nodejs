import { createAccessToken } from '../libs/jwt.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';


export class authController {

    //metodo para registrar
    static async register(req,res) {
        //obtenemos los datos
        const {email,password,username}=req.body
        try{
            //hash de contraseña
            const passhash= await bcrypt.hash(password,10)
            //crear nuevo objeto "user" para la base de datos 
            const newUser = new User({
                username,
                email,
                password:passhash,
            })
            //esperamos el guardado del usuario
            const usersaved=await newUser.save()
            console.log("nuevo usuario "+usersaved)

            res.status(201).json({
                "usuario":usersaved.username,
                "id":usersaved.id,
                "email":usersaved.email,
            })
        }catch(error){
            console.log(error)
            res.status(201).json({mesage:error})
        }
        
        
    }

    //metodo para iniciar sesion
    static async login(req,res) {
        const {email,password}=req.body
        try{
            const userFound= await User.findOne({email})
            if(!userFound) return res.status(400).json({message:"Datos incorrectos"})

            //Comparamos contraseña
            const isMatch= await bcrypt.compare(password,userFound.password)
            //
            if(!isMatch) return res.status(400).json({message:"Datos incorrectos"})
            
            //regresamos un token
            const token=await createAccessToken({id:userFound._id})
            console.log("usuario logeado "+userFound.username)
            res.cookie("token",token)
            res.status(201).json({
                "usuario":userFound.username,
                "id":userFound.id,
                "email":userFound.email,
            })
        }catch(error){
            console.log(error)
            res.status(404).json({mesage:error})
        }
    }

    //Cierrre de sesion
    static async logout(req,res){
        res.cookie("token",null,{
            expires:new Date(0)
        })
        res.status(200).json({message:"logout"})
    }

    static async profile(req,res){
        const userFound =await User.findById(req.user.id)
        res.status(200).json({
            id:userFound._id,
            username:userFound.username,
            email:userFound.email,
        })
    }
}

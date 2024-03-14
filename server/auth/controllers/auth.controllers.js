import User from '../models/user.model.js';

export class authController {
    static async register(req,res) {
        const {email,password,username}=req.body
        try{
            const newUser = new User({
                username,
                email,
                password
            })
            await newUser.save()
            console.log(newUser)
            res.status(404).json({mesage:'registar'})
        }catch(error){
            console.log(error)
            res.status(201).json({mesage:error})
        }
        
        
    }
    static async login(req,res) {
        res.status(404).json({mesage:'login'})
    }

}

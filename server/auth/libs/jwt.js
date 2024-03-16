import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../../schemas/config.js'

export function createAccessToken(paylod){
    return new Promise((resolve,rejects)=>{
        jwt.sign(
            paylod,
            TOKEN_SECRET,
            {
                expiresIn:"1d",
            },(error,token)=>{
                if(error) rejects(error)
                resolve(token)
            }
        )
    }
    )

}
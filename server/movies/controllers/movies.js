import { MovieModel } from '../models/movies.js'
import { validateMovie, validatePartialMiove } from '../schemas/movies.js'

export class MovieController{
    static async getAll(req,res){
        const {genre}= req.query
        const movies= await MovieModel.getAll({genre})
        if(movies) return res.json(movies)
        res.status(404).json({mesage:'Movie no found'})
    }
    static async getById(req,res){
        const {id}=req.params
        const movie= await MovieModel.getById({id})
        if(movie) return res.json(movie)
        res.status(404).json({mesage:'Movie no found'})
    }
    static async create (req,res){
        const result = validateMovie(req.body)
        if(result.error){
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
        const newMovie=await MovieModel.create({input:result.data})
        res.status(201).json(newMovie)
    }
    static async delete (req,res){
        const {id}= req.params
        const result= await MovieModel.delete({id})
        if (result==false) return res.status(404).json({massage:'Movie not found'})
        return res.json({message :'Movie deleted'})
    }
    static async update (req,res){
        const {id}= req.params
        const result = validatePartialMiove(req.body)
        if(result.error){
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
        const updateMovie = await MovieModel.update({id,input:result.data})
        if(updateMovie==false){
            return res.status(400).json({error: 'Movie Not found'})
        }
        return res.json(updateMovie)
    }
}
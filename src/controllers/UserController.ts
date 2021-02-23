import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
    async create(request: Request, response: Response){
        const { name, email } = request.body; // Recolhe as informações do body
        
        const usersRepository = getRepository(User);

        // SELECT * FROM Users WHERE email = 'email'
        const userAlreadyExists = await usersRepository.findOne({ 
            email 
        });

        if (userAlreadyExists) {
            return response.status(400).json({
                error: "User already exists!",
            })
        }

        // Cria o repositório com o usuario recebido no body
        // Id e Data são criados automaticamente 
        const user = usersRepository.create({
            name, email
        })

        // salva a 'Entity' no database configurado no ormconig.json
        await usersRepository.save(user);
        
        // Retorna um json com o usuario criado
        return response.json(user);
    }
}

export { UserController };
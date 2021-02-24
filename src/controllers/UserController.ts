import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UserRepository';

class UserController {
    async create(request: Request, response: Response){
        const { name, email } = request.body; // Recolhe as informações do body
        
        const usersRepository = getCustomRepository(UsersRepository);

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
        return response.status(201).json(user);
    }
}

export { UserController };

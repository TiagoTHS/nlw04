import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UserRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
    async create(request: Request, response: Response){
        const { name, email } = request.body; // Recolhe as informações do body
        
        //Validação
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        });

        try {
            await schema.validate(request.body, { abortEarly: false })
        }catch (err) {
            throw new AppError(err);
        }
        // --------------------------------

        const usersRepository = getCustomRepository(UsersRepository);

        // SELECT * FROM Users WHERE email = 'email'
        const userAlreadyExists = await usersRepository.findOne({ 
            email 
        });

        if (userAlreadyExists) {
            throw new AppError("User already exists");
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

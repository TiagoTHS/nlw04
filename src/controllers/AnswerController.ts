// Pega nota que o usuario deu, a partir do link criado para cada nota.
// Salva essa nota no repositorio 'surveys_users'

import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

    //http://localhost:3333/answers/1?u=106cc555-6e30-4402-979d-e5ddb0ca857c
    /**
     Route Params => Parametros que compõe a rota
     routes.get("/answers/:value")

     Query Params => Busca, Paginação, não obrigatórios
     vem após o '?'
     chave=valor
    */
    async execute(request: Request, response: Response){
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if (!surveyUser) {
            throw new AppError("Survey User does not exists!");
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser)
    }
}

export { AnswerController };
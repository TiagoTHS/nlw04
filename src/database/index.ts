import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    //Confere a variavel de ambiente, se for test, será utilizado o database de test
    return createConnection(
        Object.assign(defaultOptions, {
            database: process.env.NODE_ENV === 'test' 
            ? "./src/database/database.test.sqlite" 
            : defaultOptions.database
        })
    );
};
import {createConnection, Connection} from "typeorm";

let connection: Connection | null = null;

export const getConnection = async (): Promise<Connection> => {
    if (connection === null) {
        connection = await createConnection();
    }

    return connection;
}



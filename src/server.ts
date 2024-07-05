import {config} from "dotenv";
import * as http from 'http'
import * as https from 'https'
import * as fs from 'fs';
import * as path from 'path'
import {parse} from "./args";

config();

const WITHOUT_SSL_FLAG = 'without-ssl';

const app = require('./app');

const {env, argv} = process;

const PORT = env.PORT || 80;

const args = parse(argv.splice(2));
const hasSSL = !args.flags().includes(WITHOUT_SSL_FLAG);


const httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
    console.log(`server running at ${PORT} port`)
});

if (hasSSL) {
    const SSL_PORT = env.SSL_PORT || 443;
    const keyPrivatePath = env.SSL_KEY_PATH || path.join(__dirname, '../cert/ssl.key');
    const certPath = env.SSL_CERT_PATH || path.join(__dirname, '../cert/ssl.crt');

    const PRIVATE_KEY = fs.readFileSync(keyPrivatePath)
    const CERTIFICATE = fs.readFileSync(certPath);


    const credentials = {
        key: PRIVATE_KEY,
        cert: CERTIFICATE
    }


    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(SSL_PORT, () => {
        console.log(`Https server running at ${SSL_PORT} port`)
    });
}


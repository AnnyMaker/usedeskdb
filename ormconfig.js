const {config} = require('dotenv');


config();

const {env} = process;
const entities = env.NODE_ENV === 'dev' ? 'src/entity/**.ts' :'dist/entity/**.js';

const base = {
    type: 'mysql',
    host: env.DB_HOST,
    post: env.DB_PORT || 3306,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    charset: 'utf8mb4_unicode_ci',
    entities: [entities]
}

module.exports = [
    {
        ...base,
    },
    {
        ...base,
        name: 'migration',
        migrations: [
            'migrations/*.ts'
        ],
        cli: {
            migrationsDir: 'migrations'
        }
    },
    {
        ...base,
        name: 'seed',
        migrationsTableName: 'seed',
        migrations: [
            'seed/*.ts'
        ],
        cli: {
            migrationsDir: 'seed'
        }
    }

];
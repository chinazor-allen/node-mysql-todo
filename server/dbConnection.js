import mysql from 'promise-mysql';

// database configuration information
const dbConfig = {
    user: 'root',
    password: 'root',
    database: 'todo_dev',
    host: 'localhost',
    connectionLimit: 10
}

module.exports = async() => {
    try {
        let pool;
        let connect;
        if (pool) con = pool.getConnection();
        else{
            pool = await mysql.createPool(dbConfig);
            connect = pool.getConnection();
        }
        return connect;
        
    } catch (ex) {
        throw ex;
    }
}
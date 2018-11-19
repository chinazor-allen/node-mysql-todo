import dbConnection from '../dbConnection';
import queries from '../queries/queries';
// import { connect } from 'tls';

module.exports = class Todo {
    async createEntity(entity) {
        let connection = await dbConnection();
        try {
            await connection.query('START TRANSACTION');
            let savedTodo = await connection.query(
                queries.create_todo,
                [entity.title, entity.completed]
            );
            await connection.query('COMMIT');
            entity.id = savedTodo.insertId;
            return entity;
        } catch (ex) {
            await connection.query('ROLLBACK');
            console.log(ex);
            throw ex;
        }finally {
            await connection.release();
            await connection.destroy();
        }
    }

    async retrieveEntities(entity) {
        let connection  = await dbConnection();
        try {
            await connection.query('START TRANSACTION');
            let todo = await connection.query(queries.retrieve_todo);
            todo = JSON.parse(JSON.stringify(todo));
            return todo;
        } catch (ex) {
            console.log(ex)
            throw ex;
        } finally {
            await connection.release();
            await connection.destroy();
        }
    }

    async updateEntity(entity) {
        let connection = await dbConnection();
        try {
            await connection.query('START TRANSACTION');
            await connection.query(
                queries.update_todo,
                [ 
                    entity.title,
                    entity.completed,
                    entity.id
                ]);
            await connection.query('COMMIT');
            return true;
        } catch (ex) {
            await connection.query('ROLLBACK');
            console.log(ex);
            throw ex;
        } finally {
            await connection.release();
            await connection.destroy();
        }
    }

    async deleteEntity(id) {
        let connection =  await dbConnection();
        try {
            await connection.query('START TRANSACTION');
            await connection.query(queries.delete_todo, [id]);
            await connection.query('COMMIT');
            return true;
        } catch (ex) {
            await connection.query('ROLLBACK');
            console.log(ex);
            return ex;
        } finally {
            await connection.release();
            await connection.destroy();
        }
    }
};

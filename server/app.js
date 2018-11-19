import Todo from './Todos/Todo'
const todo =  new Todo();

const app = async () => {
    let createdTodo =  await todo.createEntity({
        title: 'Solve an Algorithm task',
        completed: 0
    });
    console.log('Saved todo ->', createdTodo)

    createdTodo.completed = 1
    let isUpdated =  await todo.updateEntity(createdTodo);
    console.log('Is it updated ->', isUpdated)

    let todoList = await todo.retrieveEntities();
    console.log('List of todo ->', todoList);

    let isDeleted = await todo.deleteEntity(createdTodo.id);
    console.log('Is it deleted ->', isDeleted)
}

app();
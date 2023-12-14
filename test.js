const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
const { describe, it } = require("mocha");
const TodosApp = require("./pages/todosApp");

chai.use(chaiHttp);

describe('api testing', () => {
    const todos = new TodosApp(chai, chaiHttp)

    it('should retrieve all todos', async () => {
        const res = await todos.getTodos()
        expect(res).to.have.status(200);
        expect(res.body).to.have.an('object')
    }) 

    it('should retrieve todos based on id', async () => {
        const todosId = "657966b49dc7a74e0a8e8a56";
        const res = await todos.getTodosId(todosId);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('_id', todosId);
        expect(res.body.data).to.have.property('todoName');
        // expect(res.body.data).to.have.property('isComplete');
        // console.log(res.body, "ini response api")
    }) 

    it('should create a new todo', async () => {
        const newTodo = {
            todoName: "work",
            isComplete: false
        }
        const res = await todos.postTodos(newTodo);
        
        
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('todoName').equal(newTodo.todoName)
        expect(res.body.data).to.have.property('isComplete').equal(newTodo.isComplete)
        // console.log(JSON.stringify(res.body, null, 2));
    }) 

    it('should change todo completion status', async () => {
        const updatedTodo = {
            todoName: 'belajar',
            isComplete: true
        }
        const todosId = "653f1bd441075c6067126589"
        const res = await todos.postTodos(updatedTodo, todosId);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('todoName').equal(updatedTodo.todoName)
        expect(res.body.data).to.have.property('isComplete').equal(updatedTodo.isComplete)
    })

    it('should delete todos', async () => {
        const todosId = "6541d9f44eeceb17e6fb5e7e";
        const res = await todos.deleteTodos(todosId)

        expect(res).to.have.status(200)
    })

    it('should return error if todo does not exist', async () => {
        const todoId = "1";
        const res = await todos.deleteTodos(todoId);
    
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').equal('No post with that id.');
    });
    


}).timeout(15000)


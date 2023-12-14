class TodosApp {
  constructor(chai, chaiHttp) {
    this.chai = chai;
    this.chaiHttp = chaiHttp;
    this.baseUrl = "https://calm-plum-jaguar-tutu.cyclic.app";
    // this.headers = {
    //     'Content-Type': 'application/json',
    //      'Accept': 'application/json',
    //      'Cookie': 'd4a7297f48007d6'
    // }
  }

  getTodos() {
    return this.chai.request(this.baseUrl).get("/todos");
  }
  
  getTodosId(todosId) {
    return this.chai.request(this.baseUrl).get(`/todos/${todosId}`);
  }

  postTodos(newTodo) {
    return this.chai.request(this.baseUrl).post(`/todos`).send(newTodo);
  }

  updateTodo(todosId, updatedTodo) {
    return this.chai
      .request(this.baseUrl)
      .put(`/todos/${todosId}`)
      .send(updatedTodo);
  }

  deleteTodos(todosId) {
    return this.chai.request(this.baseUrl).get(`/todos/${todosId}`);
  }
}
module.exports = TodosApp;

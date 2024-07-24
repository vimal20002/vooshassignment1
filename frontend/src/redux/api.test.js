// api.test.js
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { register, login, continuwWithGoogleApi, getTodosApi, getTodoApi, updateTodoApi, addTodoApi, deleteTodoApi } = require('./api');

const mock = new MockAdapter(axios);

describe('API functions', () => {
  afterEach(() => {
    mock.reset();
  });

  test('register should post formData to /auth/signup', async () => {
    const formData = { username: 'test', password: 'test' };
    mock.onPost('/auth/signup').reply(200, { message: 'User registered' });

    const response = await register(formData);
    expect(response.data).toEqual({ message: 'User registered' });
  });

  test('login should post formData to /auth/login', async () => {
    const formData = { username: 'test', password: 'test' };
    mock.onPost('/auth/login').reply(200, { token: 'test-token' });

    const response = await login(formData);
    expect(response.data).toEqual({ token: 'test-token' });
  });

  test('continuwWithGoogleApi should post formData to /auth/google', async () => {
    const formData = { token: 'google-token' };
    mock.onPost('/auth/google').reply(200, { token: 'test-token' });

    const response = await continuwWithGoogleApi(formData);
    expect(response.data).toEqual({ token: 'test-token' });
  });

  test('getTodosApi should get todos with authorization header', async () => {
    const todos = [{ id: 1, title: 'Test Todo' }];
    mock.onGet('/todos').reply(200, todos);

    localStorage.setItem('token', 'test-token');
    const response = await getTodosApi();
    expect(response.data).toEqual(todos);
  });

  test('getTodoApi should get a specific todo with authorization header', async () => {
    const todo = { id: 1, title: 'Test Todo' };
    mock.onGet('/todos/1').reply(200, todo);

    localStorage.setItem('token', 'test-token');
    const response = await getTodoApi({ todoId: 1 });
    expect(response.data).toEqual(todo);
  });

  test('updateTodoApi should patch a specific todo with authorization header', async () => {
    const formData = { todoId: 1, title: 'Updated Todo' };
    mock.onPatch('/todos/1').reply(200, { message: 'Todo updated' });

    localStorage.setItem('token', 'test-token');
    const response = await updateTodoApi(formData);
    expect(response.data).toEqual({ message: 'Todo updated' });
  });

  test('addTodoApi should post formData to /todos with authorization header', async () => {
    const formData = { title: 'New Todo' };
    mock.onPost('/todos').reply(200, { message: 'Todo added' });

    localStorage.setItem('token', 'test-token');
    const response = await addTodoApi(formData);
    expect(response.data).toEqual({ message: 'Todo added' });
  });

  test('deleteTodoApi should delete a specific todo with authorization header', async () => {
    mock.onDelete('/todos/1').reply(200, { message: 'Todo deleted' });

    localStorage.setItem('token', 'test-token');
    const response = await deleteTodoApi({ todoId: 1 });
    expect(response.data).toEqual({ message: 'Todo deleted' });
  });
});

const request = require('supertest');
const app = require('../src/app.js');
const User = require('../src/models/User');

jest.mock('../src/models/User.js', () => ({ create: jest.fn() }))
describe("User routes", () => {
  // this is the structure you should strive for!
  // it('should retrieve all users', async () => {
  //   const response = await request(app).get('/users');
  //   expect(response.statusCode).toBe(200);
  //   const parsedResponse = JSON.parse(response.text);
    
  //   expect(parsedResponse[0].username).toBe('kat1')
  // })

  // the next test below has extra mocking in it
  it('should create a user', async () => {
    User.create.mockResolvedValue({'username': 'testKat', 'email': 'test@test.com', 'password': '2222'});
    
    const response = await request(app).post('/users').send({'username': 'testKat', 'email': 'test@test.com', 'password': '2222'})

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('testKat');
    expect(User.create).toHaveBeenCalledWith({'username': 'testKat', 'email': 'test@test.com', 'password': '2222'})
  })
})
const request = require('supertest'); 
const db = require('../database/dbConfig');
const usernames = require('./user-model.js');
const login = require('../api/server');
const bcryptjs = require("bcryptjs");

//----------------------------------------------------------------------------//
// 
// See ./api/server.spec.js for some info on the jest methods etc. 
// 
//----------------------------------------------------------------------------//

describe('username model', () => {
    describe('add()', () => {
        it('should insert the provided username into the DB', async () => {
            await usernames.add({ username: 'gaffer', password:"yes" });
            await usernames.add({ username: 'sam', password:"yes" });

            const username = await db('users');
            expect(username).toHaveLength(2);
        });

        it('should return what was inserted', async () => {
            let hobbit = await usernames.add({ username: 'gaffer', password:"yes" });
            expect(hobbit.username).toBe('gaffer');

            hobbit = await usernames.add({ username: 'sam', password:"yes" });
            expect(hobbit.username).toBe('sam');
        });
       


        beforeEach(async () => {
            await db('users').truncate();
        })
    });
});

describe('auth-routher.js', () => {
  
    describe('login route', () => {
      it('should return json from the login route', async () => {
        
        
        
        const response = await request(login).post('/api/auth/login')
        .send({
            username:"sam",
             password:"yes"
        });
       
        expect(response.type).toEqual('application/json');
    
      });
      it('should return an OK status code from the login route', async () => {
        
        const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync("12312", rounds);
 
    await usernames.add({ username: 'sam1', password:(hash) });
        // do a get request to our api (server.js) and inspect the response
        const response = await request(login).post('/api/auth/login')
        .send({
          username:"sam1",
           password:"12312"
      });
        console.log(response.body);
        expect(response.statusCode).toBe(200);
        
  
    
      });
  
  
      it('should return a JSON object from the index route', async () => {
        const expectedBody = { api: 'up' };
  
        const response = await request(login).get('/');
  
        expect(response.body).toEqual(expectedBody);
      });
  
      it('should return a JSON object from the index route', async () => {
        const response = await request(login).get('/');
  
        expect(response.type).toEqual('application/json');
      });
    //   beforeEach(async () => {
    //     await db('users').truncate();
    // })
    });
  });


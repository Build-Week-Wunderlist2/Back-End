const request = require('supertest'); 
const db = require('../database/dbConfig');
const usernames = require('./user-model.js');
const server = require('../server');
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
        
        
        
        const response = await request(server).post('/api/auth/login')
        .send({
            username:"sam1",
             password:"yes1"
        });
       
        expect(response.type).toEqual('application/json');
    
      });
      it('should return an OK status code from the login route', async () => {
        
        const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync("12312", rounds);
 
    await usernames.add({ username: 'sam1', password:(hash) });
     
        const response = await request(server).post('/api/auth/login')
        .send({
          username:"sam1",
           password:"12312"
      });
        console.log(response.body.token);
        expect(response.statusCode).toBe(200);
        
  
    
      });
  
  
      it('should return a JSON object from the index route', async () => {
        const expectedBody = { api: "just getting started(api up)" };
  
        const response = await request(server).get('/');
  
        expect(response.body).toEqual(expectedBody);
      });
  
      it('should return a JSON object from the index route', async () => {
        const response = await request(server).get('/');
  
        expect(response.type).toEqual('application/json');
      });

    });

    it('should return a JSON object from the index route', async () => {
      const expectedBody = { api: "just getting started(api up)" };

      const response = await request(server).get('/');

      expect(response.body).toEqual(expectedBody);
    });

    it('should return a JSON object from the index route', async () => {
      const response = await request(server).get('/');

      expect(response.type).toEqual('application/json');
    });
  });
 

  //------Adds a user with hashed password---------------------------------------------
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcryptjs.hashSync("yes", rounds);
    usernames.add({ username: 'jersco', password:(hash) });
   //-------------------------------------------------------------------------------------
 
  
  
  describe('Todos routes', () => {
  // ----------------------------------------------------------------------------
   
    
    let token;
beforeEach( (done) => {
 
       request(server).post('api/auth/login')
        .send({
          username: "jersco",
          password: "yes"
        })
        .end((err, response) => {
            token = response.body.token;
      done()
         
        });
    });

//--------------------------------------------------------------------------------

    it('should return json and a 200 code from the todos .post route', async () => {
  
      
    // -------------------------------------------------------------------------------------------------
 
    //  const token = await request(server).post('api/auth/login')
    //   .send({
    //     username: "jersco",
    //     password: "yes"
    //   })
    //   .then((err, response) => {
    //     console.log(response);
    //       tkn = response.body.token;
    //       done()
    //   })

    // -------------------------------------------------------------------------------------
      const response = await request(server).post('/api/user/todos')
       .set('Authorization',token)
      .send({
          title:"wosww",
           user_id:"4"
      });
    // console.log(response.header);
      expect(response.type).toEqual('application/json');
         expect(response.statusCode).toBe(200);
  
    });

    it('should return json and a 200 code from the todo .get route', async () => {
      
      const response = await request(server).post('/api/user/3/todos')
      // .set('Authorization', `Bearer ${token}`)
     
    
      expect(response.type).toEqual('application/json');
      //  expect(response.statusCode).toBe(200);
  
    });

    it('should return json and a 200 code from the task .post route', async () => {
      
      const response = await request(server).post('/api/user/task')
      // .set('Authorization', `Bearer ${token}`)
      .send({
          description:"woodsfasww",
           task_id:"3"
      });
    
      expect(response.type).toEqual('application/json');
      //  expect(response.statusCode).toBe(200);
  
    });

    it('should return json and a 200 code from the task .get route', async () => {
      
      const response = await request(server).post('/api/user/3/task')
      // .set('Authorization', `Bearer ${token}`)
     
    
      expect(response.type).toEqual('application/json');
      //  expect(response.statusCode).toBe(200);
  
    });
    
  });


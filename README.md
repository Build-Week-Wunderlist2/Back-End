# Back-End


<h2>Root URl: https://todolist1213.herokuapp.com/api</h2>



| Method | Description                           | Endpoint             |
| ------ | ------------------------------------- | -------------------- |
| POST   | Create a user account                 | /auth/register       |
| POST   | Login a user                          | /auth/login          |
| get    | gets todo lists                       | /user/todos          |
| POST   | post a new todo list                  | /auth/login          |


<h2>user structure</h2>

### Users Table
| Key      | Type    | Required                |
| -------- | ------- | ----------------------- |
| id       | integer | Yes (server controlled) |
| username | string  | Yes                     |
| password | string  | Yes                     |

when posting body should look like this
```
{
    username:"string",
    password:"string"
}
```
<h2>todo lists structure</h2>

### todos Table
| Key      | Type    | Required                |
| -------- | ------- | ----------------------- |
| id       | integer | Yes (server controlled) |
| title    | string  | Yes                     |
| user_id  | integer  | yes (foreing key)      |
| complete | boolean | no                      |
| date     | dateTime| yes(server created)     |

### task Table
| Key      | Type    | Required                |
| -------- | ------- | ----------------------- |
| id       | integer | Yes (server controlled) |
| description | string  | Yes                  |
| todo_id  | integer | yes                     |
| complete | boolean | no                      |
| date     | dateTime| yes(server created)     |


## Register (Non-protected)
**URL:** */auth/register*

This registers a new user, it will return the 201 message below with a token, this token needs to be stored in Local Storage.  The token contains the following data
```
{
  "userid": 2,
  "username": "jsmith",

}
```


### Example
```
{
   "username": "jsmith",
   "password": "jsmith"
}
```

### Responses
```
Code: 201 (Created)
{
  "data": {
    "id": 1,
    "username": "jsmith",
    "password": "$2a$08$LMBshNiKwunQj4zST4Nwc.NSyBJRwAKRmE14IUqkh8yZwPIpEinB2"
  }

Code: 500 (Internal Server Error)
{
   "message": "Internal Server Error, Error Returned: <error>"
}
```

## Login (Non-protected)
**HTTP Method:** *POST*

**URL:** */auth/login*

This logs in a user, it will return the 200 message below with a token, this token needs to be stored in Local Storage.  The token contains the following data

### Example
```
{
   "username": "jsmith",
   "password": "jsmith"
}
```

### Responses

Code: 200 (Successful Login)
```
{
   "message": "Welcome to our api",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imtsb2NrIiwiaWF0IjoxNTgyODE1NzEyLCJleHAiOjE1ODI4MTkzMTJ9.YaduCwtuESqfPocXdzS2ggRZVxF9lQ5fB0lh7DpXQb8"
}
```
Code: 401 (Unauthorized)
```
{
   "message": "Invalid username or password"
}
```
Code: 500 (Internal Server Error)
```
{
   "message": "Internal Server Error, Error Returned: <error>"
}
```
## Create a todo list (protected)
**HTTP Method:** *POST*

**URL:** */user/todos*

This logs in a user, it will return the 200 message below with a token, this token needs to be stored in Local Storage.  The token contains the following data

### Example
```
{
   "username": "jsmith",
   "password": "jsmith"
}
```
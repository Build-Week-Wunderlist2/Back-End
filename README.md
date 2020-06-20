# Back-End


<h2>Root URl: https://todolist1213.herokuapp.com/api</h2>



| Method | Description                           | Endpoint             |
| ------ | ------------------------------------- | -------------------- |
| POST   | Create a user account                 | /auth/register       |
| POST   | Login a user                          | /auth/login          |
| get    | gets todo lists                       | /user/todos          |
| POST   | post a new todo list                  | /user/:id/todos      |
| GET    | get a list of todo list's             | /user/todos/:id      |
| put    | update a todo list                    | /user/todos/:id      |
| DELETE | delete a todo list                    | /user/todos/:id      |
| POST   | post a new task to list               | /user/task           |
| GET    | get a list of tasks                   | /user/:id/task       |
| DELETE | delete a task                         | /user/:id/task       |


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

when posting body should look like this
```
{
 
   title:"string",
   complete:Boolean(defaults to false if not entered),
   user_id:#(comes back in body of login)
   }
```

### task Table
| Key      | Type    | Required                |
| -------- | ------- | ----------------------- |
| id       | integer | Yes (server controlled) |
| description | string  | Yes                  |
| todo_id  | integer | yes                     |
| complete | boolean | no                      |
| date     | dateTime| yes(server created)     |
| deadline | date    | yes(server created)     |
|repeatsDaily | boolean | no                   |
|repeatsWeakly | boolean | no                  |
|repeatsMonthly | boolean | no                 |

From what i can tell you can set the repeats daily/weekly/monthly to true or false and I will set it up on my end to repeat the .post at those intervals. 


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
  "message": "Welcome to our API",
  "user_id": 1,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImhhcHB5MTIiLCJpYXQiOjE1OTI1OTk4NzUsImV4cCI6MTU5MjYwNzA3NX0.XFr-ooacIB5Q4tCNBXMhYussBPXLM0eaeaO7RBQHTTk"
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

This creates a new todo list

### Example
```

  {
   id:Number(server made),
   title:"string",
   complete:Boolean(defaults to false if not entered),
   date:auto generated
   }

```
### Responses

Code: 200 (Successfuly added todo list)
```
{
  "id": #,
  "date": null,
  "title": "string",
  "complete": 0 or 1,
  "user_id": 1
}
```

## get todo list's (protected)
**HTTP Method:** *GET*

**URL:** */user/:id/todos*

### Responses

Code: 200 (Successfuly retrieval)
```
[
  {
    "user_id": 1,
    "title": "string",
    "complete": 0,
    "date": null,
    "id": 1
  },
  {
    "user_id": 1,
    "title": "string ",
    "complete": 0,
    "date": null,
    "id": 2
  }

]
```
## Update a todo list (protected)
**HTTP Method:** *PUT*

**URL:** */user/todos/:id*

This updates a todo list by id

### Example
```

  {
   id:#(from url parameters),
   title:"string",
   complete:Boolean(defaults to false if not entered),
   }

```
### Responses

Code: 200 (Successfuly updated todo list)
```
returns the id # that was updated.
```
## Create a task (protected)
**HTTP Method:** *POST*

**URL:** */user/task*

This creates a new task list

### Example
```

  {
   id:Number(server made),
   description:"string",
   complete:Boolean(defaults to false if not entered),
   date:auto generated
   }

```
### Responses

Code: 200 (Successfuly added task list)
```
{
  "id": #,
  "date": null,
  "description": "string",
  "complete": 0 or 1,
  "task_id": 1
}
```


## get all task on list (protected)
**HTTP Method:** *get*

**URL:** */user/task*

This creates a new task list

### Example
```

  {
   id:Number(server made),
   description:"string",
   complete:Boolean(defaults to false if not entered),
   date:auto generated
   }

```
### Responses

Code: 200 (Successfuly added task list)
```
{
  "id": #,
  "date": null,
  "description": "string",
  "complete": 0 or 1,
  "task_id": 1
}
```

## delete a task  (protected)
**HTTP Method:** *DELETE*

**URL:** */user/task/:id*

This deletes a task by id


### Responses

Code: 200 (Successfuly deleted task)
```
returns the id # that was updated.
```
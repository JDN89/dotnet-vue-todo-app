# Description

This project is inspired by Google keep and is not meant to be used as a real todo list app.

DEMO: https://dotnet-vue-todo-app.herokuapp.com/

 - Frontend:
    - Vue 3 Composition API 
    - Pinia: Vue Store 
    - Windi CSS 
    - Typescript 
 - Backend:
    -  ASP.NET Core minimal web API 
    - PostgreSQL
    - Dapper: object–relational mapping 

## Print screens

![image](https://github.com/JDN89/dotnet-vue-todo-app/blob/master/ReadMe_images/register)

![image](https://github.com/JDN89/dotnet-vue-todo-app/blob/master/ReadMe_images/login)

![image](https://github.com/JDN89/dotnet-vue-todo-app/blob/master/ReadMe_images/mytodos)
    
### Usage
On the Homepage you can leave a message and say hello.

Register with a fake email and login in order to create, modify and delete your personal todo lists.
#### Development


Client:
```bash
npm run dev
```

API:
```bash
dotnet watch run
```

##### Build

To build the clientApp, run

```bash
npm run build
npm run postbuild (move dist foler to api wwwroot folder)
```

And you will see the generated file in `dist` that ready to be served.

To build the API, run

```bash
dotnet build
```



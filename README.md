 test if refactore bakcned works
# Chore:
 - Remove **Carter** and user other  method to register apiEndpoints and services => Carter is slowing down minimal api, because it's trying to do the same thing -> redundant.
- create Database folder:
   - DbConnectionFactory.cs  (look at example Nick for inspiration) 
   - DatabaseInitializer.cs  (look at example Nick for inspiration)


# Description

This project is inspired by Google keep and is not meant to be used as a real todo list app.
I implemented the Vertical Slice Architecture: grouping everything related to a single action (business logic, data access, domain transfer objects,...) into one place. Each feature covers a vertical slice of the application. I think this architecture goes well in combination with the minimal Api.
- https://www.ghyston.com/insights/architecting-for-maintainability-through-vertical-slices
- https://timdeschryver.dev/blog/maybe-its-time-to-rethink-our-project-structure-with-dot-net-6
- https://www.youtube.com/watch?v=SUiWfhAhgQw

DEMO: https://dotnet-vue-todo-app.herokuapp.com/
LOGIN (if you don't want to create a fake user account)
- user: test@user.com
- password: 12345678
-
PWA Hosted on Heroku **hobby dev**, so the application will take **between 10 and 20 seconds to load completely**.

 - Frontend:
    - Vue 3 Composition API 
    - Pinia: Vue Store 
    - Windi CSS 
    - Typescript 
 - Backend:
    -  ASP.NET Core minimal web API 
    - PostgreSQL
    - Dapper: object–relational mapping 

## Usage
On the Homepage you can leave a message and say hello.

Register with a fake email and login in order to create, modify and delete your personal todo lists.

### Print screens

![image](https://github.com/JDN89/dotnet-vue-todo-app/blob/main/ReadMe_images/messageboard.png)

![image](https://github.com/JDN89/dotnet-vue-todo-app/blob/main/ReadMe_images/register.png)

![image](https://github.com/JDN89/dotnet-vue-todo-app/blob/main/ReadMe_images/login.png)

![image](https://github.com/JDN89/dotnet-vue-todo-app/blob/main/ReadMe_images/mytodos.png)

![image](https://github.com/JDN89/dotnet-vue-todo-app/blob/main/ReadMe_images/todo_db.png)

![image](https://github.com/JDN89/dotnet-vue-todo-app/blob/main/ReadMe_images/lighthouse_stats.png)
    

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



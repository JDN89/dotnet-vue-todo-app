"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var vueI18n = require("vue-i18n");
var masonry = require("vue-next-masonry");
var NProgress = require("nprogress");
var pinia = require("pinia");
var axios = require("axios");
var viteSsg = require("vite-ssg");
var vue = require("vue");
var serverRenderer = require("vue/server-renderer");
var vueRouter = require("vue-router");
var core = require("@vueuse/core");
var head = require("@vueuse/head");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var masonry__default = /* @__PURE__ */ _interopDefaultLegacy(masonry);
var NProgress__default = /* @__PURE__ */ _interopDefaultLegacy(NProgress);
var axios__default = /* @__PURE__ */ _interopDefaultLegacy(axios);
var en = {
  "button": {
    "about": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["About"]);
    },
    "back": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Back"]);
    },
    "go": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["GO"]);
    },
    "home": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Home"]);
    },
    "login": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Login"]);
    },
    "logout": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Logout"]);
    },
    "register": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Register"]);
    },
    "toggle_dark": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Toggle dark mode"]);
    },
    "toggle_langs": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["ENG > ES"]);
    },
    "submit": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Submit"]);
    },
    "createList": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Create a new list"]);
    },
    "change": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Change message"]);
    },
    "edit": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Edit list"]);
    },
    "delete": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Delete"]);
    },
    "close": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Close"]);
    }
  },
  "page": {
    "home": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Say hello"]);
    },
    "login": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Login"]);
    },
    "logout": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Logout"]);
    },
    "register": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Register"]);
    }
  },
  "alert": {
    "todoNull": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Please fill in a todo description"]);
    },
    "todoDuplicate": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Todo item is already present in the current list, no need to add duplicate tasks ;)"]);
    },
    "zeroTasks": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Your todo list has zero tasks"]);
    },
    "listTitle": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Please give your list a title"]);
    },
    "title": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Please give your message a title"]);
    },
    "content": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Please write a message that goes with the title"]);
    }
  },
  "text": {
    "password": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Password"]);
    },
    "confirmPassword": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Confirm password"]);
    },
    "registrationSuccessful": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Registration successful!"]);
    },
    "intro": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["This project is inspired by Google keep and is not meant to be used as a real todo list app."]);
    }
  },
  "about": {
    "titleHowTo": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["How to use project"]);
    },
    "homepage": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["On the Homepage you can leave a message and say hello."]);
    },
    "register": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Register with a fake email and login in order to create, modify and delete your personal todo lists."]);
    },
    "security": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Authentication and Authorization, via JWT tokens and claims, is being used to secure and access the user his personal todo lists"]);
    },
    "tech": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Technologies used"]);
    }
  },
  "input": {
    "title": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Title"]);
    },
    "message": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Message"]);
    },
    "todo": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Todo"]);
    }
  },
  "intro": {
    "desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Opinionated Vite Starter Template"]);
    },
    "dynamic-route": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Demo of dynamic route"]);
    },
    "hi": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize(["Hi, ", _interpolate(_named("name")), "!"]);
    },
    "aka": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Also known as"]);
    },
    "whats-your-name": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["What's your name?"]);
    }
  },
  "not-found": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["Not found"]);
  }
};
var __glob_1_0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": en
});
var es = {
  "button": {
    "about": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Acerca de"]);
    },
    "back": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Atr\xE1s"]);
    },
    "go": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Ir"]);
    },
    "home": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Inicio"]);
    },
    "login": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Acceso"]);
    },
    "register": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Registrarse"]);
    },
    "logout": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Cerrar sesi\xF3n"]);
    },
    "toggle_dark": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Alternar modo oscuro"]);
    },
    "toggle_langs": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["ES > ENG"]);
    },
    "submit": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Aplicar"]);
    },
    "createList": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Crear una nueva lista"]);
    },
    "change": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Cambiar mensaje"]);
    },
    "edit": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Edita tu lista"]);
    },
    "delete": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Borrar"]);
    },
    "close": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Cerrar"]);
    }
  },
  "intro": {
    "desc": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Plantilla de Inicio de Vite Dogm\xE1tica"]);
    },
    "dynamic-route": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Demo de ruta din\xE1mica"]);
    },
    "hi": (ctx) => {
      const { normalize: _normalize, interpolate: _interpolate, named: _named } = ctx;
      return _normalize(["\xA1Hola, ", _interpolate(_named("name")), "!"]);
    },
    "aka": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Tambi\xE9n conocido como"]);
    },
    "whats-your-name": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\xBFC\xF3mo te llamas?"]);
    }
  },
  "alert": {
    "todoNull": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Por favor, complete una descripci\xF3n de todo"]);
    },
    "todoDuplicate": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["El Todo ya est\xE1 presente en la lista actual, no es necesario agregar tareas duplicadas ;)"]);
    },
    "zeroTasks": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Tu lista de tareas tiene cero tareas"]);
    },
    "listTitle": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Por favor, dale un t\xEDtulo a tu lista."]);
    },
    "title": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Por favor dale un t\xEDtulo a tu mensaje"]);
    },
    "content": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Por favor escribe un mensaje que vaya con el t\xEDtulo."]);
    }
  },
  "not-found": (ctx) => {
    const { normalize: _normalize } = ctx;
    return _normalize(["No se ha encontrado"]);
  },
  "input": {
    "title": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["T\xEDtulo"]);
    },
    "message": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Mensaje"]);
    },
    "todo": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Hacer"]);
    }
  },
  "text": {
    "password": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Contrase\xF1a"]);
    },
    "confirmPassword": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Confirmar contrase\xF1a"]);
    },
    "registrationSuccessful": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["\xA1Registro exitoso!"]);
    },
    "intro": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Este proyecto est\xE1 inspirado en Google Keep y no est\xE1 destinado a ser utilizado como una aplicaci\xF3n de lista de tareas real."]);
    }
  },
  "about": {
    "titleHowTo": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["C\xF3mo usar el proyecto"]);
    },
    "homepage": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["En la p\xE1gina de inicio puedes dejar un mensaje y saludar."]);
    },
    "register": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Reg\xEDstrese con un correo electr\xF3nico falso e inicie sesi\xF3n para crear, modificar y eliminar sus listas de tareas personales."]);
    },
    "security": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["La autenticaci\xF3n y autorizaci\xF3n, a trav\xE9s de tokens y reclamos JWT, se utiliza para asegurar y acceder al usuario a sus listas personales de tareas pendientes."]);
    },
    "tech": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Tecnolog\xEDas utilizadas"]);
    }
  },
  "page": {
    "home": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Dile hola"]);
    },
    "login": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Acceso"]);
    },
    "logout": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Cerrar sesi\xF3n"]);
    },
    "register": (ctx) => {
      const { normalize: _normalize } = ctx;
      return _normalize(["Registrarse"]);
    }
  }
};
var __glob_1_1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": es
});
const messages = Object.fromEntries(Object.entries({ "../../locales/en.yml": __glob_1_0, "../../locales/es.yml": __glob_1_1 }).map(([key, value]) => {
  const yaml = key.endsWith(".yaml");
  return [key.slice(14, yaml ? -5 : -4), value.default];
}));
const install$5 = ({ app }) => {
  const i18n = vueI18n.createI18n({
    legacy: false,
    locale: "en",
    messages
  });
  app.use(i18n);
};
var __glob_9_0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  install: install$5
});
const install$4 = ({ app, isClient, initialState }) => {
  if (!isClient)
    return;
  app.use(masonry__default["default"]);
};
var __glob_9_1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  install: install$4
});
const install$3 = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach(() => {
      NProgress__default["default"].start();
    });
    router.afterEach(() => {
      NProgress__default["default"].done();
    });
  }
};
var __glob_9_2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  install: install$3
});
const install$2 = ({ isClient, initialState, app }) => {
  const pinia$1 = pinia.createPinia();
  app.use(pinia$1);
  if (isClient)
    pinia$1.state.value = initialState.pinia || {};
  else
    initialState.pinia = pinia$1.state.value;
};
var __glob_9_3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  install: install$2
});
const install$1 = ({ isClient, router }) => {
  if (!isClient)
    return;
  router.isReady().then(async () => {
    const { registerSW } = await Promise.resolve().then(function() {
      return require("./assets/virtual_pwa-register.84e39fe3.js");
    });
    registerSW({ immediate: true });
  });
};
var __glob_9_4 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  install: install$1
});
const apiClient = axios__default["default"].create({
  baseURL: "/api",
  withCredentials: false
});
var EventService = {
  async getMessages() {
    return await apiClient.get("/");
  },
  async postMessage(message) {
    return await apiClient.post("/", message);
  },
  async deleteMessage(id) {
    return await apiClient.delete("/?id=" + id);
  },
  async putMessage(message) {
    return await apiClient.put("/", message);
  },
  async registerUser(user) {
    return await apiClient.post("/register", user);
  },
  async loginUser(user) {
    return await apiClient.post("/login", user);
  },
  async getTodoLists(userToken) {
    return await apiClient.get("/myTodos", {
      headers: {
        Authorization: "Bearer " + userToken
      }
    });
  },
  async postTodoList(todoList, userToken) {
    return await apiClient.post("/myTodos", todoList, {
      headers: { Authorization: "Bearer " + userToken }
    });
  },
  async deleteTodoList(listId, userToken) {
    return await apiClient.delete("/myTodos?listId=" + listId, {
      headers: { Authorization: "Bearer " + userToken }
    });
  },
  async addTodo(newTodo, userToken) {
    return await apiClient.post("/myTodos/todo", newTodo, {
      headers: { Authorization: "Bearer " + userToken }
    });
  },
  async archiveTodo(archiveTodo, userToken) {
    return await apiClient.put("/myTodos/archived", archiveTodo, {
      headers: { Authorization: "Bearer " + userToken }
    });
  },
  async unArchiveTodo(unArchiveTodo, userToken) {
    return await apiClient.put("/myTodos/unarchived", unArchiveTodo, {
      headers: { Authorization: "Bearer " + userToken }
    });
  }
};
const useTodoStore = pinia.defineStore("todo", {
  state: () => ({
    toDoLists: null,
    showAddTask: null,
    showAddTodoComp: false,
    temporaryList: null
  }),
  actions: {
    async fetchTodoLists() {
      const userStore = useUserStore();
      const userToken = userStore.getToken;
      if (userToken)
        await EventService.getTodoLists(userToken).then((res) => this.toDoLists = res.data).catch((error) => {
          var _a;
          if (axios__default["default"].isAxiosError(error)) {
            if (error.response) {
              console.log((_a = error.response) == null ? void 0 : _a.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
          }
        });
    },
    async checkDuplicates(todosArr) {
      const filteredTodos = [...new Set(todosArr)];
      return filteredTodos;
    },
    async add(newToDoList) {
      let filteredArr = await this.checkDuplicates(newToDoList.todos);
      newToDoList.todos = filteredArr;
      const userStore = useUserStore();
      const userToken = userStore.getToken;
      if (userToken)
        await EventService.postTodoList(newToDoList, userToken).then(() => {
          this.fetchTodoLists();
        }).catch((error) => {
          var _a;
          if (axios__default["default"].isAxiosError(error)) {
            if (error.response) {
              console.log((_a = error.response) == null ? void 0 : _a.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
          }
        });
    },
    async deleteList(listId) {
      const userStore = useUserStore();
      const userToken = userStore.getToken;
      if (userToken)
        await EventService.deleteTodoList(listId, userToken).then(() => this.fetchTodoLists()).catch((error) => {
          var _a;
          if (axios__default["default"].isAxiosError(error)) {
            if (error.response) {
              console.log((_a = error.response) == null ? void 0 : _a.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
          }
        });
    },
    async changeList(list) {
      this.showAddTodoComp = true;
      this.temporaryList = list;
    },
    async fetchList(listId) {
      if (this.toDoLists == null) {
        throw console.error("toDoLists is null");
      }
      const lookup = this.toDoLists.find((list) => list.listId == listId);
      if (lookup == void 0) {
        throw console.error("lookup is undefined");
      }
      return this.temporaryList = lookup;
    },
    async addTodo(listId, todo) {
      const userStore = useUserStore();
      const userToken = userStore.getToken;
      const newTodo = {
        listId,
        todo
      };
      if (userToken)
        await EventService.addTodo(newTodo, userToken).then(() => this.fetchTodoLists()).catch((error) => {
          var _a;
          if (axios__default["default"].isAxiosError(error)) {
            if (error.response) {
              console.log((_a = error.response) == null ? void 0 : _a.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
          }
        });
    },
    async archiveTask(listId, todo) {
      const userStore = useUserStore();
      const userToken = userStore.getToken;
      const archiveTodo = {
        listId,
        todo
      };
      if (userToken)
        await EventService.archiveTodo(archiveTodo, userToken).then(() => this.fetchTodoLists()).catch((error) => {
          var _a;
          if (axios__default["default"].isAxiosError(error)) {
            if (error.response) {
              console.log((_a = error.response) == null ? void 0 : _a.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
          }
        });
    },
    async unArchiveTask(listId, archived) {
      const userStore = useUserStore();
      const userToken = userStore.getToken;
      const unArchiveTodo = {
        listId,
        todo: archived
      };
      if (userToken)
        await EventService.unArchiveTodo(unArchiveTodo, userToken).then(() => this.fetchTodoLists()).catch((error) => {
          var _a;
          if (axios__default["default"].isAxiosError(error)) {
            if (error.response) {
              console.log((_a = error.response) == null ? void 0 : _a.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
          }
        });
    }
  },
  getters: {
    getLists: (state) => state.toDoLists,
    getShowAddTask: (state) => state.showAddTask,
    getShowAddTodoComponent: (state) => state.showAddTodoComp,
    getTemporaryList: (state) => state.temporaryList
  }
});
const useUserStore = pinia.defineStore("user", {
  state: () => ({
    registrationFormIsVisible: true,
    createdUserData: null,
    loginData: null,
    token: null
  }),
  actions: {
    async registerUser() {
      if (this.createdUserData)
        await EventService.registerUser(this.createdUserData).then(() => {
          this.createdUserData = null;
          this.registrationFormIsVisible = false;
        }).catch((error) => {
          var _a;
          if (axios__default["default"].isAxiosError(error)) {
            if (error.response) {
              console.log((_a = error.response) == null ? void 0 : _a.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
          }
        });
    },
    async loginUser(user) {
      await EventService.loginUser(user).then((res) => {
        this.token = res.data;
        if (this.token == null)
          return console.error("no token set");
        window.sessionStorage.setItem("token", this.token);
        this.loginData = null;
      }).catch((error) => {
        var _a;
        if (axios__default["default"].isAxiosError(error)) {
          if (error.response) {
            console.log((_a = error.response) == null ? void 0 : _a.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        }
      });
    },
    async retrieveSession(token) {
      var _a;
      this.token = token;
      const todoStore = useTodoStore();
      try {
        await todoStore.fetchTodoLists();
      } catch (error) {
        if (axios__default["default"].isAxiosError(error)) {
          if (error.response) {
            console.log((_a = error.response) == null ? void 0 : _a.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        }
      }
    },
    logout() {
      window.sessionStorage.removeItem("token");
      const todoStore = useTodoStore();
      todoStore.toDoLists = null;
    }
  },
  getters: {
    getLoginData: (state) => state.loginData,
    getToken: (state) => state.token,
    getRegistrationFormIsVisible: (state) => state.registrationFormIsVisible
  }
});
const install = ({ app, router, isClient }) => {
  if (isClient) {
    const userStore = useUserStore();
    router.beforeEach((to, from, next) => {
      var _a, _b;
      if (((_a = to.meta) == null ? void 0 : _a.requiresAuth) && userStore.getToken) {
        next();
      } else if ((_b = to.meta) == null ? void 0 : _b.requiresAuth) {
        next("/login");
      } else {
        next();
      }
    });
  }
};
var __glob_9_5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  install
});
const _hoisted_1$g = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 16 16"
};
const _hoisted_2$g = /* @__PURE__ */ vue.createElementVNode("g", { fill: "currentColor" }, [
  /* @__PURE__ */ vue.createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0z"
  }),
  /* @__PURE__ */ vue.createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0z"
  })
], -1);
const _hoisted_3$d = [
  _hoisted_2$g
];
function render$g(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$g, _hoisted_3$d);
}
var __unplugin_components_0$7 = { name: "bi-x-lg", render: render$g };
const useAlertStore = pinia.defineStore("alert", {
  state: () => ({
    showAlert: false,
    alertMessage: null
  }),
  actions: {
    async closeAlert() {
      this.showAlert = false;
      this.alertMessage = null;
    }
  },
  getters: {
    getShowAlert: (state) => state.showAlert,
    getAlertMessage: (state) => state.alertMessage
  }
});
var block0$5 = {};
const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const alertStore = useAlertStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_bi_x_lg = __unplugin_components_0$7;
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "flex bg-gray-800 bg-opacity-50 fixed left-0 right-0 bottom-0 top-0 items-center absolute" }, _attrs))}><div class="alert prose content-center min-h-44 max-h-lg w-full m-1 p-2 sm:max-w-70 sm:mx-auto mx-auto"><button class="float-right hover mt-1 mr-1">`);
      _push(serverRenderer.ssrRenderComponent(_component_bi_x_lg, null, null, _parent));
      _push(`</button><h3 class="relative">Alert: ${serverRenderer.ssrInterpolate(vue.unref(alertStore).getAlertMessage)}</h3></div></div>`);
    };
  }
});
if (typeof block0$5 === "function")
  block0$5(_sfc_main$b);
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/Alert/Alert.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _hoisted_1$f = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$f = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M12 12h2v12h-2z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$c = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M18 12h2v12h-2z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$6 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z",
  fill: "currentColor"
}, null, -1);
const _hoisted_5$1 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M12 2h8v2h-8z",
  fill: "currentColor"
}, null, -1);
const _hoisted_6 = [
  _hoisted_2$f,
  _hoisted_3$c,
  _hoisted_4$6,
  _hoisted_5$1
];
function render$f(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$f, _hoisted_6);
}
var __unplugin_components_3$2 = { name: "carbon-trash-can", render: render$f };
const _hoisted_1$e = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$e = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M6 18l1.41 1.41L15 11.83V30h2V11.83l7.59 7.58L26 18L16 8L6 18z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$b = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M6 8V4h20v4h2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$5 = [
  _hoisted_2$e,
  _hoisted_3$b
];
function render$e(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$e, _hoisted_4$5);
}
var __unplugin_components_0$6 = { name: "carbon-upload", render: render$e };
const useMessageStore = pinia.defineStore("messages", {
  state: () => ({
    changedMessage: {
      title: "",
      id: 0,
      body: ""
    },
    isVisible: false,
    messages: []
  }),
  actions: {
    async fetchMessages() {
      await EventService.getMessages().then((res) => {
        this.messages = res.data;
      }).catch((error) => {
        var _a;
        if (axios__default["default"].isAxiosError(error)) {
          if (error.response) {
            console.log((_a = error.response) == null ? void 0 : _a.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        }
      });
    },
    async addMessage(message) {
      await EventService.postMessage(message).then(() => this.fetchMessages()).catch((error) => {
        var _a;
        if (axios__default["default"].isAxiosError(error)) {
          if (error.response) {
            console.log((_a = error.response) == null ? void 0 : _a.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        }
      });
    },
    async deleteMessage(id) {
      await EventService.deleteMessage(id).then(() => {
        this.fetchMessages();
        this.isVisible = false;
      }).catch((error) => {
        var _a;
        if (axios__default["default"].isAxiosError(error)) {
          if (error.response) {
            console.log((_a = error.response) == null ? void 0 : _a.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        }
      });
    },
    async changeMessage(message) {
      this.isVisible = true;
      this.changedMessage = message;
    },
    async updateMessage(message) {
      await EventService.putMessage(message).then(() => {
        this.fetchMessages();
        this.isVisible = false;
      }).catch((error) => {
        var _a;
        if (axios__default["default"].isAxiosError(error)) {
          if (error.response) {
            console.log((_a = error.response) == null ? void 0 : _a.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        }
      });
    }
  },
  getters: {
    getMessages: (state) => state.messages,
    getShowModal: (state) => state.isVisible,
    getChangedMessage: (state) => state.changedMessage
  }
});
var block0$4 = {};
const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = vueI18n.useI18n();
    const messageStore = useMessageStore();
    const alertStore = useAlertStore();
    let messageToChange;
    if (messageStore.getChangedMessage) {
      messageToChange = messageStore.getChangedMessage;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_carbon_upload = __unplugin_components_0$6;
      const _component_carbon_trash_can = __unplugin_components_3$2;
      const _component_Alert = _sfc_main$b;
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "flex bg-gray-800 bg-opacity-50 fixed left-0 right-0 bottom-0 top-0 items-center" }, _attrs))}><div class="msg min-h-44 max-h-lg w-full m-1 p-2 sm:max-w-70 content-center sm:mx-auto mx-auto">`);
      if (vue.unref(messageStore).getShowModal) {
        _push(`<div><div class="header"><button${serverRenderer.ssrRenderAttr("title", vue.unref(t)("button.submit"))} class="float-right">`);
        _push(serverRenderer.ssrRenderComponent(_component_carbon_upload, { class: "float-right" }, null, _parent));
        _push(`</button><input type="text" placeholder="Title"${serverRenderer.ssrRenderAttr("value", vue.unref(messageToChange).title)} class="py-3 float-left bg-transparent transition duration-500 overflow-hidden focus:outline-none"><textarea type="text" spellcheck="false" w:resize="none" placeholder="Your message" class="bg-transparent float-left min-h-44 max-h-66 min-w-full transition duration-500 focus:outline-none overflow-auto">${serverRenderer.ssrInterpolate(vue.unref(messageToChange).body)}</textarea></div><button${serverRenderer.ssrRenderAttr("title", vue.unref(t)("button.delete"))} class="float-right">`);
        _push(serverRenderer.ssrRenderComponent(_component_carbon_trash_can, null, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (vue.unref(alertStore).getShowAlert) {
        _push(serverRenderer.ssrRenderComponent(_component_Alert, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
if (typeof block0$4 === "function")
  block0$4(_sfc_main$a);
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/Messages/message/UpdateMessage.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _hoisted_1$d = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$d = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16S9.4 4 16 4m0-2C8.3 2 2 8.3 2 16s6.3 14 14 14s14-6.3 14-14S23.7 2 16 2z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$a = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M24 15h-7V8h-2v7H8v2h7v7h2v-7h7z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$4 = [
  _hoisted_2$d,
  _hoisted_3$a
];
function render$d(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$d, _hoisted_4$4);
}
var __unplugin_components_3$1 = { name: "carbon-add-alt", render: render$d };
const _hoisted_1$c = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$c = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M29.707 5.293l-3-3a1 1 0 0 0-1.414 0L19.586 8h-2.491a11.012 11.012 0 0 0-10.383 7.366L2.056 28.67a1 1 0 0 0 1.275 1.274l13.303-4.656A11.012 11.012 0 0 0 24 14.905v-2.49l5.707-5.708a1 1 0 0 0 0-1.414zm-7.414 6A1 1 0 0 0 22 12v2.905a9.01 9.01 0 0 1-6.027 8.495l-9.168 3.209L16 17.414L14.586 16L5.39 25.195L8.6 16.027A9.01 9.01 0 0 1 17.095 10H20a1 1 0 0 0 .707-.293L26 4.414L27.586 6z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$9 = [
  _hoisted_2$c
];
function render$c(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$c, _hoisted_3$9);
}
var __unplugin_components_1$1 = { name: "carbon-pen-fountain", render: render$c };
const _hoisted_1$b = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 1024 1024"
};
const _hoisted_2$b = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M924.3 338.4a447.57 447.57 0 0 0-96.1-143.3a443.09 443.09 0 0 0-143-96.3A443.91 443.91 0 0 0 512 64h-2c-60.5.3-119 12.3-174.1 35.9a444.08 444.08 0 0 0-141.7 96.5a445 445 0 0 0-95 142.8A449.89 449.89 0 0 0 65 514.1c.3 69.4 16.9 138.3 47.9 199.9v152c0 25.4 20.6 46 45.9 46h151.8a447.72 447.72 0 0 0 199.5 48h2.1c59.8 0 117.7-11.6 172.3-34.3A443.2 443.2 0 0 0 827 830.5c41.2-40.9 73.6-88.7 96.3-142c23.5-55.2 35.5-113.9 35.8-174.5c.2-60.9-11.6-120-34.8-175.6zM312.4 560c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48s47.9 21.5 47.9 48s-21.4 48-47.9 48zm199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48s47.9 21.5 47.9 48s-21.5 48-47.9 48zm199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48s47.9 21.5 47.9 48s-21.5 48-47.9 48z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$8 = [
  _hoisted_2$b
];
function render$b(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$b, _hoisted_3$8);
}
var __unplugin_components_0$5 = { name: "ant-design-message-filled", render: render$b };
var CreateNewMessage_vue_vue_type_style_index_0_scoped_true_lang = "";
var block0$3 = {};
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const alertStore = useAlertStore();
    const { t } = vueI18n.useI18n();
    useMessageStore();
    let isVisible = vue.ref(false);
    let message = vue.reactive({
      Title: "",
      Body: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ant_design_message_filled = __unplugin_components_0$5;
      const _component_carbon_pen_fountain = __unplugin_components_1$1;
      const _component_carbon_add_alt = __unplugin_components_3$1;
      const _component_Alert = _sfc_main$b;
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "container sm:flex mx-auto sm:flex-wrap pt-10 pb-5 sm:flex-grow-0 sm:flex-none sm: justify-center" }, _attrs))} data-v-5258e1f2>`);
      if (!vue.unref(isVisible)) {
        _push(`<button${serverRenderer.ssrRenderAttr("title", vue.unref(t)("page.home"))} class="hover scale-220 hover:scale-270 bg-transparent text-red-900 hover:text-dark-600 dark:text-teal-500 hover:dark:text-gray-50" data-v-5258e1f2>`);
        _push(serverRenderer.ssrRenderComponent(_component_ant_design_message_filled, null, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<div class="hover msg relative min-w-xs" data-v-5258e1f2><div class="message mx-auto" data-v-5258e1f2><div class="mx-auto" data-v-5258e1f2>`);
        _push(serverRenderer.ssrRenderComponent(_component_carbon_pen_fountain, { class: "mt-1 absolute" }, null, _parent));
        _push(`<input type="text"${serverRenderer.ssrRenderAttr("placeholder", vue.unref(t)("input.title"))}${serverRenderer.ssrRenderAttr("value", vue.unref(message).Title)} class="transition duration-500 text-dark-900 bg-transparent focus:outline-none overflow-hidden" data-v-5258e1f2></div><div class="mx-auto" data-v-5258e1f2>`);
        _push(serverRenderer.ssrRenderComponent(_component_carbon_pen_fountain, { class: "mt-1 absolute" }, null, _parent));
        _push(`<textarea spellcheck="false" w:resize="none" type="text"${serverRenderer.ssrRenderAttr("placeholder", vue.unref(t)("input.message"))} class="transition duration-500 bg-transparent focus:outline-none overflow-hidden" data-v-5258e1f2>${serverRenderer.ssrInterpolate(vue.unref(message).Body)}</textarea></div></div><button class="float-right hover"${serverRenderer.ssrRenderAttr("title", vue.unref(t)("button.submit"))} data-v-5258e1f2>`);
        _push(serverRenderer.ssrRenderComponent(_component_carbon_add_alt, null, null, _parent));
        _push(`</button></div>`);
      }
      if (vue.unref(alertStore).getShowAlert) {
        _push(serverRenderer.ssrRenderComponent(_component_Alert, { class: "pb-100 sm:pb-50" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
if (typeof block0$3 === "function")
  block0$3(_sfc_main$9);
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/Messages/message/CreateNewMessage.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var __unplugin_components_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-5258e1f2"]]);
const _hoisted_1$a = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$a = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M2 26h28v2H2z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$7 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4l15-15zm-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10l3.6 3.6l-10 10H6z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$3 = [
  _hoisted_2$a,
  _hoisted_3$7
];
function render$a(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$a, _hoisted_4$3);
}
var __unplugin_components_0$3 = { name: "carbon-edit", render: render$a };
var Message_vue_vue_type_style_index_0_scoped_true_lang = "";
var block0$2 = {};
const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = vueI18n.useI18n();
    const messageStore = useMessageStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_masonry = vue.resolveComponent("masonry");
      const _component_carbon_edit = __unplugin_components_0$3;
      _push(`<!--[-->`);
      _push(serverRenderer.ssrRenderComponent(_component_masonry, {
        cols: { default: 5, 1280: 4, 1192: 3, 768: 2, 450: 1 },
        gutter: { default: "20px", 700: "15px", 500: "0px" },
        class: "HERE mx-auto container justify-center"
      }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            serverRenderer.ssrRenderList(vue.unref(messageStore).getMessages, (message) => {
              _push2(`<div class="msg max-h-lg hover relative" data-v-451305d2${_scopeId}><div class="header" data-v-451305d2${_scopeId}><button${serverRenderer.ssrRenderAttr("title", vue.unref(t)("button.change"))} class="float-right" data-v-451305d2${_scopeId}>`);
              _push2(serverRenderer.ssrRenderComponent(_component_carbon_edit, { class: "float-right hover" }, null, _parent2, _scopeId));
              _push2(`</button><div class="prose pb-3 pl-4" data-v-451305d2${_scopeId}><h4 data-v-451305d2${_scopeId}>${serverRenderer.ssrInterpolate(message.title)}</h4></div></div><p data-v-451305d2${_scopeId}>${serverRenderer.ssrInterpolate(message.body)}</p></div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(vue.unref(messageStore).getMessages, (message) => {
                return vue.openBlock(), vue.createBlock("div", {
                  class: "msg max-h-lg hover relative",
                  key: message.id
                }, [
                  vue.createVNode("div", { class: "header" }, [
                    vue.createVNode("button", {
                      title: vue.unref(t)("button.change"),
                      onClick: ($event) => vue.unref(messageStore).changeMessage(message),
                      class: "float-right"
                    }, [
                      vue.createVNode(_component_carbon_edit, { class: "float-right hover" })
                    ], 8, ["title", "onClick"]),
                    vue.createVNode("div", { class: "prose pb-3 pl-4" }, [
                      vue.createVNode("h4", null, vue.toDisplayString(message.title), 1)
                    ])
                  ]),
                  vue.createVNode("p", null, vue.toDisplayString(message.body), 1)
                ]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="updateModal" data-v-451305d2></div><!--]-->`);
    };
  }
});
if (typeof block0$2 === "function")
  block0$2(_sfc_main$8);
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/Messages/message/Message.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var Message = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-451305d2"]]);
var block0$1 = {};
const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const messageStore = useMessageStore();
    vue.onBeforeMount(() => {
      messageStore.fetchMessages();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CreateNewMessage = __unplugin_components_0$4;
      const _component_UpdateMessage = _sfc_main$a;
      _push(`<!--[--><div>`);
      _push(serverRenderer.ssrRenderComponent(_component_CreateNewMessage, null, null, _parent));
      _push(`</div><div class="container sm:flex mx-auto sm:flex-wrap sm:flex-grow-0 sm:flex-none sm: justify-center">`);
      _push(serverRenderer.ssrRenderComponent(Message, null, null, _parent));
      _push(`</div><div>`);
      if (vue.unref(messageStore).getShowModal) {
        _push(serverRenderer.ssrRenderComponent(_component_UpdateMessage, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
if (typeof block0$1 === "function")
  block0$1(_sfc_main$7);
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/Messages/MessageBoard.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var block0 = {};
const _sfc_main$6 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_MessageBoard = _sfc_main$7;
  _push(serverRenderer.ssrRenderComponent(_component_MessageBoard, _attrs, null, _parent));
}
if (typeof block0 === "function")
  block0(_sfc_main$6);
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/pages/index.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var _src_pages_index_vue = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$2]]);
const routes$1 = [{ "name": "about", "path": "/about", "component": () => Promise.resolve().then(function() {
  return require("./assets/about.1498af31.js");
}), "props": true, "meta": { "layout": "default" } }, { "name": "index", "path": "/", "component": _src_pages_index_vue, "props": true, "meta": { "layout": "default" } }, { "name": "login", "path": "/login", "component": () => Promise.resolve().then(function() {
  return require("./assets/login.de62363f.js");
}), "props": true }, { "name": "myTodos", "path": "/mytodos", "component": () => Promise.resolve().then(function() {
  return require("./assets/myTodos.843ef7d4.js");
}), "props": true, "meta": { "name": "myTodos", "layout": "dashboard", "requiresAuth": true } }, { "name": "README", "path": "/readme", "component": () => Promise.resolve().then(function() {
  return require("./assets/README.a90754f0.js");
}), "props": true }, { "name": "register", "path": "/register", "component": () => Promise.resolve().then(function() {
  return require("./assets/register.2fdfc8ae.js");
}), "props": true }, { "name": "[...all}", "path": "/[...all}", "component": () => Promise.resolve().then(function() {
  return require("./assets/_...all_.accd36e2.js");
}), "props": true, "meta": { "layout": 404 } }];
const _hoisted_1$9 = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$9 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$6 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M15 8h2v11h-2z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$2 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M16 22a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 16 22z",
  fill: "currentColor"
}, null, -1);
const _hoisted_5 = [
  _hoisted_2$9,
  _hoisted_3$6,
  _hoisted_4$2
];
function render$9(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$9, _hoisted_5);
}
var __unplugin_components_0$2 = { name: "carbon-warning", render: render$9 };
const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    vueRouter.useRouter();
    const { t } = vueI18n.useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_carbon_warning = __unplugin_components_0$2;
      const _component_router_view = vue.resolveComponent("router-view");
      _push(`<main${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "px-4 py-10 text-center text-teal-700 dark:text-gray-200" }, _attrs))}><div><p class="text-4xl">`);
      _push(serverRenderer.ssrRenderComponent(_component_carbon_warning, { class: "inline-block" }, null, _parent));
      _push(`</p></div>`);
      _push(serverRenderer.ssrRenderComponent(_component_router_view, null, null, _parent));
      _push(`<div><button class="btn m-3 text-sm mt-8">${serverRenderer.ssrInterpolate(vue.unref(t)("button.back"))}</button></div></main>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/layouts/404.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _hoisted_1$8 = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$8 = /* @__PURE__ */ vue.createStaticVNode('<path d="M18 19h6v2h-6z" fill="currentColor"></path><path d="M18 15h12v2H18z" fill="currentColor"></path><path d="M18 11h12v2H18z" fill="currentColor"></path><path d="M14 21v-2H9v-2H7v2H2v2h8.215a8.591 8.591 0 0 1-2.216 3.977A9.273 9.273 0 0 1 6.552 23H4.333a10.855 10.855 0 0 0 2.145 3.297A14.658 14.658 0 0 1 3 28.127L3.702 30a16.42 16.42 0 0 0 4.29-2.336A16.488 16.488 0 0 0 12.299 30L13 28.127A14.664 14.664 0 0 1 9.523 26.3a10.313 10.313 0 0 0 2.729-5.3z" fill="currentColor"></path><path d="M11.167 13h2.166L8.75 2H6.583L2 13h2.166L5 11h5.333zM5.833 9l1.833-4.4L9.5 9z" fill="currentColor"></path>', 5);
const _hoisted_7$1 = [
  _hoisted_2$8
];
function render$8(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$8, _hoisted_7$1);
}
var __unplugin_components_7 = { name: "carbon-language", render: render$8 };
const _hoisted_1$7 = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$7 = /* @__PURE__ */ vue.createStaticVNode('<path d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z" fill="currentColor"></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path>', 9);
const _hoisted_11 = [
  _hoisted_2$7
];
function render$7(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$7, _hoisted_11);
}
var __unplugin_components_6 = { name: "carbon-sun", render: render$7 };
const _hoisted_1$6 = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$6 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$5 = [
  _hoisted_2$6
];
function render$6(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$6, _hoisted_3$5);
}
var __unplugin_components_5 = { name: "carbon-moon", render: render$6 };
const _hoisted_1$5 = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$5 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2z",
  "fill-rule": "evenodd",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$4 = [
  _hoisted_2$5
];
function render$5(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$5, _hoisted_3$4);
}
var __unplugin_components_3 = { name: "carbon-logo-github", render: render$5 };
const _hoisted_1$4 = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$4 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M6 30h12a2.002 2.002 0 0 0 2-2v-3h-2v3H6V4h12v3h2V4a2.002 2.002 0 0 0-2-2H6a2.002 2.002 0 0 0-2 2v24a2.002 2.002 0 0 0 2 2z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$3 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M20.586 20.586L24.172 17H10v-2h14.172l-3.586-3.586L22 10l6 6l-6 6l-1.414-1.414z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4$1 = [
  _hoisted_2$4,
  _hoisted_3$3
];
function render$4(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$4, _hoisted_4$1);
}
var __unplugin_components_0$1 = { name: "carbon-logout", render: render$4 };
const isDark = core.useDark();
core.useToggle(isDark);
const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const { t, availableLocales, locale } = vueI18n.useI18n();
    const userStore = useUserStore();
    userStore.logout;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = vue.resolveComponent("router-link");
      const _component_carbon_logout = __unplugin_components_0$1;
      const _component_carbon_logo_github = __unplugin_components_3;
      const _component_carbon_moon = __unplugin_components_5;
      const _component_carbon_sun = __unplugin_components_6;
      const _component_carbon_language = __unplugin_components_7;
      _push(`<nav${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "text-xl mt-6 mb-4" }, _attrs))}>`);
      _push(serverRenderer.ssrRenderComponent(_component_router_link, {
        class: "icon-nav-btn mx-2",
        to: "/",
        title: vue.unref(t)("button.logout")
      }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.ssrRenderComponent(_component_carbon_logout, null, null, _parent2, _scopeId));
          } else {
            return [
              vue.createVNode(_component_carbon_logout)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a class="icon-nav-btn mx-2" rel="noreferrer" href="https://github.com/JDN89/dotnet-todo-app" target="_blank" title="GitHub">`);
      _push(serverRenderer.ssrRenderComponent(_component_carbon_logo_github, null, null, _parent));
      _push(`</a><div class="icon-btn mx-2"></div><div class="icon-btn mx-2"></div><button class="icon-btn mx-2 !outline-none"${serverRenderer.ssrRenderAttr("title", vue.unref(t)("button.toggle_dark"))}>`);
      if (vue.unref(isDark)) {
        _push(serverRenderer.ssrRenderComponent(_component_carbon_moon, null, null, _parent));
      } else {
        _push(serverRenderer.ssrRenderComponent(_component_carbon_sun, null, null, _parent));
      }
      _push(`</button><a class="icon-btn mx-2"${serverRenderer.ssrRenderAttr("title", vue.unref(t)("button.toggle_langs"))}>`);
      _push(serverRenderer.ssrRenderComponent(_component_carbon_language, null, null, _parent));
      _push(`</a></nav>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/NavBarUser.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_NavBarUser = _sfc_main$4;
  const _component_router_view = vue.resolveComponent("router-view");
  _push(`<main${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "px-4 py-10 text-center text-gray-700 dark:text-gray-200" }, _attrs))}>`);
  _push(serverRenderer.ssrRenderComponent(_component_NavBarUser, null, null, _parent));
  _push(serverRenderer.ssrRenderComponent(_component_router_view, null, null, _parent));
  _push(`<div class="mt-5 mx-auto text-center opacity-25 text-sm"></div></main>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/layouts/dashboard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var __layout_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);
const _hoisted_1$3 = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 24 24"
};
const _hoisted_2$3 = /* @__PURE__ */ vue.createElementVNode("path", {
  fill: "currentColor",
  d: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a1 1 0 1 1 1-1a1 1 0 0 1-1 1zm1-5.16V14a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1a1.5 1.5 0 1 0-1.5-1.5a1 1 0 0 1-2 0a3.5 3.5 0 1 1 4.5 3.34z"
}, null, -1);
const _hoisted_3$2 = [
  _hoisted_2$3
];
function render$3(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$3, _hoisted_3$2);
}
var __unplugin_components_4 = { name: "eva-question-mark-circle-fill", render: render$3 };
const _hoisted_1$2 = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$2 = /* @__PURE__ */ vue.createStaticVNode('<path d="M17 11h-6a3 3 0 0 0-3 3v4h2v-4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1h2v-1a3 3 0 0 0-3-3z" fill="currentColor"></path><path d="M10 6a4 4 0 1 0 4-4a4 4 0 0 0-4 4zm6 0a2 2 0 1 1-2-2a2 2 0 0 1 2 2z" fill="currentColor"></path><path d="M22 27h-6a2.002 2.002 0 0 1-2-2v-6a2.002 2.002 0 0 1 2-2h6a2.002 2.002 0 0 1 2 2v6a2.002 2.002 0 0 1-2 2zm-6-8v6h6v-6z" fill="currentColor"></path><path d="M8 30H4a2.002 2.002 0 0 1-2-2V4a2.002 2.002 0 0 1 2-2h4v2H4v24h4z" fill="currentColor"></path><path d="M28 30h-4v-2h4V4h-4V2h4a2.002 2.002 0 0 1 2 2v24a2.002 2.002 0 0 1-2 2z" fill="currentColor"></path>', 5);
const _hoisted_7 = [
  _hoisted_2$2
];
function render$2(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$2, _hoisted_7);
}
var __unplugin_components_2 = { name: "carbon-group-account", render: render$2 };
const _hoisted_1$1 = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2$1 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M26 30H14a2 2 0 0 1-2-2v-3h2v3h12V4H14v3h-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3$1 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M14.59 20.59L18.17 17H4v-2h14.17l-3.58-3.59L16 10l6 6l-6 6l-1.41-1.41z",
  fill: "currentColor"
}, null, -1);
const _hoisted_4 = [
  _hoisted_2$1,
  _hoisted_3$1
];
function render$1(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$1, _hoisted_4);
}
var __unplugin_components_1 = { name: "carbon-login", render: render$1 };
const _hoisted_1 = {
  width: "1.2em",
  height: "1.2em",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
};
const _hoisted_2 = /* @__PURE__ */ vue.createElementVNode("path", {
  d: "M27.562 26L17.17 8.928l2.366-3.888L17.828 4L16 7.005L14.17 4l-1.708 1.04l2.366 3.888L4.438 26H2v2h28v-2zM16 10.85L25.22 26H17v-8h-2v8H6.78z",
  fill: "currentColor"
}, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function render(_ctx, _cache) {
  return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1, _hoisted_3);
}
var __unplugin_components_0 = { name: "carbon-campsite", render };
const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const { t, availableLocales, locale } = vueI18n.useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = vue.resolveComponent("router-link");
      const _component_carbon_campsite = __unplugin_components_0;
      const _component_carbon_login = __unplugin_components_1;
      const _component_carbon_group_account = __unplugin_components_2;
      const _component_carbon_logo_github = __unplugin_components_3;
      const _component_eva_question_mark_circle_fill = __unplugin_components_4;
      const _component_carbon_moon = __unplugin_components_5;
      const _component_carbon_sun = __unplugin_components_6;
      const _component_carbon_language = __unplugin_components_7;
      _push(`<nav${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "text-xl mt-6 mb-4" }, _attrs))}>`);
      _push(serverRenderer.ssrRenderComponent(_component_router_link, {
        class: "icon-nav-btn mx-2",
        to: "/",
        title: vue.unref(t)("button.home")
      }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.ssrRenderComponent(_component_carbon_campsite, null, null, _parent2, _scopeId));
          } else {
            return [
              vue.createVNode(_component_carbon_campsite)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.ssrRenderComponent(_component_router_link, {
        class: "icon-nav-btn mx-2",
        to: "/login",
        title: vue.unref(t)("button.login")
      }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.ssrRenderComponent(_component_carbon_login, null, null, _parent2, _scopeId));
          } else {
            return [
              vue.createVNode(_component_carbon_login)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.ssrRenderComponent(_component_router_link, {
        class: "icon-nav-btn mx-2",
        to: "/register",
        title: vue.unref(t)("button.register")
      }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.ssrRenderComponent(_component_carbon_group_account, null, null, _parent2, _scopeId));
          } else {
            return [
              vue.createVNode(_component_carbon_group_account)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a class="icon-nav-btn mx-2" rel="noreferrer" href="https://github.com/JDN89/dotnet-todo-app" target="_blank" title="GitHub">`);
      _push(serverRenderer.ssrRenderComponent(_component_carbon_logo_github, null, null, _parent));
      _push(`</a>`);
      _push(serverRenderer.ssrRenderComponent(_component_router_link, {
        class: "icon-nav-btn mx-2",
        to: "/about",
        title: vue.unref(t)("button.about")
      }, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.ssrRenderComponent(_component_eva_question_mark_circle_fill, null, null, _parent2, _scopeId));
          } else {
            return [
              vue.createVNode(_component_eva_question_mark_circle_fill)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="icon-btn mx-2"></div><div class="icon-btn mx-2"></div><button class="icon-btn mx-2 !outline-none"${serverRenderer.ssrRenderAttr("title", vue.unref(t)("button.toggle_dark"))}>`);
      if (vue.unref(isDark)) {
        _push(serverRenderer.ssrRenderComponent(_component_carbon_moon, null, null, _parent));
      } else {
        _push(serverRenderer.ssrRenderComponent(_component_carbon_sun, null, null, _parent));
      }
      _push(`</button><a class="icon-btn mx-2"${serverRenderer.ssrRenderAttr("title", vue.unref(t)("button.toggle_langs"))}>`);
      _push(serverRenderer.ssrRenderComponent(_component_carbon_language, null, null, _parent));
      _push(`</a></nav>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/NavBarGuest.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NavBarGuest = _sfc_main$2;
  const _component_router_view = vue.resolveComponent("router-view");
  _push(`<main${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "px-4 py-10 text-center text-gray-700 dark:text-gray-200" }, _attrs))}>`);
  _push(serverRenderer.ssrRenderComponent(_component_NavBarGuest, null, null, _parent));
  _push(serverRenderer.ssrRenderComponent(_component_router_view, null, null, _parent));
  _push(`<div class="mt-5 mx-auto text-center opacity-25 text-sm"></div></main>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/layouts/default.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var __layout_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const layouts = {
  "404": _sfc_main$5,
  "dashboard": __layout_1,
  "default": __layout_2
};
function setupLayouts(routes2) {
  return routes2.map((route) => {
    var _a;
    return {
      path: route.path,
      component: layouts[((_a = route.meta) == null ? void 0 : _a.layout) || "default"],
      children: [__spreadProps(__spreadValues({}, route), { path: "" })]
    };
  });
}
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    vue.onBeforeMount(async () => {
      const uStore = useUserStore();
      const router = vueRouter.useRouter();
      const token = window.sessionStorage.getItem("token");
      if (token) {
        await uStore.retrieveSession(token);
        await router.replace({
          name: "myTodos"
        });
      }
    });
    head.useHead({
      title: "Dotnet - Vue TodoApp",
      meta: [
        {
          name: "description",
          content: "A simple todo app create with vue and ASP.NET Core"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_view = vue.resolveComponent("router-view");
      _push(serverRenderer.ssrRenderComponent(_component_router_view, _attrs, null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var windiBase = "";
var windiComponents = "";
var main = "";
var windiUtilities = "";
const routes = setupLayouts(routes$1);
viteSsg.ViteSSG(_sfc_main, { routes }, (ctx) => {
  Object.values({ "./modules/i18n.ts": __glob_9_0, "./modules/masonry.ts": __glob_9_1, "./modules/nprogress.ts": __glob_9_2, "./modules/pinia.ts": __glob_9_3, "./modules/pwa.ts": __glob_9_4, "./modules/router.ts": __glob_9_5 }).map((i) => {
    var _a;
    return (_a = i.install) == null ? void 0 : _a.call(i, ctx);
  });
});
exports.__unplugin_components_0 = __unplugin_components_0$7;
exports.__unplugin_components_0$1 = __unplugin_components_0$3;
exports.__unplugin_components_1 = __unplugin_components_1$1;
exports.__unplugin_components_3 = __unplugin_components_3$2;
exports.__unplugin_components_3$1 = __unplugin_components_3$1;
exports._export_sfc = _export_sfc;
exports._sfc_main = _sfc_main$b;
exports.useAlertStore = useAlertStore;
exports.useTodoStore = useTodoStore;
exports.useUserStore = useUserStore;

import { acceptHMRUpdate, defineStore } from "pinia";
import { UsersInterface, LogInUserInterface } from "../types/interfaces";

interface TodoStateInterface {
  usersData: UsersInterface[];
  userData: UsersInterface | null;
  loginData: LogInUserInterface | null;
  registrationFormIsVisible: boolean;
  isAuthenticated: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): TodoStateInterface => ({
    registrationFormIsVisible: false,
    userData: null,
    loginData: null,
    isAuthenticated: false,

    usersData: [
      {
        id: 0,
        email: "Jogi@sien.com",
        password: "123456",
      },
      {
        id: 1,
        email: "jan@niels.com",
        password: "123456",
      },
    ],
  }),
  actions: {
    registerUser() {
      console.log(this.userData);
      this.registrationFormIsVisible = true;
    },
    async loginUser() {
      
      console.log(this.loginData);
      this.isAuthenticated = true;
      return true
      
    },
  },
  getters: {
    getUsers: (state) => state.usersData,
    getUserData: (state) => state.userData,
    getRegistrationFormIsVisible: (state) => state.registrationFormIsVisible,
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));

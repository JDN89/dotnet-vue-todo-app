import { acceptHMRUpdate, defineStore } from "pinia";
import { CreateUserInterface, UserInterface } from "../types/interfaces";
import axios from "axios";

interface TodoStateInterface {
  usersData: UserInterface[];
  createdUserData: CreateUserInterface | null;
  loggedinUserId: number | null;
  registrationFormIsVisible: boolean;
  isAuthenticated: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): TodoStateInterface => ({
    registrationFormIsVisible: true,
    createdUserData: null,
    loggedinUserId: null,
    isAuthenticated: false,

    usersData: [
      {
        id: 0,
        email: "Jogi@sien.com",
        hash: "123456",
      },
      {
        id: 1,
        email: "jan@niels.com",
        hash: "123456",
      },
    ],
  }),
  actions: {
    // =========================================
    // ===========   REGISTER  ===============
    // =========================================
    async registerUser() {
      try {
        const response = await axios.post(
          "http://localhost:5230/register",
          this.createdUserData
        );
        if (response.status === 201) {
          this.loggedinUserId = response.data;
          console.log(this.loggedinUserId);
        }
      } catch (error) {
        console.error(error);
      }

      this.registrationFormIsVisible = false;
    },

    // =========================================
    // ===========   LOGIN  ===============
    // =========================================
    async loginUser() {
      console.log(this.loggedinUserId);
      this.isAuthenticated = true;
      return true;
    },
    logout() {
      this.isAuthenticated = false;
      console.log("logged out");
    },
  },
  getters: {
    getUsers: (state) => state.usersData,
    getRegistrationFormIsVisible: (state) => state.registrationFormIsVisible,
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));

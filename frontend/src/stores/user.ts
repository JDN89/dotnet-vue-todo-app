import { acceptHMRUpdate, defineStore } from "pinia";
import { UsersInterface } from "../types/interfaces";

interface TodoStateInterface {
  usersData: UsersInterface[];
  userData: UsersInterface | null;
}

export const useUserStore = defineStore("user", {
  state: (): TodoStateInterface => ({
    userData: null,

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
    },
  },
  getters: {
    getUsers: (state) => state.usersData,
    getUserData: (state) => state.userData,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));

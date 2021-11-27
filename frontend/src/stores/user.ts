import { acceptHMRUpdate, defineStore } from "pinia";
import { UsersInterface } from "../types/interfaces";

interface TodoStateInterface {
  users: UsersInterface[];
}

export const useUserStore = defineStore("user", {
  state: (): TodoStateInterface => ({
    users: [
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
  actions: {},
  getters: {
    getUsers: (state) => state.users,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));

import { acceptHMRUpdate, defineStore } from "pinia";

export const useTodoStore = defineStore("messages", {
  state: () => ({}),
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot));

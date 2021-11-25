import { acceptHMRUpdate, defineStore } from "pinia";

interface Message {
  id: number | undefined;
  title: string;
  description: string;
}

interface MessageStateInterface {
  messages: Message[];
}

export const useMessageStore = defineStore("messages", {
  state: (): MessageStateInterface => ({
    messages: [
      {
        id: 1,
        title: "Helo",
        description:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
      {
        id: 2,
        title: "Helo",
        description:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
      {
        id: 3,
        title: "Helo",
        description:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
      {
        id: 4,
        title: "Helo",
        description:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
      {
        id: 5,
        title: "Helo",
        description:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
      {
        id: 6,
        title: "Helo",
        description:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
      {
        id: 7,
        title: "Helo",
        description:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
      {
        id: 8,
        title: "Helo",
        description:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
      {
        id: 9,
        title: "Helo",
        description:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
    ],
  }),

  actions: {
    // =========================================
    // ===========   ADDMESSAGE  ===============
    // =========================================
    async addMessage(message: Message) {
      console.log(message);
    },
  },

  getters: {
    getMessages: (state) => state.messages,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMessageStore, import.meta.hot));

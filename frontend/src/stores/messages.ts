import { thisExpression } from "@babel/types";
import { acceptHMRUpdate, defineStore } from "pinia";
import { MessageInterface } from "../types/interfaces";

interface MessageStateInterface {
  messages: MessageInterface[];
  isVisible: boolean;
  changedMessage: MessageInterface | null;
}

export const useMessageStore = defineStore("messages", {
  state: (): MessageStateInterface => ({
    changedMessage: null,

    isVisible: false,

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
    // ===========   SHOWMODAL  ===============
    // =========================================
    async showModal() {
      if (this.isVisible) {
        this.isVisible = false;
      } else {
        this.isVisible = true;
      }
    },

    // =========================================
    // ===========   ADDMESSAGE  ===============
    // =========================================
    async addMessage(message: MessageInterface) {
      console.log(message);
    },
    // =========================================
    // ===========   DELETEMESSAGE  ===============
    // =========================================
    async deleteMessage(message: MessageInterface) {
      console.log(message);
      this.isVisible = false;
      console.log("delete");
    },
    // =========================================
    // ===========   CHANGEMESSAGE  ===============
    // =========================================
    async changeMessage(message: MessageInterface) {
      this.isVisible = true;
      this.changedMessage = message;

      console.log(this.changedMessage);
    },

    // =========================================
    // ===========   UPDATEMESSAGE  ===============
    // =========================================
  },

  getters: {
    getMessages: (state) => state.messages,
    getShowModal: (state) => state.isVisible,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMessageStore, import.meta.hot));

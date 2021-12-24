import { acceptHMRUpdate, defineStore } from "pinia";
import { MessageInterface, NewMessageInterface } from "../types/interfaces";
import apiClient from "../composables/EventService";
import axios from "axios";

interface MessageStateInterface {
  messages: MessageInterface[];
  isVisible: boolean;
  changedMessage: MessageInterface;
}

export const useMessageStore = defineStore("messages", {
  state: (): MessageStateInterface => ({
    changedMessage: {
      title: "",
      id: 0,
      description: "",
    },

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
    // ===========   ADDMESSAGE  ===============
    // =========================================
    async addMessage(message: NewMessageInterface) {
      console.log(message);
      try {

        const response = await axios.get("http://localhost:5230/")

        // const response = await axios.post(
        //   "http://localhost:5230/",
        //   message
        // );
        if (response.status === 200) {
          //change log to ('success')
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
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
    // ===========   (TEMPORARY)CHANGEMESSAGE  ===============
    // =========================================

    //this action stores the temporary changed message in store
    // before it gets send to the backend
    async changeMessage(message: MessageInterface) {
      this.isVisible = true;
      this.changedMessage = message;

      console.log(this.changedMessage);
    },

    // =========================================
    // ===========   UPDATEMESSAGE  ===============
    // =========================================
    //the changed message gets send to the backend
    async updateMessage(message: MessageInterface) {
      this.isVisible = false;
      console.log(message);
    },
  },

  getters: {
    getMessages: (state) => state.messages,
    getShowModal: (state) => state.isVisible,
    getChangedMessage: (state) => state.changedMessage,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMessageStore, import.meta.hot));

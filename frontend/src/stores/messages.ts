import { acceptHMRUpdate, defineStore } from "pinia";
import { MessageInterface, NewMessageInterface } from "~/types/interfaces";
// import apiClient from "../composable/EventService";
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
      body: "",
    },

    isVisible: false,

    messages: [],
  }),

  actions: {
    // =========================================
    // ===========   GET MESSAGES  ===============
    // =========================================
    async fetchMessages() {
      try {
        const response = await axios.get("http://localhost:5230/");

        if (response.status === 200) {
          //change log to ('success')
          this.messages = response.data;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.log(error.response?.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        }
      }
    },

    // =========================================
    // ===========   ADD MESSAGE  ===============
    // =========================================
    async addMessage(message: NewMessageInterface) {
      try {
        const response = await axios.post("http://localhost:5230/", message);
        if (response.status === 201) {
          this.fetchMessages();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.log(error.response?.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        }
      }
    },
    // =========================================
    // ===========   DELETE MESSAGE  ===============
    // =========================================
    async deleteMessage(id: number) {
      try {
        const response = await axios.delete("http://localhost:5230/?id=" + id);
        if (response.status === 204) {
          this.fetchMessages();
          this.isVisible = false;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.log(error.response?.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        }
      }
    },
    // =========================================
    // ===========   (TEMPORARY)CHANGE MESSAGE  ===============
    // =========================================

    //this action stores the temporary changed message in store
    // before it gets send to the backend api
    // I stored the message in changeMessage, so I could pass it easy to the UpdateMessage component
    // Alter or delete it's title and body, before sending it to the backend
    async changeMessage(message: MessageInterface) {
      this.isVisible = true;
      this.changedMessage = message;
    },

    // =========================================
    // ===========   UPDATE MESSAGE  ===============
    // =========================================
    //the changed message gets send to the backend
    async updateMessage(message: MessageInterface) {
      try {
        const response = await axios.put("http://localhost:5230/", message);
        if (response.status === 201) {
          this.fetchMessages();
          this.isVisible = false;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.log(error.response?.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        }
      }
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

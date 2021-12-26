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
      body: "",
    },

    isVisible: false,

    messages: [],
  }),

  actions: {
    // =========================================
    // ===========   GETMESSAGEs  ===============
    // =========================================
    async fetchMessages() {
      try {
        const response = await axios.get("http://localhost:5230/");

        if (response.status === 200) {
          //change log to ('success')
          this.messages = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },

    // =========================================
    // ===========   ADDMESSAGE  ===============
    // =========================================
    async addMessage(message: NewMessageInterface) {
      try {
        const response = await axios.post("http://localhost:5230/", message);
        if (response.status === 201) {
          this.fetchMessages();
        }
      } catch (error) {
        console.error(error);
      }
    },
    // =========================================
    // ===========   DELETEMESSAGE  ===============
    // =========================================
    async deleteMessage(id: number) {
      console.log(id);
      try {
        const response = await axios.delete("http://localhost:5230/?id=" + id);
        if (response.status === 204) {
          this.fetchMessages();
        }
      } catch (error) {
        console.error(error);
      }
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

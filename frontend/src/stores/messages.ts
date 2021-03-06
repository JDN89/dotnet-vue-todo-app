// @ts-check
import { acceptHMRUpdate, defineStore } from "pinia";
import { MessageInterface, NewMessageInterface } from "~/types/interfaces";
import EventService from "../composables/EventService";

import axios from "axios";

interface State {
    messages: MessageInterface[];
    isVisible: boolean;
    changedMessage: MessageInterface;
}

export const useMessageStore = defineStore("messages", {
    state: (): State => ({
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
        // one way of defining code with .then().catch()
        // all the responses different then 2xx will be caught by the catch block!
        async fetchMessages() {
            await EventService.getMessages()
                .then((res) => {
                    this.messages = res.data;
                })
                .catch((error) => {
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
                });
        },

        // =========================================
        // ===========   ADD MESSAGE  ===============
        // =========================================
        //other way by wrapping in try catch block
        async addMessage(message: NewMessageInterface) {
            await EventService.postMessage(message)
                .then((response) => this.messages.push(response.data))
                .catch((error) => {
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
                });
        },
        // =========================================
        // ===========   DELETE MESSAGE  ===============
        // =========================================
        async deleteMessage(id: number) {
            await EventService.deleteMessage(id)
                .then(() => {
                    this.messages = this.messages.filter(x => x.id !== id)

                    this.isVisible = false;
                })
                .catch((error) => {
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
                });
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
            await EventService.putMessage(message)
                .then(() => {
                    this.messages = this.messages.filter(m => m.id !== message.id)
                    this.messages.push(message)
                    this.isVisible = false;
                })
                .catch((error) => {
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
                });
        },
    },

    getters: {
        getMessages: (state: State) => state.messages,
        getShowModal: (state: State) => state.isVisible,
        getChangedMessage: (state: State) => state.changedMessage,
    },
});

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useMessageStore, import.meta.hot));

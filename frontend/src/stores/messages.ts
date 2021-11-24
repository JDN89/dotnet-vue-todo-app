import { acceptHMRUpdate, defineStore } from "pinia";

interface Message {
  id: number;
  mTitle: string;
  mDescription: string;
}
interface MessageStateInterface {
  messages: Message[];
}

export const useMessageStore = defineStore("messages", {
  state: (): MessageStateInterface => ({
    messages: [
      {
        id: 1,
        mTitle: "Helo",
        mDescription:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
      {
        id: 2,
        mTitle: "Helo",
        mDescription:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
      {
        id: 3,
        mTitle: "Helo",
        mDescription:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
      {
        id: 4,
        mTitle: "Helo",
        mDescription:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
      {
        id: 5,
        mTitle: "Helo",
        mDescription:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
      {
        id: 6,
        mTitle: "Helo",
        mDescription:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
      {
        id: 7,
        mTitle: "Helo",
        mDescription:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
      {
        id: 8,
        mTitle: "Helo",
        mDescription:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
      {
        id: 9,
        mTitle: "Helo",
        mDescription:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
    ],
  }),
  getters: {
    getMessages: (state) => state.messages,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMessageStore, import.meta.hot));

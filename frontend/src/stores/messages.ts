import { acceptHMRUpdate, defineStore } from "pinia";

interface Message {
  id: number;
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
        description:
          " ah bakkes Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, sfsfsfskfjjwisfsfdsdfsfsdfsdfws sldkfjsoifjso sivjsoifjsofij ",
      },
      {
        id: 2,
        description:
          "  ipsem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, facere velit distinctio expedita nostrum minima magnam, possimus atqu vero consectetur minus nulla beatae aliquam pariatur placeat. Neque sunt iure qui  ipsem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ration ",
      },
      {
        id: 3,
        description:
          "  ipsem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, facere velit distinctio expedita nostrum minima magnam, possimus atqu vero consectetur minus nulla beatae aliquam pariatur placeat. Neque sunt iure qui  ipsem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ration ",
      },
      {
        id: 4,
        description:
          "  ipsem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, facere velit distinctio expedita nostrum minima magnam, possimus atqu vero consectetur minus nulla beatae aliquam pariatur placeat. Neque sunt iure qui  ipsem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ration ",
      },
      {
        id: 5,
        description:
          "  ipsem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, facere velit distinctio expedita nostrum minima magnam, possimus atqu vero consectetur minus nulla beatae aliquam pariatur placeat. Neque sunt iure qui  ipsem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ration ",
      },
      {
        id: 6,
        description:
          "  ipsem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, facere velit distinctio expedita nostrum minima magnam, possimus atqu vero consectetur minus nulla beatae aliquam pariatur placeat. Neque sunt iure qui  ipsem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ration ",
      },
      {
        id: 7,
        description:
          "  ipsem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, facere velit distinctio expedita nostrum minima magnam, possimus atqu vero consectetur minus nulla beatae aliquam pariatur placeat. Neque sunt iure qui  ipsem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ration ",
      },
      {
        id: 8,
        description:
          "  ipsem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, facere velit distinctio expedita nostrum minima magnam, possimus atqu vero consectetur minus nulla beatae aliquam pariatur placeat. Neque sunt iure qui  ipsem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ration ",
      },
    ],
  }),
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMessageStore, import.meta.hot));

import axios from "axios";
import { MessageInterface, NewMessageInterface } from "~/types/interfaces";

axios.defaults.baseURL = "https://localhost:7126";

const apiClient = axios.create({
  baseURL: "https://localhost:7126",
  withCredentials: false,
});

export default {
  getMessages() {
    return apiClient.get("/");
  },
  postMessage(message: NewMessageInterface) {
    return apiClient.post("/", message);
  },
  deleteMessage(id: number) {
    return apiClient.delete("/?id=" + id);
  },
  putMessage(message: MessageInterface) {
    return apiClient.put("/", message);
  },
};

// postEvents(message) {
//   return apiClient.post("/" + message);s
// },

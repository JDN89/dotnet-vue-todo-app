import axios from "axios";
import {
  MessageInterface,
  NewMessageInterface,
  CreateUserInterface,
} from "~/types/interfaces";

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
  registerUser(user: CreateUserInterface) {
    return apiClient.post("/register", user);
  },
  loginUser(user: CreateUserInterface) {
    return apiClient.post("/login", user);
  },
};

// postEvents(message) {
//   return apiClient.post("/" + message);s
// },

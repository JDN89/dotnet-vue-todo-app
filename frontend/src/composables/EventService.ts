import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5230",
  headers: {
    Accept: "application/json",
    "Content-type": "application/json"
  }
});




// export default  {
//    apiClient = axios.create({
//     baseURL: "https://localhost:7126",
//     withCredentials: false,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   });
  
// };




// getEvents() {
//  return apiClient.get("/");
// },

// postEvents(message) {
//   return apiClient.post("/" + message);
// },

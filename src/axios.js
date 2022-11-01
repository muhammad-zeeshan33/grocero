import axios from "axios";

const baseInstance = axios.create({
  baseURL: "https://grocero-app-f5d39-default-rtdb.firebaseio.com/",
});

export default baseInstance;

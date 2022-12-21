import axios from "axios";

const baseInstance = axios.create({
  baseURL: "https://grocero-c6d7f-default-rtdb.firebaseio.com/",
});

export default baseInstance;

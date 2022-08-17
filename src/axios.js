import axios from "axios";

const baseInstance =axios.create({
    baseURL: "https://playpik-test-default-rtdb.firebaseio.com"
})

export default baseInstance;
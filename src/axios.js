import axios from "axios";

const baseInstance =axios.create({
    baseURL: "https://playpik-720b5-default-rtdb.firebaseio.com/"
})

export default baseInstance;
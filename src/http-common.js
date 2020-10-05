import axios from "axios";

export default axios.create({
  baseURL: "http://52.86.154.61:3001",
  headers: {
    "Content-type": "application/json",
  },
});

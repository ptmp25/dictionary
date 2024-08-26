import axios from "axios";

export default (url = "http://localhost:5000") => {
  return axios.create({
    baseURL: url,
    headers: {
      "Content-type": "application/json",
    },
  });
};

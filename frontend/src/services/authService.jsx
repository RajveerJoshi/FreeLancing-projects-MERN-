import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:4000/api/",
});

const signUp = async () => {
  try {
    const res = await Api.post("/signup");
    return res;
  } catch (error) {
    throw error;
  }
};
export { Api, signUp };

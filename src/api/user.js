import Axios from "axios";

//Get User
export const getUser = async () => {
  try {
    const res = await Axios.get(`/api/auth`);
    return res;
  } catch (error) {
    throw error.response.data.errors;
  }
};

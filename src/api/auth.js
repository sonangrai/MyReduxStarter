import Axios from "axios";

//Api Consume for Login User
export const loginUser = async (data) => {
  //Headers for the Request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Converting the object to JSON
  const jdata = JSON.stringify(data);
  try {
    const res = await Axios.post("/api/auth", jdata, config);
    return res;
  } catch (error) {
    throw error.response.data.errors;
  }
};

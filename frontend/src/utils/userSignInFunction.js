import axios from "axios";
import toast from "react-hot-toast";
import { storeSession } from "./sessionFunctions";

export async function submitFormData(api, formData) {
  try {
    const Data = await axios.post(
      import.meta.env.VITE_API_MAIN + api,
      formData
    );
    if (Data) {
      storeSession("user", JSON.stringify(Data.data));
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

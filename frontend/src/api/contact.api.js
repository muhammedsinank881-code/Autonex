import API from "./axios";

export const sendContactMessage = async (payload) => {
    const { data } = await API.post("/contact", payload);
    return data;
};
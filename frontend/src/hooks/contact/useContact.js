import { useMutation } from "@tanstack/react-query";
import { sendContactMessage } from "../../api/contact.api";

export const useContact = () => {
    return useMutation({
        mutationFn: sendContactMessage,
    });
};
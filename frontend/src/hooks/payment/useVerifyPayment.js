import { useMutation } from "@tanstack/react-query";
import { verifyPayment } from "../../api/payment.api";

const useVerifyPayment = () => {
    return useMutation({
        mutationFn: verifyPayment,
    });
};

export default useVerifyPayment;
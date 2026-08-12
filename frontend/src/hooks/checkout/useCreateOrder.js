import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../api/order.api";

export const useCreateOrder = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createOrder,

        onSuccess: (response) => {
            navigate("/order-success", {
                state: {
                    order: response.data,
                },
            });
        },

        onError: (error) => {
            console.error(
                "Order creation failed:",
                error.response?.data?.message || error.message
            );
        },
    });
};
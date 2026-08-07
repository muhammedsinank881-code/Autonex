import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { checkout } from "../../api/checkout.api";

export const useCheckout = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: checkout,

        onSuccess: (data) => {
            switch (data.nextStep) {
                case "PAYMENT":
                    navigate("/payment", {
                        state: {
                            checkoutData: data.checkout,
                        },
                    });
                    break;

                case "CREATE_ORDER":
                    navigate("/order-success", {
                        state: {
                            order: data.order,
                        }
                    })
                    break;
            }
        },

        onError: (error) => {
            console.error(
                "Checkout Failed:",
                error.response?.data?.message || error.message
            );
        },
    });
};
import React from "react";
import { AlertCircle, ShieldCheck, X } from "lucide-react";
import { useCreateOrder } from "../../hooks/checkout/useCreateOrder";

/**
 * ConfirmOrderModal Component
 * 
 * @param {boolean} isOpen - Controls visibility of the modal
 * @param {function} onClose - Function to close modal without submitting
 * @param {function} onConfirm - Function triggered when user clicks "Confirm & Pay"
 * @param {boolean} isProcessing - Loading state during payment execution
 * @param {object} orderDetails - Object containing bill breakdown & payment info
 */
const ConfirmOrderModal = ({
    isOpen = true,
    onClose,
    onConfirm,
    isProcessing = false,
    orderDetails = {
        invoiceId: "INV-2026-0891",
        description: "Account Renewal & Premium Plan",
        totalAmount: 53.99,
        paymentMethod: "Credit Card (ending in 4242)",
    },
}) => {

    const createOrderMutation = useCreateOrder();

    const handleSubmitOrder = () => {
        createOrderMutation.mutate({
            checkoutId: checkoutData._id,
        });
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-xs transition-opacity font-sans">
            {/* Modal Container */}
            <div
                className="bg-white rounded-lg border border-gray-200 shadow-xl w-full max-w-md overflow-hidden transform transition-all"
                role="dialog"
                aria-modal="true"
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-[#0066b2]">
                        Confirm Your Payment
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isProcessing}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md disabled:opacity-50"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-4">
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Please review your final transaction details before processing.
                    </p>

                    {/* Details Summary Card */}
                    <div className="bg-gray-50/80 rounded-md border border-gray-100 p-4 space-y-3">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500">Invoice Number</span>
                            <span className="font-semibold text-gray-800">
                                #{orderDetails.invoiceId}
                            </span>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500">Description</span>
                            <span className="font-medium text-gray-700 truncate max-w-[180px]">
                                {orderDetails.description}
                            </span>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500">Payment Method</span>
                            <span className="font-medium text-gray-700">
                                {orderDetails.paymentMethod}
                            </span>
                        </div>

                        <div className="pt-2.5 border-t border-gray-200 flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-800">
                                Total Charge
                            </span>
                            <span className="text-base font-bold text-[#0066b2]">
                                ${orderDetails.totalAmount?.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Notice Alert */}
                    <div className="flex items-start gap-2.5 p-3 rounded-md bg-amber-50/60 border border-amber-200/60 text-amber-800 text-[11px] leading-tight">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>
                            By clicking confirm, your payment method will be charged immediately.
                        </span>
                    </div>
                </div>

                {/* Modal Footer / Actions */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 space-y-3">
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isProcessing}
                            className="w-1/2 border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-semibold py-2.5 px-4 rounded-md transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleSubmitOrder}
                            disabled={createOrderMutation.isPending}
                            className="w-1/2 bg-[#0066b2] hover:bg-[#005290] text-white text-xs font-semibold py-2.5 px-4 rounded-md transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {createOrderMutation.isPending ? "Processing..." : "Confirm Order"}
                        </button>
                    </div>

                    {/* Security Indicator */}
                    <div className="flex items-center justify-center gap-1.5 text-gray-400 text-[10px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Encrypted 256-bit secure checkout</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmOrderModal;
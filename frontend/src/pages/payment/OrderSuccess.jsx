import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Download, ArrowRight, Package, Home } from "lucide-react";

const OrderSuccess = () => {
    const location = useLocation();

    // Pick up dynamic state passed from the payment page, or use standard fallback data
    const orderData = location.state?.orderDetails || {
        orderId: "ORD-2026-98124",
        date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        }),
        email: location.state?.email || "customer@example.com",
        paymentMethod: "Credit Card (ending in 4242)",
        totalAmount: 53.99,
        items: [
            { name: "Account Renewal & Premium Plan", qty: 1, price: 49.99 },
        ],
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb Navigation */}
                <nav className="text-xs text-gray-400 mb-8 print:hidden">
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                    <span className="mx-1">/</span>
                    <Link to="/account" className="hover:underline">
                        My account
                    </Link>
                    <span className="mx-1">/</span>
                    <span className="text-gray-800 font-medium">Order Confirmation</span>
                </nav>

                {/* Centered Success Card Container */}
                <div className="max-w-2xl mx-auto">
                    {/* Header Badge & Title */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-4">
                            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-[#0066b2] mb-2">
                            Payment Successful!
                        </h1>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Thank you for your payment. We have sent a confirmation email to{" "}
                            <span className="font-semibold text-gray-700">{orderData.email}</span>.
                        </p>
                    </div>

                    {/* Receipt / Order Box */}
                    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-xs mb-6">
                        <div className="flex flex-wrap justify-between items-center pb-4 mb-4 border-b border-gray-100 text-xs">
                            <div>
                                <span className="text-gray-400 block">Order Reference</span>
                                <span className="font-bold text-gray-800 text-sm">
                                    #{orderData.orderId}
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-gray-400 block">Date</span>
                                <span className="font-medium text-gray-700">{orderData.date}</span>
                            </div>
                        </div>

                        {/* Itemized Table */}
                        <div className="space-y-3 mb-6">
                            <span className="text-xs font-semibold text-gray-700 block">
                                Invoice Breakdown
                            </span>
                            {orderData.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between items-center text-xs py-1.5 border-b border-gray-50 last:border-0"
                                >
                                    <span className="text-gray-600">
                                        {item.name}{" "}
                                        <span className="text-gray-400">× {item.qty}</span>
                                    </span>
                                    <span className="font-semibold text-gray-800">
                                        ${item.price.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Order Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-xs mb-6">
                            <div>
                                <span className="text-gray-400 block mb-0.5">Payment Method</span>
                                <span className="font-medium text-gray-700">
                                    {orderData.paymentMethod}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-400 block mb-0.5">Status</span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                    Paid
                                </span>
                            </div>
                        </div>

                        {/* Total Paid Row */}
                        <div className="bg-gray-50/70 p-3.5 rounded-md flex justify-between items-center text-xs">
                            <span className="font-bold text-gray-800">Total Amount Paid</span>
                            <span className="font-bold text-base text-[#0066b2]">
                                ${orderData.totalAmount.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 print:hidden">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={handlePrint}
                                className="flex items-center justify-center gap-2 w-full border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold py-3 px-4 rounded-md transition-colors"
                            >
                                <Download className="w-3.5 h-3.5" />
                                <span>Download Receipt</span>
                            </button>

                            <Link
                                to="/auth?tab=orders"
                                className="flex items-center justify-center gap-2 w-full bg-[#0066b2] hover:bg-[#005290] text-white text-xs font-semibold py-3 px-4 rounded-md transition-colors"
                            >
                                <Package className="w-3.5 h-3.5" />
                                <span>Go to Dashboard</span>
                            </Link>
                        </div>

                        <div className="text-center pt-2">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0066b2] transition-colors font-medium"
                            >
                                <Home className="w-3.5 h-3.5" />
                                <span>Back to Homepage</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
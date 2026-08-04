import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "How do I know if a part is compatible with my vehicle?",
        answer:
            "Use our search filters or vehicle selection tool to find compatible parts. If you're unsure, contact our support team with your vehicle make, model, and year, and we'll help you choose the correct part.",
    },
    {
        question: "Are your products genuine?",
        answer:
            "Yes. We offer genuine and high-quality aftermarket automotive parts sourced from trusted manufacturers to ensure reliability and performance.",
    },
    {
        question: "How long does shipping take?",
        answer:
            "Orders are typically delivered within 3–7 business days depending on your location and product availability.",
    },
    {
        question: "Can I track my order?",
        answer:
            "Yes. Once your order is shipped, you'll receive a tracking number via email, and you can also track your order from your AutoNex account.",
    },
    {
        question: "What payment methods do you accept?",
        answer:
            "We support secure payments through UPI, debit cards, credit cards, net banking, and other available payment options during checkout.",
    },
    {
        question: "Can I return a product?",
        answer:
            "Yes. Products can be returned within our return period if they are unused, in their original packaging, and meet our return policy.",
    },
    {
        question: "What should I do if I receive a damaged or incorrect item?",
        answer:
            "Contact our support team immediately with your order number and photos of the product. We'll resolve the issue as quickly as possible.",
    },
    {
        question: "Can I cancel my order?",
        answer:
            "Orders can be cancelled before they are shipped. Once shipped, you can initiate a return according to our return policy.",
    },
];

const FAQPage = () => {
    const [open, setOpen] = useState(0);

    return (
        <section className="bg-gray-50 py-20">
            <div className="max-w-5xl mx-auto px-4">

                {/* Heading */}

                <div className="text-center mb-14">

                    <span className="inline-flex items-center gap-2 text-[#0066CC] text-sm font-bold uppercase tracking-[0.25em]">
                        <span className="w-10 h-[2px] bg-[#0066CC]"></span>
                        Support
                    </span>

                    <h2 className="mt-5 text-4xl lg:text-5xl font-black text-slate-900">
                        Frequently Asked Questions
                    </h2>

                    <p className="mt-5 max-w-2xl mx-auto text-slate-500 leading-7">
                        Find answers to the most common questions about AutoNex,
                        our products, shipping, payments, and returns.
                    </p>

                </div>

                {/* FAQ */}

                <div className="space-y-4">

                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all"
                        >
                            <button
                                onClick={() =>
                                    setOpen(open === index ? -1 : index)
                                }
                                className="w-full flex items-center justify-between px-6 py-5 text-left"
                            >
                                <h3 className="font-semibold text-slate-900 text-lg">
                                    {faq.question}
                                </h3>

                                <ChevronDown
                                    size={22}
                                    className={`transition-transform duration-300 ${open === index
                                            ? "rotate-180 text-[#0066CC]"
                                            : "text-slate-400"
                                        }`}
                                />
                            </button>

                            <div
                                className={`transition-all duration-300 ${open === index
                                        ? "max-h-60 opacity-100"
                                        : "max-h-0 opacity-0"
                                    } overflow-hidden`}
                            >
                                <p className="px-6 pb-6 text-slate-600 leading-8">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default FAQPage;
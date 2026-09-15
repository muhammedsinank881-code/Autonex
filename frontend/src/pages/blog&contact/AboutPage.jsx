import { Car, ShieldCheck, Truck, Users, Wrench, Target } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Car,
      title: "Wide Range of Auto Parts",
      description:
        "Explore a growing collection of automotive parts, accessories, tyres, wheels, lighting, and more.",
    },
    {
      icon: ShieldCheck,
      title: "Quality You Can Trust",
      description:
        "We focus on providing reliable products with clear details to help you make confident purchasing decisions.",
    },
    {
      icon: Wrench,
      title: "Built for Car Owners",
      description:
        "Autonex makes it easier to find the right automotive products for your vehicle and its needs.",
    },
    {
      icon: Truck,
      title: "Convenient Delivery",
      description:
        "Order your automotive products online and have them delivered conveniently to your doorstep.",
    },
    {
      icon: Users,
      title: "Customer Focused",
      description:
        "Our platform is designed around making your shopping experience simple, clear, and convenient.",
    },
    {
      icon: Target,
      title: "Our Mission",
      description:
        "Our mission is to make automotive shopping easier by bringing products, information, and convenience together in one place.",
    },
  ];

  return (
    <section className="bg-gray-50 min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[#0066CC] text-sm font-bold uppercase tracking-[0.25em]">
            <span className="w-10 h-[2px] bg-[#0066CC]" />
            About Autonex
          </span>

          <h1 className="mt-4 text-4xl lg:text-5xl font-black text-slate-900">
            Your Trusted Automotive Marketplace
          </h1>

          <p className="mt-5 max-w-3xl mx-auto text-slate-500 leading-8 text-lg">
            Autonex is an online automotive marketplace designed to make finding
            and purchasing auto parts and products easier, faster, and more
            convenient.
          </p>
        </div>

        {/* About Card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 lg:p-12 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Everything Your Vehicle Needs
            </h2>

            <p className="mt-5 text-slate-600 leading-8">
              Whether you are looking for replacement parts, tyres, wheels,
              lighting, or automotive accessories, Autonex gives you a
              convenient place to discover the products you need.
            </p>

            <p className="mt-4 text-slate-600 leading-8">
              With features such as My Garage, product search, secure checkout,
              order tracking, and personalized account management, Autonex is
              built to provide a smooth automotive shopping experience from
              discovery to delivery.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                  <Icon
                    size={24}
                    className="text-[#0066CC]"
                    strokeWidth={1.8}
                  />
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm text-slate-500 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-[#0066CC] rounded-3xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Find What Your Vehicle Needs?
          </h2>

          <p className="mt-3 text-blue-100">
            Explore our products and find the right parts for your vehicle.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;

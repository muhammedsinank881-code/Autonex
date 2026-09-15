import { lazy, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useInitializeAuth } from "./hooks/auth/useInitializeAuth.js";

// Keep core/layout/route guards loaded immediately
import MainLayout from "./Layouts/MainLayout";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import AdminRoute from "./routes/AdminRoute";
import EmployeeRoute from "./routes/EmployeeRoute.jsx";
import MainLoader from "./components/layout.jsx/MainLoader.jsx";
import CurrencyInitializer from "./components/common/CurrencyInitializer.jsx";
import AboutPage from "./pages/blog&contact/AboutPage.jsx";

// Public pages
const Home = lazy(() => import("./pages/home/Home"));
const AllCategoryPage = lazy(() => import("./pages/home/AllCategoryPage.jsx"));

const Shop = lazy(() => import("./pages/Shop/Shop"));
const ProductDetailsPage = lazy(
  () => import("./pages/Shop/ProductDetailsPage"),
);

const CartPage = lazy(() => import("./pages/cart/CartPage"));
const Wishlist = lazy(() => import("./pages/cart/Wishlist"));
const ComparePage = lazy(() => import("./pages/cart/ComparePage"));

const Blog = lazy(() => import("./pages/blog&contact/Blog.jsx"));
const BlogDetails = lazy(() => import("./pages/blog&contact/BlogDetails.jsx"));
const ContactPage = lazy(() => import("./pages/blog&contact/ContactPage.jsx"));
const FAQPage = lazy(() => import("./pages/blog&contact/FAQPage.jsx"));

// Authentication pages
const AuthPage = lazy(() => import("./pages/Login/AuthPage"));
const VerifyOTPPage = lazy(() => import("./pages/Login/VerifyOTPPage"));
const ResetPassword = lazy(() => import("./pages/Login/ResetPassword"));
const ForgotPassword = lazy(() => import("./pages/Login/ForgotPassword"));

// Protected user pages
const ProfileLayout = lazy(() => import("./pages/Login/profile/ProfileLayout"));
const OrderDetailsPage = lazy(
  () => import("./pages/Login/profile/OrderDetailsPage.jsx"),
);
const CheckoutPage = lazy(() => import("./pages/cart/CheckoutPage"));
const MyGaragePage = lazy(() => import("./pages/garage/MyGaragePage"));

// Payment pages
const Payment = lazy(() => import("./pages/payment/Payment.jsx"));
const ConfirmOrderModal = lazy(
  () => import("./pages/payment/ConfirmOrderModal.jsx"),
);
const OrderSuccess = lazy(() => import("./pages/payment/OrderSuccess.jsx"));

// Employee pages
const EmployeeOrderPage = lazy(
  () => import("./pages/employee/EmployeeOrderPage.jsx"),
);

// Admin pages
const Dashboard = lazy(() => import("./components/admin/Dashboard.jsx"));
const Products = lazy(() => import("./components/admin/products/Products.jsx"));
const Categories = lazy(
  () => import("./components/admin/category/Categories.jsx"),
);
const Brands = lazy(() => import("./components/admin/brand/Brands.jsx"));
const Orders = lazy(() => import("./components/admin/orders/Orders.jsx"));
const AdminReviews = lazy(
  () => import("./components/admin/reviews/AdminReviews.jsx"),
);
const AdminBlogs = lazy(() => import("./components/admin/blogs/Blogs.jsx"));
const CreateEditBlog = lazy(
  () => import("./components/admin/blogs/CreateEditBlog.jsx"),
);
const AdminFAQs = lazy(() => import("./components/admin/faqs/FAQs.jsx"));
const CreateEditFAQ = lazy(
  () => import("./components/admin/faqs/CreateEditFAQ.jsx"),
);
const UsersView = lazy(() => import("./components/admin/users/UsersView.jsx"));
const Settings = lazy(() => import("./components/admin/Settings.jsx"));

const App = () => {
  useInitializeAuth();

  const navigate = useNavigate();

  const authInitialized = useSelector((state) => state.auth.authInitialized);

  const handleReturnToShop = () => {
    navigate("/shop");
  };

  if (!authInitialized) {
    return <MainLoader />;
  }

  return (
    <>
      <CurrencyInitializer />

      <Suspense fallback={<MainLoader />}>
        <Routes>
          {/* ==================== MAIN WEBSITE ==================== */}

          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />

            <Route path="/categories" element={<AllCategoryPage />} />

            <Route path="/shop" element={<Shop />} />

            <Route path="/product/:id" element={<ProductDetailsPage />} />

            <Route path="/cart" element={<CartPage />} />

            {/* ---------- Public Authentication ---------- */}

            <Route element={<PublicRoute />}>
              <Route path="/account" element={<AuthPage />} />

              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route path="/verify-otp" element={<VerifyOTPPage />} />

              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* ---------- Protected User Routes ---------- */}

            <Route element={<ProtectedRoute />}>
              <Route path="/auth" element={<ProfileLayout />} />

              <Route path="/cart/checkout" element={<CheckoutPage />} />

              <Route path="/MyGaragePage" element={<MyGaragePage />} />
            </Route>

            <Route path="/OrderDetail/:id" element={<OrderDetailsPage />} />

            <Route
              path="/wishlist"
              element={<Wishlist onReturnToShop={handleReturnToShop} />}
            />

            <Route path="/compare" element={<ComparePage />} />

            {/* ---------- Blog ---------- */}

            <Route path="/blog" element={<Blog />} />

            <Route path="/blog/:slug" element={<BlogDetails />} />

            <Route path="/contact" element={<ContactPage />} />

            <Route path="/faq" element={<FAQPage />} />

            <Route path="/aboutus" element={<AboutPage/>} />

            {/* ---------- Payment ---------- */}

            <Route path="/payment" element={<Payment />} />

            <Route path="/confirm-order" element={<ConfirmOrderModal />} />

            <Route path="/order-success" element={<OrderSuccess />} />
          </Route>

          {/* ==================== EMPLOYEE ==================== */}

          <Route element={<EmployeeRoute />}>
            <Route path="/e/o/:trackingId" element={<EmployeeOrderPage />} />
          </Route>

          {/* ==================== ADMIN ==================== */}

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />

              <Route path="products" element={<Products />} />

              <Route path="categories" element={<Categories />} />

              <Route path="brands" element={<Brands />} />

              <Route path="orders" element={<Orders />} />

              <Route path="reviews" element={<AdminReviews />} />

              <Route path="blogs" element={<AdminBlogs />} />

              <Route path="blogs/create" element={<CreateEditBlog />} />

              <Route path="blogs/:id/edit" element={<CreateEditBlog />} />

              <Route path="faqs" element={<AdminFAQs />} />

              <Route path="faqs/create" element={<CreateEditFAQ />} />

              <Route path="faqs/:id/edit" element={<CreateEditFAQ />} />

              <Route path="users" element={<UsersView />} />

              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;

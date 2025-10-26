import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// 🏠 Pages
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Registration from "../components/pages/Registration";
import ForgotPassword from "../components/pages/ForgotPassword";


// 🧩 Admin Imports
import AdminLayout from "../components/Admin/AdminLayout";
import AdminDashboard from "../components/Admin/AdminDashboard";
import AdminUsers from "../components/Admin/AdminUsers";
import AllEvents from "../components/Admin/AllEvents";
import AllProducts from "../components/Admin/AllProducts";
import AllSellers from "../components/Admin/AllSellers";
import AllWithdrawals from "../components/Admin/AllWithdrawals";
import AdminSettings from "../components/Admin/AdminSettings";

// 🛍️ Product + Seller Imports
import ProductList from "../components/Products/ProductList";
import AddProduct from "../components/Products/AddProduct";
import ProductDetails from "../components/Products/ProductDetails";
import SellerDashboard from "../components/Products/SellerDashboard";

// 🛒 Cart + Chat + Payment
import Cart from "../components/Cart/Cart";
import Chat from "../components/Chat/chat";
import Payment from "../components/Payment/Payment";
import Success from "../components/Payment/Success"; // ✅ Added this import

import Events from "../components/pages/Event";
import About from "../components/pages/About";
import Contact from "../components/pages/Contact";
import Settings from "../components/pages/Settings";

// ✅ ROUTER CONFIGURATION
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Registration /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
      

      // 🛍️ Products & Seller
      { path: "products", element: <ProductList /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "/SellerDashboard", element: <SellerDashboard /> },


      // 🛒 Buyer Actions
      { path: "cart", element: <Cart /> },
      { path: "chat/:sellerId", element: <Chat /> },
      { path: "payment", element: <Payment /> },
      { path: "success", element: <Success /> },
      { path: "events", element: <Events /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "settings", element: <Settings /> },

    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "users", element: <AdminUsers /> },
      { path: "events", element: <AllEvents /> },
      { path: "products", element: <AllProducts /> },
      { path: "sellers", element: <AllSellers /> },
      { path: "withdrawals", element: <AllWithdrawals /> },
      { path: "settings", element: <AdminSettings /> },
    ],
  },
]);

export default router;

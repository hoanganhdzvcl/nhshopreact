import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home";
import ShopPage from "./pages/shop";
import NotFound from "./pages/notFound";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import LayoutWebsite from "./components/LayoutWebsite";
import DetailProduct from "./pages/detail-product";
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import ProductManagement from "./pages/admin/product";
import ProductEditPage from "./pages/admin/product/edit";
import { Toaster } from "./components/ui/toaster";
import CategoryDetail from "./pages/CategoryDetail";
import Signin from "./pages/Signin";
import CartPage from "./pages/Cart";
import OrderPage from "./pages/order/page";
import ProductAddPage from "./pages/admin/product/add";
import OrderManager from "./pages/admin/order";
// import EditOrderPage from "./pages/admin/order/edit";
import Signup from "./pages/Signup";
import RoleLimit from "./pages/RoleLimit";
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route index element={<HomePage />} />
                    <Route path="shop" element={<ShopPage />} />
                    <Route path="products/:id" element={<DetailProduct />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="shop/categories/:id" element={<CategoryDetail />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="signin" element={<Signin />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="order" element={<OrderPage />} />
                    <Route path="rolelimit" element={<RoleLimit />} />

                </Route>

                <Route path="admin" element={<LayoutAdmin />}>
                    <Route path="products" element={<ProductManagement />}></Route>
                    <Route path="products/:id/edit" element={<ProductEditPage />}></Route>
                    <Route path="products/add" element={<ProductAddPage />}></Route>
                    <Route path="orders" element={<OrderManager />}></Route>
                    {/* <Route path="orders/:userId/:id/edit" element={<EditOrderPage />}></Route> */}
                </Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
            <Toaster />
        </>
    );
}

export default App;

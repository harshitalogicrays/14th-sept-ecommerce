import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./components/Products";
import Pagenotfound from "./pages/Pagenotfound";
import AdminDashboard from "./components/Admin/AdminDashboard";
import { Protected, ProtectedAdmin } from "./pages/HiddenLinks";
import ViewCategories from "./components/Admin/ViewCategories";
import AddCategory from "./components/Admin/AddCategory";
import AddSliderImage from "./components/Admin/AddSliderImage";
import ViewSliderImages from "./components/Admin/ViewSliderImages";
import AddProduct from "./components/Admin/AddProduct";
import ViewProducts from "./components/Admin/ViewProducts";
import Cart from "./components/Cart";
import CheckoutDetails from "./components/CheckoutDetails";
import Checkout from "./components/Checkout";
import CheckoutSuccess from "./components/CheckoutSuccess";
import MyOrders from "./components/MyOrders";
import Orders from "./components/Admin/Orders";
import OrderDetails from "./components/Admin/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
  <>
  <ToastContainer position="top-center"
                  autoClose={2000}
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable
                  pauseOnHover={false}
                  theme="colored"/>

  <Header/> 
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/product-details/:id' element={<ProductDetails/>}/>
      <Route path='/admin' element={<ProtectedAdmin> <AdminDashboard/> </ProtectedAdmin>}>
          <Route path='' element={<Dashboard/>}/>
          <Route path='viewcategories' element={<ViewCategories/>}/>
          <Route path='addcategory' element={<AddCategory/>}/>
          <Route path='editcat/:id' element={<AddCategory/>}/>
          <Route path='addslider' element={<AddSliderImage/>}/>
          <Route path='viewsliders' element={<ViewSliderImages/>}/>
          <Route path='editslider/:id' element={<AddSliderImage/>}/>
          <Route path='addproduct' element={<AddProduct/>}/>
          <Route path='viewproducts' element={<ViewProducts/>}/>
          <Route path='editproduct/:id' element={<AddProduct/>}/>
          <Route path='orders' element={<Orders/>}/>
          <Route path='order-details/:id' element={<OrderDetails/>}/>
      </Route>

      <Route path='/cart' element={<Cart/>}/>
      <Route path='/checkout-details' element={<Protected><CheckoutDetails/></Protected>}/>
      <Route path='/checkout' element={<Protected><Checkout/></Protected>}/>
      <Route path='/checkout-success' element={<CheckoutSuccess/>}/>
      <Route path='/myorders' element={<Protected><MyOrders/></Protected>}/>
      <Route path='*' element={<Pagenotfound/>}/>
    </Routes>

  </>
  );
}

export default App;

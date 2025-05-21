import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPageIklin from "./pages/LandingPageIklin";
import ProductList from "./pages/ProductList";
import AddEditProduct from "./pages/AddEditProduct";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./iklin.online/Navbariklin";
import ProductIklin from "./iklin.online/ProductIklin";
import Hero from "./iklin.online/HeroIklin";
import About from "./iklin.online/AboutIklin";
import Contact from "./iklin.online/Contact";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout"; // import layout
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ManageUsers from "./pages/ManageUsers";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-pink-300">
        <Routes>
          <Route path="/dashboard" element={<ProtectedRoute>
          <DashboardLayout /> </ProtectedRoute> }> <Route index element={<Dashboard />} />
          </Route>

          {/* Login Pages */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Public pages */}
          <Route path="/" element={<LandingPageIklin />} />
          <Route path="/navbariklin" element={<Navbar />} />
          <Route path="/heroiklin" element={<Hero />} />
          <Route path="/produkiklin" element={<ProductIklin />} />
          <Route path="/aboutiklin" element={<About />} />
          <Route path="/contactiklin" element={<Contact />} />

          {/* Dashboard & admin pages with sidebar */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="/dashboard/manageusers" element={<ManageUsers />} />
            <Route path="add" element={<AddEditProduct />} />
            <Route path="edit/:id" element={<AddEditProduct />} />
            <Route path="detail/:id" element={<ProductDetail />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;

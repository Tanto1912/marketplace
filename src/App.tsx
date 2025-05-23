import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingLayout from "./layout/LandingLayout";
import DashboardLayout from "./layout/DashboardLayout";

// LANDING PAGE //
import HomeCarousel from "./pages/landing/Home";
import CardSection from "./components/card/CardSection";
import ProductPage from "./pages/landing/Produk";
import ServicePage from "./pages/landing/Service";
import AboutPage from "./pages/landing/About";
import ArticlePage from "./pages/landing/Article";
import ContactPage from "./pages/landing/Contact";

// DASHBOARD PAGES //
import DashboardHome from "./pages/dashboard/Home";
import ManageUsers from "./pages/dashboard/ManageUser";
import ProfilePage from "./pages/dashboard/Profile";
import SettingsPage from "./pages/dashboard/SettingPage";
import EditLandingPage from "./pages/dashboard/EditLandingPage";

//AUTH PAGES //
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ManageProduk from "./pages/dashboard/ManageProduk";
import ManageArticles from "./pages/dashboard/ManageArticles";
import ManageBanners from "./pages/dashboard/ManageBanners";

function App() {
  return (
    <Router>
      <Routes>
        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Landing Routes */}
        <Route path="/" element={<LandingLayout />}>
          <Route
            index
            element={
              <>
                <HomeCarousel />
                <CardSection />
                <ProductPage />
                <ServicePage />
                <AboutPage />
                <ArticlePage />
                <ContactPage />
              </>
            }
          />
          <Route path="produk" element={<ProductPage />} />
          <Route path="layanan" element={<ServicePage />} />
          <Route path="tentang" element={<AboutPage />} />
          <Route path="artikel" element={<ArticlePage />} />
          <Route path="kontak" element={<ContactPage />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="manageusers" element={<ManageUsers />} />
          <Route path="manageproduk" element={<ManageProduk />} />
          <Route path="managearticle" element={<ManageArticles />} />
          <Route path="managebanner" element={<ManageBanners />} />
          <Route path="settingpage" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="editlandingpage" element={<EditLandingPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

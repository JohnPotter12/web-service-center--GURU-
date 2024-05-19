import React from "react";
import { Route, Routes } from "react-router";
import App from "./App";
import Categories from "./components/categories/categories";
import Footer from "./components/footer";
import About from "./pages/abouts";
import Admin from "./components/admin/admin";
import AdministrationPage from "./components/admin/administrationPage";
import Home from "./pages/home";
import Products from "./pages/products";
import Services from "./pages/services";
import Auth from "./components/admin/auth";
import ServicesManagement from "./components/admin/ServicesManagement";
import SparePartsManagement from "./components/admin/SparePartsManagement";
import Logs from "./components/admin/Logs";

// import Header from "./layouts/Header";
// import AboutSite from "./pages/AboutSitePage";
// import AuthPage from "./pages/AuthPage";
// import CoursesPage from "./pages/CoursesPage";
// import ModulesPage from "./pages/ModulesPage";
// import LessonsPage from "./pages/LessonPage";
// import AdminPanelPage from "./pages/AdminPanelPage";
// import ProfilePage from "./pages/ProfilePage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" exact element={<App />}>    
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />}>
          <Route path="/services/categories/:serviceId" element={<Categories />}/>
        </Route>
        <Route path="/products" element={<Products />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="auth" element={<Auth />} />
          <Route path="administrationPage" element={<AdministrationPage />} />
            <Route path="services" element={<ServicesManagement />} />
            <Route path="spareParts" element={<SparePartsManagement />} />
            <Route path="message" element={<Logs />} />
          {/* </Route> */}
        </Route>
      </Route>
    </Routes>
  );
}
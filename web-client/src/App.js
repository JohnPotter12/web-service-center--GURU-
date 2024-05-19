import "./App.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import Footer from "./components/footer";
import ConnectUs from "./components/connectUs/connectUs";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <>
      <div className="App">
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand>{t("service_center")}</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <NavLink className="nav-link" to="/">
                    {t("home")}
                  </NavLink>
                  <NavLink className="nav-link" to="/about">
                    {t("about_us")}
                  </NavLink>
                  <NavLink className="nav-link" to="/services">
                    {t("services")}
                  </NavLink>
                  <NavLink className="nav-link" to="/products">
                    {t("spare_parts")}
                  </NavLink>
                  <NavLink className="nav-link" to="/admin/auth">
                    {t("admin")}
                  </NavLink>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>

        <Outlet />

        <Footer />
      </div>
      <ConnectUs />
    </>
  );
}

export default App;

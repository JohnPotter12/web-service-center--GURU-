import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./footer.css"; // Стилі для футера

function Footer() {
  const { t, i18n } = useTranslation();

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <footer className="bg-dark text-white pt-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>{t("about_us")}</h5>
            <p>{t("about_us_description")}</p>
          </Col>
          <Col md={4}>
            <h5>{t("contacts")}</h5>
            <ul className="list-unstyled">
              <li>{t("phone")}: +380 123 456 789</li>
              <li>{t("email")}: info@service-center.com</li>
              <li>{t("address")}</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>{t("social_media")}</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Instagram
                </a>
              </li>
            </ul>
            <div className="dropdown mt-3">
              <button
                className="btn btn-secondary dropdown-toggle bg-dark"
                style={{ border: "0px" }}
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("language")}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <button
                    className="dropdown-item"
                    value="ua"
                    onClick={handleChange}
                  >
                    {t("ukrainian")}
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    value="en"
                    onClick={handleChange}
                  >
                    {t("english")}
                  </button>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>
              &copy; 2024 {t("service_center")}. {t("all_rights_reserved")}.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import "../styles/services.css";
import { Outlet, useNavigate, useLocation } from "react-router";
import { useTranslation } from "react-i18next";

function Services() {
  const [services, setServices] = useState([]);
  const [isServiceCategories, setIsServiceCategories] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const handleGetProduct = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/services");
      const data = response.data;

      // Додавання динамічних перекладів
      data.forEach((service) => {
        i18n.addResource(
          "ua",
          "translation",
          `service_name_${service.id}`,
          service.name
        );
        i18n.addResource(
          "ua",
          "translation",
          `service_description_${service.id}`,
          service.description
        );
        i18n.addResource(
          "en",
          "translation",
          `service_name_${service.id}`,
          service.name
        ); // Додайте переклади для англійської мови
        i18n.addResource(
          "en",
          "translation",
          `service_description_${service.id}`,
          service.description
        ); // Додайте переклади для англійської мови
      });

      setServices(data);
    } catch (error) {
      console.error("Error fetching services", error);
    }
  };

  useEffect(() => {
    handleGetProduct();

    if (location.pathname === "/services") {
      setIsServiceCategories(true);
    }
  }, [isServiceCategories, location.pathname]);

  const getCategories = (serviceId) => {
    navigate(`/services/categories/${serviceId}`);
    setIsServiceCategories(false);
  };

  return (
    <Container className="my-5">
      <div style={{ background: "#00000090" }} className="mb-5 p-4">
        <h1 className="text-center">{t("select_service_type")}</h1>
      </div>
      {isServiceCategories ? (
        <Row>
          {services.map((service) => (
            <Col key={service.id} md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{t(`service_name_${service.id}`)}</Card.Title>
                  <Card.Text>
                    {t(`service_description_${service.id}`)}
                  </Card.Text>
                  <Button
                    onClick={() => getCategories(service.id)}
                    variant="primary"
                  >
                    {t("details")}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        ""
      )}
      <Outlet />
    </Container>
  );
}

export default Services;

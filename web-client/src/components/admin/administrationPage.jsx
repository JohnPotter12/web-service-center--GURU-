// src/components/admin/AdminDashboard.js

import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function AdminDashboard() {
  const { t } = useTranslation();

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>{t("services_management")}</Card.Title>
              <Card.Text>{t("manage_services_description")}</Card.Text>
              <Link to="/admin/services" className="btn btn-primary">
                {t("manage_services")}
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>{t("spare_parts_requests_management")}</Card.Title>
              <Card.Text>
                {t("manage_spare_parts_requests_description")}
              </Card.Text>
              <Link to="/admin/spareParts" className="btn btn-primary">
                {t("manage_spare_parts_requests")}
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>{t("logs")}</Card.Title>
              <Card.Text>{t("view_logs_description")}</Card.Text>
              <Link to="/admin/message" className="btn btn-primary">
                {t("view_logs")}
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;

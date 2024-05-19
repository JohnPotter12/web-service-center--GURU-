import React from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { NavLink } from "react-router-dom";

function Home() {
  const { t } = useTranslation();
  return (
    <>
      <main style={{ background: "#2c2c2c40" }}>
        <Container fluid className="p-3  text-center">
          <Row>
            <Col>
              <h1>{t("welcome")}</h1>
              <h5>{t("best_services")}</h5>
              <Button
                style={{ margin: "20px" }}
                variant="primary"
                href="/services"
              >
                {t("servicesOur")}
              </Button>
            </Col>
          </Row>
        </Container>

        <Container className="my-5">
          <Row>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{t("repair_laptops")}</Card.Title>
                  <Card.Text>{t("repair_laptops_desc")}</Card.Text>
                  <Button variant="primary">
                    <NavLink className="nav-link" to="/services">
                      {t("details")}
                    </NavLink>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{t("repair_phones")}</Card.Title>
                  <Card.Text>{t("repair_phones_desc")}</Card.Text>
                  <Button variant="primary">
                    <NavLink className="nav-link" to="/services">
                      {t("details")}
                    </NavLink>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{t("sell_spare_parts")}</Card.Title>
                  <Card.Text>{t("sell_spare_parts_desc")}</Card.Text>
                  <Button variant="primary">
                    <NavLink className="nav-link" to="/products">
                      {t("details")}
                    </NavLink>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <Container className="my-5">
          <Row>
            <Col>
              <h2>{t("our_advantages")}</h2>
              <Row>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{t("speed")}</Card.Title>
                      <Card.Text>{t("speed_desc")}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{t("quality")}</Card.Title>
                      <Card.Text>{t("quality_desc")}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{t("warranty")}</Card.Title>
                      <Card.Text>{t("warranty_desc")}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col>
              <h2>{t("customer_reviews")}</h2>
              <Row>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Text>{t("review_1")}</Card.Text>
                      <Card.Footer>{t("reviewer_1")}</Card.Footer>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Text>{t("review_2")}</Card.Text>
                      <Card.Footer>{t("reviewer_2")}</Card.Footer>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Text>{t("review_3")}</Card.Text>
                      <Card.Footer>{t("reviewer_3")}</Card.Footer>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default Home;

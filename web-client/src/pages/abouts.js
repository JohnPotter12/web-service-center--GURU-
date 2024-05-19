import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "../styles/about.css";
import history from "../image/history.jpg";
import mission from "../image/mission.jpg";

function About() {
  const { t } = useTranslation();

  return (
    <Container className="my-5">
      <Row>
        <Col style={{ background: "#00000090" }}>
          <h1 className="text-center">{t("about_us")}</h1>
          <p className="text-center">{t("about_us_description")}</p>
        </Col>
      </Row>
      <Row className="my-5">
        <Col md={6} className="bg-light">
          <h2>{t("our_history")}</h2>
          <p>{t("history_description")}</p>
        </Col>
        <Col md={6}>
          <img
            src={history}
            style={{ width: "80%", height: "300px" }}
            alt="Our History"
            className="img-fluid"
          />
        </Col>
      </Row>
      <Row className="my-5">
        <Col md={6}>
          <img
            src={mission}
            style={{ width: "80%", height: "300px" }}
            alt="Our Mission"
            className="img-fluid"
          />
        </Col>
        <Col md={6} className="bg-light">
          <h2>{t("our_mission")}</h2>
          <p>{t("mission_description")}</p>
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <h2 className="text-center">{t("our_team")}</h2>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="your-team-member-image-url.jpg" />
            <Card.Body>
              <Card.Title>{t("team_member_name")}</Card.Title>
              <Card.Text>{t("team_member_position_1")}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="your-team-member-image-url.jpg" />
            <Card.Body>
              <Card.Title>{t("team_member_name")}</Card.Title>
              <Card.Text>{t("team_member_position_2")}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="your-team-member-image-url.jpg" />
            <Card.Body>
              <Card.Title>{t("team_member_name")}</Card.Title>
              <Card.Text>{t("team_member_position_3")}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;

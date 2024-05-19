// src/pages/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "../../styles/admin.css";

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/auth",
        formData
      );
      console.log(response.data);
      //   localStorage.setItem('token', response.data.token);
      navigate("/admin/administrationPage"); // Перенаправлення на сторінку після успішного входу
    } catch (error) {
      setError(t("invalid_credentials"));
    }
  };

  return (
    <div className="login-background">
      <Container className="my-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Card className="login-card p-4">
              <h1 className="text-center">{t("login")}</h1>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label style={{ color: "white" }}>
                    {t("username")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="login"
                    value={formData.login}
                    onChange={handleChange}
                    placeholder={t("enter_username")}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label style={{ color: "white" }}>
                    {t("password")}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t("enter_password")}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3 w-100">
                  {t("login")}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;

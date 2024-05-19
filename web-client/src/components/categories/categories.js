import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router";
import axios from "axios";
import { useTranslation } from "react-i18next";

function Categories() {
  const { serviceId } = useParams();
  const [categories, setCategories] = useState([]);
  const [responseData, setResponseData] = useState("");
  const [products, setProducts] = useState({
    typeServicesId: "",
    categoriesServicesId: "",
    numberPhoneClient: "",
    nameClient: "",
    message: "",
  });

  const { t } = useTranslation();

  const fetchCategories = async (serviceId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/services/categories/${serviceId}`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCategories(serviceId);
  }, [serviceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/servicesCreate/Send",
        products
      );
      setResponseData(response.data);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleGetProduct = async (service_id, categories_id) => {
    setProducts({
      ...products,
      typeServicesId: service_id,
      categoriesServicesId: categories_id,
    });
  };

  return (
    <Container className="my-5">
      <Row>
        {categories.map((categorie) => (
          <Col key={categorie.id} md={4} className="mb-4">
            <Button
              variant="primary"
              type="button"
              class="btn btn-primary mb-4 mt-4"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() =>
                handleGetProduct(categorie.service_id, categorie.id)
              }
            >
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{categorie.name}</Card.Title>
                  Детальніше
                </Card.Body>
              </Card>
            </Button>
          </Col>
        ))}
      </Row>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-4" id="exampleModalLabel">
                {t("new_mess")}
              </h1>
              <br />

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body row">
              <h4 class="fs-5">{t("buy_spare_part")}</h4>
              <div class="mb-3 row">
                <label for="recipient-name" class="col-md-4">
                  {t("team_member_name")}:
                </label>
                <input
                  type="text"
                  class="form-control"
                  value={products.nameClient}
                  name="nameClient"
                  onChange={(e) =>
                    setProducts({ ...products, nameClient: e.target.value })
                  }
                  id="recipient-name"
                />
              </div>
              <div class="mb-3 row">
                <label for="recipient-name" class="col-md-3">
                  {t("phone1")}:
                </label>
                <input
                  type="text"
                  class="form-control"
                  value={products.numberPhoneClient}
                  name="numberPhoneClient"
                  onChange={(e) =>
                    setProducts({
                      ...products,
                      numberPhoneClient: e.target.value,
                    })
                  }
                  id="recipient-name"
                />
              </div>
              <div class="mb-3 row">
                <label for="message-text" class="col-md-4">
                  {t("mess")}:
                </label>
                <textarea
                  class="form-control"
                  value={products.message}
                  name="message"
                  onChange={(e) =>
                    setProducts({ ...products, message: e.target.value })
                  }
                  id="message-text"
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                {t("close_modal")}
              </button>
              <button
                type="button"
                data-bs-target="#exampleModalToggle2"
                class="btn btn-primary"
                data-bs-toggle="modal"
                onClick={(e) => handleSubmit(e)}
              >
                {t("send_message")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
                Відповідь
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">{responseData.message}</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                {t("close_modal")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Categories;

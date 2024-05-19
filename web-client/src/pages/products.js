import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import "../styles/products.css";
import { useTranslation } from "react-i18next";

function Products() {
  const [products, setProducts] = useState([]);
  const [responseData, setResponseData] = useState("");
  const [buySpareParts, setBuySpareParts] = useState({
    nameClient: "",
    numberPhoneClient: "",
    message: "",
    count: "1",
    deviceId: "",
  });
  const { t } = useTranslation();

  const handleGetProduct = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/viewing");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nameClient, numberPhoneClient, message, count, deviceId } =
      buySpareParts;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/buySpareParts",
        {
          nameClient,
          numberPhoneClient,
          message,
          count,
          deviceId,
        }
      );
      setResponseData(response.data);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleGetBuySpareParts = (id) => {
    setBuySpareParts((prevState) => ({
      ...prevState,
      deviceId: id,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuySpareParts((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container className="my-5">
      <div style={{ background: "#00000090" }} className="mb-5 p-4">
        <h1 className="text-center">{t("spare_parts")}</h1>
      </div>

      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={product.photo} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>
                  <strong>{t("price")}:</strong> {product.price} грн
                </Card.Text>
                <Button
                  variant="primary"
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  onClick={() => handleGetBuySpareParts(product.id)}
                  data-bs-target="#exampleModal"
                >
                  {t("buy")}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-4" id="exampleModalLabel">
                {t("new_mess")}
              </h1>
              <br />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body row">
              <form>
                <h4 className="fs-5">{t("buy_spare_part")}</h4>
                <div className="mb-3 row">
                  <label htmlFor="recipient-name" className="col-md-4">
                    {t("team_member_name")}:
                  </label>
                  <input
                    type="text"
                    value={buySpareParts.nameClient}
                    name="nameClient"
                    onChange={handleChange}
                    className="form-control"
                    id="recipient-name"
                  />
                </div>
                <div className="mb-3 row">
                  <label htmlFor="recipient-name" className="col-md-3">
                    {t("phone1")}:
                  </label>
                  <input
                    type="text"
                    value={buySpareParts.numberPhoneClient}
                    name="numberPhoneClient"
                    onChange={handleChange}
                    className="form-control"
                    id="recipient-name"
                  />
                </div>
                <div className="mb-3 row">
                  <label htmlFor="recipient-name" className="col-md-2">
                    {t("count")}:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={buySpareParts.count}
                    name="count"
                    onChange={handleChange}
                    className="form-control"
                    id="recipient-name"
                  />
                </div>
                <div className="mb-3 row">
                  <label htmlFor="message-text" className="col-md-4">
                    {t("mess")}:
                  </label>
                  <textarea
                    className="form-control"
                    value={buySpareParts.message}
                    name="message"
                    onChange={handleChange}
                    id="message-text"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                {t("close_modal")}
              </button>
              <button
                type="button"
                data-bs-target="#exampleModalToggle2"
                className="btn btn-primary"
                data-bs-toggle="modal"
                onClick={handleSubmit}
              >
                {t("send_message")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                Відповідь
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{responseData.message}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
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

export default Products;

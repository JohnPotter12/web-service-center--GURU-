import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Row,
  Col,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";

function SparePartsManagement() {
  const [sparePartsRequests, setSparePartsRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSparePartsId, setSelectedSparePartsId] = useState(null);
  const [ responseData, setResponseData ] = useState('')
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [spareParts, setSpareParts] = useState([]);
  const [resultResponse, setResultResponse] = useState("");
  const [formData, setFormData] = useState({
    number: "",
    description: "",
    photo: "",
    nameSpareParts: "",
    price: "",
  });

  const [formDataChange, setFormDataChange] = useState({
    id:"",
    number: "",
    description: "",
    photo: "",
    nameSpareParts: "",
    price: "",
  });
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeSubmit = (e) => {
    const { name, value } = e.target;
    setFormDataChange({ ...formDataChange, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/createSpareParts",
        formData
      );
      console.log("Spare part created:", response.data);
      setResultResponse(response.data.message);
      fetchSparePartsRequests(); // Refresh the list after adding a new spare part
      setShowModal(false);
    } catch (error) {
      console.error("Error creating spare part:", error);
    }
  };

  const handleSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/admin/updateSpareParts/${formDataChange.id}`,
        formDataChange
      );
      console.log("Spare part created:", response.data);
      setResponseData(response.data.message);
      console.log(responseData)
      fetchSparePartsRequestsAll(); // Refresh the list after adding a new spare part
      // setShowModal(false);
    } catch (error) {
      console.error("Error creating spare part:", error);
    }
  };

  const fetchSparePartsRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/userSpareParts"
      );
      setSparePartsRequests(response.data);
    } catch (error) {
      console.error("Error fetching spare parts requests:", error);
    }
  };

  const fetchSparePartsRequestsAll = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/viewing");
      // setSparePartsRequests(response.data);
      setSpareParts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching spare parts requests:", error);
    }
  };

  useEffect(() => {
    fetchSparePartsRequests();
    fetchSparePartsRequestsAll();
  }, []);

  const deleteSparePartRequest = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/admin/userSpareParts/${id}`
      );
      fetchSparePartsRequests(); // Refresh the list
    } catch (error) {
      console.error("Error deleting spare part request:", error);
    }
  };

  const deleteSparePart = async (id) => {
    try {
      console.log();
      await axios.delete(`http://localhost:3000/api/admin/spareParts/${id}`);
      fetchSparePartsRequestsAll(); // обновление списка запчастей после удаления
    } catch (error) {
      console.error("Error deleting spare part:", error);
    }
  };

  const providedSpearePart = async (
    id,
    sparePartInStock,
    needDevice,
    spareParts_id
  ) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/admin/sparePartsProvided",
        {
          id, // замініть на правильний id запиту на сервіс
          sparePartInStock,
          needDevice,
          spareParts_id,
        }
      );
      fetchSparePartsRequests(); // Refresh the list
    } catch (error) {
      console.error("Error updating spare part request:", error);
    }
  };

  return (
    <>
      <Container className="my-5">
        <h2>{t("spare_parts_requests_management")}</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>{t("client_name")}</th>
              <th>{t("phone")}</th>
              <th>{t("message")}</th>
              <th>{t("spare_part_name")}</th>
              <th>{t("spare_part_description")}</th>
              <th>{t("price")}</th>
              <th>{t("quantity")}</th>
              <th>{t("quantity_left")}</th>
              <th>{t("provided_service")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {sparePartsRequests.map((request) => (
              <>
                <tr key={request.id}>
                  <td>{request.nameClient}</td>
                  <td>{request.numberPhoneClient}</td>
                  <td>{request.message}</td>
                  <td>{request.SparePart.nameSpareParts}</td>
                  <td>{request.SparePart.description}</td>
                  <td>{request.SparePart.price}</td>
                  <td>{request.number}</td>
                  <td>{request.SparePart.number}</td>
                  <td>{request.providedService ? t("yes") : t("no")}</td>
                  <td>
                    <Button
                      variant="danger"
                      type="button"
                      class="btn btn-primary mb-4 mt-4"
                      data-bs-toggle="modal"
                      data-bs-target="#DeleteModalUsersSparePats"
                      onClick={() => {
                        setSelectedRequestId(request.id);
                        // setShowDeleteModal(true);
                      }}
                    >
                      {t("delete")}
                    </Button>
                  </td>
                  {request.providedService ? (
                    ""
                  ) : (
                    <td style={{ backgroundColor: "#00000000" }}>
                      <Button
                        variant="success"
                        className="bg-green-500"
                        // style={{backgroundColor: "#000000"}}
                        onClick={() =>
                          providedSpearePart(
                            request.id,
                            request.SparePart.number,
                            request.number,
                            request.SparePart.id
                          )
                        }
                      >
                        {t("Виконанно")}
                      </Button>
                    </td>
                    ////////////////////////////////////////
                  )}
                </tr>

                <div
                  class="modal fade"
                  id="DeleteModalUsersSparePats"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div
                    class="modal-dialog modal-dialog-centered modal-sm"
                    style={{ background: "#ffffff00" }}
                  >
                    <div class="modal-content p-4">
                      <div class="modal-header">
                        <h1 class="modal-title fs-4" id="DeleteModalLabel">
                          {t("Підтвердження")}
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <br />
                      <div>Ви підтверджуете видалення?</div>
                      <button
                        type="button"
                        class="btn btn-primary mt-4"
                        data-bs-dismiss="modal"
                        onClick={() =>
                          deleteSparePartRequest(selectedRequestId)
                        }
                      >
                        Підтвердити
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </tbody>
        </Table>
      </Container>

      <Container>
        <Row>
          <Col>
            <Card className="mb-4">
              <Card.Body>
                <Button
                  variant="primary"
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  onClick={() => setShowModal(true)}
                >
                  <Card.Text>Додати запчастини</Card.Text>
                  <Card.Title>До катологу</Card.Title>
                  <Card.Text>
                    <strong>{t("price")}:</strong>
                  </Card.Text>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t("add_spare_part")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>{t("number")}</Form.Label>
                <Form.Control
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t("description")}</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t("photo")}</Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t("name_spare_parts")}</Form.Label>
                <Form.Control
                  type="text"
                  name="nameSpareParts"
                  value={formData.nameSpareParts}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t("price")}</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {t("send_message")}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal
          show={!!resultResponse}
          onHide={() => setResultResponse("")}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Відповідь</Modal.Title>
          </Modal.Header>
          <Modal.Body>{resultResponse}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setResultResponse("")}>
              {t("close_modal")}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      <Container>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>{t("count")}</th>
              <th>{t("description")}</th>
              <th>{t("photo")}</th>
              <th>{t("name_spare_parts")}</th>
              <th>{t("price")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {spareParts.map((part) => (
              <>
                <tr key={part.id}>
                  <td>{part.number}</td>
                  <td>{part.description}</td>
                  <td>
                    {part.photo && (
                      <img
                        src={part.photo}
                        alt={part.nameSpareParts}
                        width="50"
                      />
                    )}
                  </td>
                  <td>{part.nameSpareParts}</td>
                  <td>{part.price}</td>
                  <td>
                    <Button
                      variant="danger"
                      type="button"
                      class="btn btn-primary mb-4 mt-4"
                      data-bs-toggle="modal"
                      data-bs-target="#DeleteModal"
                      onClick={(e) => setSelectedSparePartsId(part.id)}
                    >
                      {t("delete")}
                    </Button>
                  </td>
                  <td style={{ backgroundColor: "#00000000" }}>
                    <Button
                      variant="danger"
                      type="button"
                      class="btn btn-primary mb-4 mt-4"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      onClick={() => {
                        setFormDataChange(part);
                        // setShowDeleteModal(true);
                      }}
                    >
                      {t("Змінити")}
                    </Button>
                  </td>
                </tr>

                <div
                  class="modal fade"
                  id="DeleteModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div
                    class="modal-dialog modal-dialog-centered modal-sm"
                    style={{ background: "#ffffff00" }}
                  >
                    <div class="modal-content p-4">
                      <div class="modal-header">
                        <h1 class="modal-title fs-4" id="DeleteModalLabel">
                          {t("Підтвердження")}
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <br />
                      <div>Ви підтверджуете видалення?</div>
                      <button
                        type="button"
                        class="btn btn-primary mt-4"
                        data-bs-dismiss="modal"
                        onClick={() => deleteSparePart(selectedSparePartsId)}
                      >
                        Підтвердити
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </tbody>
        </Table>
        <div
          className="modal fade"
          id="editModal"
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
                <form onSubmit={handleSubmitChange}>
                  <h4 className="fs-5">Змінити</h4>
                  <div className="mb-3 row">
                    <label htmlFor="number" className="col-md-4">
                      {t("number")}:
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={formDataChange.number}
                      onChange={handleChangeSubmit}
                      className="form-control"
                      id="number"
                    />
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="description" className="col-md-4">
                      {t("description")}:
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={formDataChange.description}
                      onChange={handleChangeSubmit}
                      className="form-control"
                      id="description"
                    />
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="photo" className="col-md-4">
                      {t("photo")}:
                    </label>
                    <input
                      type="file"
                      name="photo"
                      onChange={handleChangeSubmit}
                      className="form-control"
                      id="photo"
                    />
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="nameSpareParts" className="col-md-4">
                      {t("name_spare_parts")}:
                    </label>
                    <input
                      type="text"
                      name="nameSpareParts"
                      value={formDataChange.nameSpareParts}
                      onChange={handleChangeSubmit}
                      className="form-control"
                      id="nameSpareParts"
                    />
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="price" className="col-md-4">
                      {t("price")}:
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={formDataChange.price}
                      onChange={handleChangeSubmit}
                      className="form-control"
                      id="price"
                    />
                  </div>
                  <div className="modal-footer">
                    <Button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      {t("close_modal")}
                    </Button>
                    <button
                      type="button"
                      data-bs-target="#exampleModalToggle2"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      onClick={handleSubmitChange}
                    >
                      {t("send_message")}
                    </button>
                  </div>
                </form>
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
            <div class="modal-body">{responseData}</div>
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
    </>
  );
}

export default SparePartsManagement;

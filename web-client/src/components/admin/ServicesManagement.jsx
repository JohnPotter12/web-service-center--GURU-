import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function ServicesManagement() {
  const [servicesSend, setServicesSend] = useState([]);
  const { t } = useTranslation();

  console.log(servicesSend);

  useEffect(() => {
    fetchServicesSendData();
  }, []);

  const fetchServicesSendData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/services"
      );
      setServicesSend(response.data);
    } catch (error) {
      console.error("Error fetching services send data:", error);
    }
  };

  const deleteServiceSend = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/admin/servicesDelete/${id}`
      );
      fetchServicesSendData(); // Refresh the list
    } catch (error) {
      console.error("Error deleting service send:", error);
    }
  };

  const providedServiceSend = async (_id) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/admin/services",
        {
          id: _id, // замініть на правильний id запиту на сервіс
        }
      );
      fetchServicesSendData(); // Refresh the list
    } catch (error) {
      console.error("Error deleting service send:", error);
    }
  };

  return (
    <Container className="my-5">
      <div style={{ background: "#00000090" }} className="mb-5 p-4">
        <h2>{t("services_management")}</h2>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t("service_name")}</th>
            <th>{t("category_name")}</th>
            <th>{t("number_phone_client")}</th>
            <th>{t("name_client")}</th>
            <th>{t("provided_service")}</th>
            <th>{t("message")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {servicesSend && servicesSend.length > 0 ? (
            servicesSend.map((serviceSend) => (
              <tr key={serviceSend.id}>
                <td>
                  {serviceSend.Category && serviceSend.Category.Service
                    ? serviceSend.Category.Service.name
                    : t("no_service")}
                </td>
                <td>
                  {serviceSend.Category
                    ? serviceSend.Category.name
                    : t("no_category")}
                </td>
                <td>{serviceSend.numberPhoneClient}</td>
                <td>{serviceSend.nameClient}</td>
                <td>{serviceSend.providedService ? t("yes") : t("no")}</td>
                <td>{serviceSend.message}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteServiceSend(serviceSend.id)}
                  >
                    {t("delete")}
                  </Button>
                </td>
                {serviceSend.providedService ? (
                  ""
                ) : (
                  <div style={{ backgroundColor: "#ffffff00" }}>
                    <Button
                      variant="success"
                      className="bg-green-500"
                      onClick={() => providedServiceSend(serviceSend.id)}
                    >
                      {t("Виконанно")}
                    </Button>
                  </div>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">{t("no_services_sends")}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default ServicesManagement;

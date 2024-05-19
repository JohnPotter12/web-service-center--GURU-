import { useState } from "react";
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
import axios from "axios";
import "./connectUs.css";

function ConnectUs() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const [formData, setFormData] = useState({
    name: '',
    numberPhone: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/admin/messages', formData);
      // alert('Сообщение отправлено!');
    } catch (error) {
      console.error('Ошибка отправки сообщения', error);
    }
  };


  return (
    <div className="connectUs">
      {isChatOpen ? (
        <Container className="my-5 bg-light">
          <Button onClick={(e) => toggleChat()}>Закрити</Button>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formNumberPhone">
          <Form.Label>Телефон</Form.Label>
          <Form.Control
            type="text"
            name="numberPhone"
            value={formData.numberPhone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formMessage">
          <Form.Label>Сообщение</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Отправить
        </Button>
      </Form>
    </Container>
      ) : (
        <div className="container">
          <button className="round-button" onClick={toggleChat}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              className="bi bi-chat-right-text-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1m0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1m0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default ConnectUs;

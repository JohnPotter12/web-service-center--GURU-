import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container } from 'react-bootstrap';

const MessageTable = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Ошибка получения сообщений', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/messages/${id}`);
      fetchMessages(); // Refresh the list after deletion
    } catch (error) {
      console.error('Ошибка удаления сообщения', error);
    }
  };

  return (
    <Container>
      <h2>Сообщения</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>Сообщение</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{message.name}</td>
              <td>{message.numberPhone}</td>
              <td>{message.email}</td>
              <td>{message.message}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => deleteMessage(message.id)}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MessageTable;

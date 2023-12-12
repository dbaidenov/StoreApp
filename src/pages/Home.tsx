import { Form, Button } from "react-bootstrap";
import { FC, useRef } from "react";
import "./../styles/Home.scss";
import { GiHumanTarget } from "react-icons/gi";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Home: FC = () => {
  const emailInput = useRef<any>(null);
  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (emailRegex.test(emailInput.current.value)) {
      alert("Успешно");
    } else {
      alert("Неправильно заполнена форма!");
      emailInput.current
        .closest("form")
        .querySelectorAll("input")
        .forEach((input: HTMLInputElement) => (input.value = ""));
      emailInput.current.closest("form").querySelector("input").focus();
    }
  };

  console.log(emailInput.current);

  return (
    <Form onSubmit={handleSubmit} id="1">
      <GiHumanTarget className="bg-light GiHumanTarget" />
      <Form.Group controlId="Email" className="mb-3">
        <Form.Label className="form--label">Email:</Form.Label>
        <Form.Control
          placeholder="Введите email"
          ref={emailInput}
          required
          type="Email"
        />
        <Form.Text>
          Мы никогда не передадим ваш адрес электронной почты кому-либо еще.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="Password" className="mb-3">
        <Form.Label className="form--label">Пароль</Form.Label>
        <Form.Control required type="Password" placeholder="Введите пароль" />
      </Form.Group>
      <Button type="submit">Отправить</Button>
    </Form>
  );
};

export default Home;

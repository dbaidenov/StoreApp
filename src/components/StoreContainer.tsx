import { FC } from "react";
import { Card, Button } from "react-bootstrap";
import { currencyFormat } from "../utils/currencyFormat";
import { ShoppingCardType } from "../models/shoppingCard";

interface StoreContainerPropsType extends ShoppingCardType {
  id: number;
  price: number;
  title: string;
  image: string;
}

const StoreContainer: FC<StoreContainerPropsType> = ({
  id,
  price,
  title,
  image,
  getItemCnt,
  increaseCardCnt,
  decreaseCardCnt,
  removeFromCard,
}) => {
  const cnt = getItemCnt(id);
  return (
    <Card className="card">
      <Card.Img variant="top" src={image} className="card--img"></Card.Img>
      <Card.Body className="d-flex flex-column justify-content-between align-items-center">
        <Card.Title className="mb-0">
          {title}{" "}
          <Card.Link
            className="card--link"
            target="_blank"
            href="https://fakestoreapi.com/"
          >
            Подробнее
          </Card.Link>
        </Card.Title>
        <Card.Text className="mb-0 fs-5">{currencyFormat(price)}</Card.Text>

        <div>
          {cnt === 0 ? (
            <Button onClick={() => increaseCardCnt(id)}>
              Добавить в корзину
            </Button>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex justify-content-space-between align-items-center card--button-controller">
                <Button onClick={() => increaseCardCnt(id)}>+</Button>
                <span className="fs-5">{cnt} добавлено</span>
                <Button onClick={() => decreaseCardCnt(id)}>-</Button>
              </div>
              <Button onClick={() => removeFromCard(id)} variant="danger">
                Удалить
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreContainer;

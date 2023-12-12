import { FC } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Row, Col } from "react-bootstrap";
import StoreContainer from "../components/StoreContainer";
import { ShoppingCardType } from "../models/shoppingCard";
import "./../styles/Store.scss";

interface StorePropsType
  extends Omit<
    ShoppingCardType,
    "cardItems" | "cardCnt" | "closeCard" | "openCard"
  > {
  isLoading: boolean;
  data: any;
}

const Store: FC<StorePropsType> = ({
  isLoading,
  data,
  getItemCnt,
  increaseCardCnt,
  decreaseCardCnt,
  removeFromCard,
}) => {
  return isLoading ? (
    <div className="card--loading">
      <Spinner style={{ height: "5rem", width: "5rem" }} />
    </div>
  ) : (
    <>
      <h2>Store</h2>
      <Row lg={3} md={2} xs={1}>
        {data.map((value: any) => {
          return (
            <Col key={value.id}>
              <StoreContainer
                {...value}
                getItemCnt={getItemCnt}
                increaseCardCnt={increaseCardCnt}
                decreaseCardCnt={decreaseCardCnt}
                removeFromCard={removeFromCard}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Store;

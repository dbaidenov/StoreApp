import { Offcanvas, Stack } from "react-bootstrap";
import Card from "./Card";
import { CardItem } from "../models/shoppingCard";
import { currencyFormat } from "../utils/currencyFormat";

interface ShoppingCardProps {
  isOpen: boolean;
  closeCard: () => void;
  cardItems: CardItem[];
  removeFromCard: (id: number) => void;
  data: any;
}

const ShoppingCard = ({
  data,
  isOpen,
  closeCard,
  cardItems,
  removeFromCard,
}: ShoppingCardProps) => {
  console.log(data);
  
  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCard}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Card</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack direction="vertical" gap={3}>
          {cardItems.map((value) => (
            <Card
              key={value.id}
              {...value}
              data={data}
              removeFromCard={removeFromCard}
            />
          ))}
          <div className="ms-auto">
            Total{" "}
            {currencyFormat(
              cardItems.reduce((total, value) => {
                console.log(value);
                console.log(data);

                const item = data.find((i: any) => i.id === value.id);
                console.log(item);
                return total + (item?.price || 0) * value.cnt;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCard;

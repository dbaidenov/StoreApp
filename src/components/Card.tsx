import { Stack, Button } from "react-bootstrap";
import { currencyFormat } from "../utils/currencyFormat";
import "./../styles/ShoppingCard.scss";

interface CardProps {
  id: number;
  cnt: number;
  removeFromCard: (id: number) => void;
  data: any;
}

const Card = ({ data, id, cnt, removeFromCard }: CardProps) => {
  const item = data.find((value: any) => value.id === id);
  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img src={item.image} className="shopCard--img" alt="" />
      <div className="me-auto">
        <div>
          {item.title}{" "}
          {cnt > 1 && <span className="text-muted shopCard--cnt">x{cnt}</span>}
        </div>
        <div className="text-muted shopCard--price">
          {currencyFormat(item.price * cnt)}
        </div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCard(item.id)}
        >
          &times;
        </Button>
      </div>
    </Stack>
  );
};

export default Card;

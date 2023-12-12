import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Navbar.scss";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Navbar from "./components/Navbar";
import ShoppingCard from "./components/ShoppingCard";
import { CardItem } from "./models/shoppingCard";
import useStorageData from "./hooks/localStorage";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      try {
        const request = await fetch("https://fakestoreapi.com/products");
        if (!request.ok)
          throw new Error(
            `не удалось получить данные! Статус запроса - ${request.status}`
          );
        const data = await request.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  //---------------------------------
  const [cardItems, setCardItems] = useStorageData<CardItem[]>("shops", []);
  console.log(cardItems);

  const [isOpen, setIsOpen] = useState(false);
  const cardCnt = cardItems.reduce((acc, value) => acc + value.cnt, 0);

  function getItemCnt(id: number) {
    return cardItems.find((item) => item.id === id)?.cnt || 0;
  }

  //---------------------------------
  function increaseCardCnt(id: number) {
    setCardItems((currItems) => {
      if (currItems.find((value) => value.id === id) == null) {
        return [...currItems, { id, cnt: 1 }];
      } else {
        return currItems.map((value) => {
          if (value.id === id) {
            return { ...value, cnt: value.cnt + 1 };
          } else {
            return value;
          }
        });
      }
    });
  }

  function decreaseCardCnt(id: number) {
    setCardItems((currItems) => {
      if (currItems.find((value) => value.id === id)?.cnt === 1) {
        return currItems.filter((value) => value.id !== id);
      } else {
        return currItems.map((value) => {
          if (value.id === id) {
            return { ...value, cnt: value.cnt - 1 };
          } else {
            return value;
          }
        });
      }
    });
  }

  function removeFromCard(id: number) {
    setCardItems((currItems) => {
      return currItems.filter((value) => value.id !== id);
    });
  }

  function openCard() {
    setIsOpen(true);
  }
  function closeCard() {
    setIsOpen(false);
  }

  return (
    <Router>
      <Container fluid>
        <Navbar openCard={openCard} cardCnt={cardCnt} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/Store"
            element={
              <Store
                isLoading={isLoading}
                data={data}
                getItemCnt={getItemCnt}
                increaseCardCnt={increaseCardCnt}
                decreaseCardCnt={decreaseCardCnt}
                removeFromCard={removeFromCard}
              />
            }
          ></Route>
        </Routes>
        {!isLoading && (
          <ShoppingCard
            data={data}
            removeFromCard={removeFromCard}
            isOpen={isOpen}
            cardItems={cardItems}
            closeCard={closeCard}
          />
        )}
      </Container>
    </Router>
  );
}

export default App;

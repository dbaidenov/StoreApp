export interface CardItem {
  id: number;
  cnt: number;
}

export interface ShoppingCardType {
  openCard: () => void;
  closeCard: () => void;
  cardCnt: number;
  cardItems: CardItem[];
  getItemCnt: (id: number) => number;
  increaseCardCnt: (id: number) => void;
  decreaseCardCnt: (id: number) => void;
  removeFromCard: (id: number) => void;
}

import cardData from '../data/cards.json';

export const shuffleDeck = (cards) => {
  const deck = cards;
  deck.forEach((card, i) => {
    const randomizer = Math.floor(Math.random() * i);
    const temp = deck[i];
    deck[i] = deck[randomizer];
    deck[randomizer] = temp;
  });
  return deck;
};

export const buildDeck = () => {
  const { suits, cards } = cardData;
  const allCards = suits.map((suit) => {
    const cardsInSuit = cards.map((card) => {
      const cardName = Object.keys(card)[0];
      return {
        cardName,
        suit: Object.keys(suit)[0],
        value: Object.values(card)[0],
      };
    });
    return cardsInSuit;
  });
  return shuffleDeck(allCards.flat());
};

export const drawFromStock = () => {};

// export const checkPlayOptions = ({
//   fourWorkPileCards,
//   drawnStockCards,
//   nartsPiles,
// }) => {
//   // check if work pile cards can be added to nartsPiles

// };

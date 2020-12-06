import React, { useEffect, useState } from 'react';
import styles from '../styles/Play.module.css';
import HeartSVG from '../public/svgs/heart.svg';
import DiamondSVG from '../public/svgs/diamond.svg';
import ClubSVG from '../public/svgs/club.svg';
import SpadeSVG from '../public/svgs/spade.svg';
import { buildDeck } from '../helpers/deck';

const suitIconMap = {
  hearts: HeartSVG,
  diamonds: DiamondSVG,
  clubs: ClubSVG,
  spades: SpadeSVG,
};

export const Card = (card) => {
  const SuitIcon = suitIconMap[card.suit];
  return (
    <div className={styles.card} key={`${card.cardName}_of_${card.suit}`}>
      <div className={styles.upperLeft}>
        <span>{card.value}</span>
        <SuitIcon height="15" width="15" />
      </div>
      <SuitIcon className={styles.centerIcon} height="40" width="54" />
      <div className={styles.lowerRight}>
        <SuitIcon height="15" width="15" />
        <span>{card.value}</span>
      </div>
    </div>
  );
};

const PlayPage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(buildDeck());
  }, []);

  return (
    <div>
      {cards.length ? (
        <div className={styles.deck}>
          {cards.map((card) => {
            const SuitIcon = suitIconMap[card.suit];
            return (
              <div
                className={styles.card}
                key={`${card.cardName}_of_${card.suit}`}
              >
                <div className={styles.upperLeft}>
                  <span>{card.value}</span>
                  <SuitIcon height="15" width="15" />
                </div>
                <SuitIcon
                  className={styles.centerIcon}
                  height="40"
                  width="54"
                />
                <div className={styles.lowerRight}>
                  <SuitIcon height="15" width="15" />
                  <span>{card.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>loading!</p>
      )}
    </div>
  );
};

export default PlayPage;

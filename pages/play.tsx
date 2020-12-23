import React, { useEffect, useState } from 'react';
import Draggable, { DraggableEvent } from 'react-draggable';
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

export const Card = ({ card, i, faceDown, inPile, nartsPileBoundingBox }) => {
  const SuitIcon = suitIconMap[card.suit];
  return (
    <Draggable
      onStart={(e: DraggableEvent) => console.log('start', e)}
      onStop={(e: DraggableEvent) => {
        console.log('stop', e, nartsPileBoundingBox);
        if (
          e.pageX > nartsPileBoundingBox.left &&
          e.pageX < nartsPileBoundingBox.right &&
          e.pageY > nartsPileBoundingBox.top &&
          e.pageY < nartsPileBoundingBox.height + nartsPileBoundingBox.top
        ) {
          console.log('within box!!');
        }
      }}
    >
      <div
        className={`${styles.card} ${faceDown ? styles.faceDown : ''} ${
          inPile ? styles.inPile : ''
        }`}
        style={{ left: `${(i + 1) * 3}px` }}
      >
        {!faceDown && (
          <>
            <div className={styles.upperLeft}>
              <span>{card.value}</span>
              <SuitIcon height="15" width="15" />
            </div>
            <SuitIcon className={styles.centerIcon} height="40" width="54" />
            <div className={styles.lowerRight}>
              <SuitIcon height="15" width="15" />
              <span>{card.value}</span>
            </div>
          </>
        )}
      </div>
    </Draggable>
  );
};

const gameSetup = {
  nartsPile: 13,
  personalBoard: 4,
};

const PlayPage = () => {
  const [cards, setCards] = useState([]);
  const [nartsPiles, updateNartsPiles] = useState({});
  const [nartsPileBoundingBox, setNartsPileBoundingBox] = useState({});

  useEffect(() => {
    setCards(buildDeck());
  }, []);

  useEffect(() => {
    if (cards.length) {
      const nartsPileDiv = document.getElementById('narts-piles');
      setNartsPileBoundingBox(nartsPileDiv.getBoundingClientRect());
    }
  }, [cards]);

  const mutatedDeck = [...cards];
  const workPile = mutatedDeck.splice(0, 13);
  const personalBoardCards = mutatedDeck.splice(0, 4);
  const stockPile = mutatedDeck;
  console.log('deck now', mutatedDeck);

  return (
    <div>
      {!!cards.length ? (
        <>
          <div className="flex flex-wrap pt-5 px-4 relative w-full">
            <div id="narts-piles" className={styles.nartsPileArea}>
              {Object.entries(nartsPiles).map(([pileKey, pileCards = []]) => {
                return (
                  <div className={styles.nartsPileHolder}>
                    {pileCards.map((card, i) => {
                      return (
                        <Card
                          key={`${card.cardName}_of_${card.suit}`}
                          card={card}
                          i={i}
                          faceDown={false}
                          inPile={true}
                          nartsPileBoundingBox={nartsPileBoundingBox}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className={styles.nartsPile}>
              {workPile.map((card, i) => (
                <Card
                  key={`${card.cardName}_of_${card.suit}`}
                  card={card}
                  i={i}
                  faceDown={i !== 12}
                  inPile={true}
                  nartsPileBoundingBox={nartsPileBoundingBox}
                />
              ))}
            </div>
            <div className={styles.personalBoard}>
              {personalBoardCards.map((card, i) => (
                <Card
                  key={`${card.cardName}_of_${card.suit}`}
                  card={card}
                  i={i}
                  faceDown={false}
                  inPile={false}
                  nartsPileBoundingBox={nartsPileBoundingBox}
                />
              ))}
            </div>
          </div>
          <div className={styles.stockPile}>
            {stockPile.map((card, i) => (
              <Card
                key={`${card.cardName}_of_${card.suit}`}
                card={card}
                i={i}
                faceDown={true}
                inPile={true}
                nartsPileBoundingBox={nartsPileBoundingBox}
              />
            ))}
          </div>
        </>
      ) : (
        <p>loading!</p>
      )}
    </div>
  );
};

export default PlayPage;

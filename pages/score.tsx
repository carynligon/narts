import React, { useRef, useState } from 'react';

const colors = ['#fe9920', '#B9A44C', '#FA7921', '#566E3D', '#0C4767'];

const scoreBoard = () => {
  const [players, editPlayers] = useState({});
  const nameInputEl = useRef(null);
  const colorsToUse = [...colors];

  const handlePlayerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const colorIndex = Math.floor(Math.random() * colorsToUse.length);
    const colorToUse = colorsToUse[colorIndex];
    colorsToUse.splice(colorIndex, 1);
    editPlayers({
      ...players,
      [nameInputEl.current.value]: {
        scores: [],
        color: colorToUse,
      },
    });
    nameInputEl.current.value = '';
  };

  const handleScoreFormSubmit = (e: React.FormEvent, player) => {
    e.preventDefault();
    const newScore = e.target[0].value;
    const updatedPlayer = {
      ...players[player],
      scores: [...players[player].scores, Number(newScore)],
    };
    editPlayers({
      ...players,
      [player]: updatedPlayer,
    });
    e.target[0].value = '';
  };
  console.log('players', players);

  return (
    <div>
      <form onSubmit={handlePlayerFormSubmit}>
        <input
          ref={nameInputEl}
          name="player-name"
          type="text"
          placeholder="Player name"
        ></input>
        <button type="submit">add</button>
      </form>
      <div className="w-full h-screen">
        <div className="flex">
          {Object.keys(players).map((player) => {
            return (
              <div
                className="flex-1 p-8 text-white"
                key={player}
                style={{ backgroundColor: players[player].color }}
              >
                <h2>{player}</h2>
                {players[player].scores.map((score, i) => {
                  return <p key={`${player}-${score}-${i}}`}>{score}</p>;
                })}
                <h4>Total</h4>
                <p className="font-bold">
                  {players[player].scores.reduce((acc, val) => {
                    return acc + val;
                  }, 0)}
                </p>
                <form onSubmit={(e) => handleScoreFormSubmit(e, player)}>
                  <input
                    className="text-black"
                    type="number"
                    placeholder="score"
                  ></input>
                  <button type="submit">add</button>
                </form>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default scoreBoard;

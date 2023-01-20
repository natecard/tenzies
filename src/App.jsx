import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import Die from './Die';
import Hero from './Hero';

export default function App() {
  const [dice, setDice] = useState(newDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      console.log('You won!');
      setTenzies(true);
    }
  }, [dice]);

  function getNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function newDice() {
    const newDiceArr = Array(10)
      .fill(Math.ceil(Math.random() * 5) + 1)
      .flatMap(() => [getNewDie()]);
    return newDiceArr;
  }

  function holdDie(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld };
        }
        return die;
      })
    );
  }
  function rollDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id && die.isHeld ? die : getNewDie();
      })
    );
  }
  const diceElements = dice.map((die) => (
    <Die
      holdDie={() => holdDie(die.id)}
      value={die.value}
      id={die.id}
      key={die.id}
      isHeld={die.isHeld}
    />
  ));
  return (
    <main className="box-border flex items-center justify-center m-20 text-center bg-indigo-900 h-96 w-96">
      <div className="h-80 w-80 rounded-xl bg-slate-100">
        <Hero />
        <div className="grid grid-cols-5 gap-4 px-6 py-4 text-black ">
          {diceElements}
        </div>
        <button
          onClick={rollDice}
          className="w-24 px-5 py-2 text-white bg-indigo-600 rounded cursor-pointer ring-offset-4 ring-offset-slate-100 hover:ring-2"
        >
          Roll
        </button>
      </div>
    </main>
  );
}

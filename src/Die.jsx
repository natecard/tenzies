import React from 'react';
export default function Die(props) {
  return (
    <section onClick={props.holdDie}>
      <div
        className={
          'flex h-9 w-9 cursor-pointer justify-center rounded text-center ring-offset-2 ring-offset-indigo-700 drop-shadow-md hover:ring-2 ' +
          (props.isHeld ? 'bg-green-600' : 'bg-white')
        }
      >
        <h2 className="flex text-xl font-bold leading-relaxed text-black">
          {props.value}
        </h2>
      </div>
    </section>
  );
}

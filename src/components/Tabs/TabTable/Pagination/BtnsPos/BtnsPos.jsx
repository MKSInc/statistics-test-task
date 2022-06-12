import { useEffect, useState } from 'react';
import BtnPos from './BtnPos';

export default function BtnsPos({ posBtnsCount, position: curPos, setInputs, endPosition }) {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (!curPos) return;
    
    let startPos = curPos - (Math.floor(posBtnsCount / 2));

    if (startPos > endPosition - posBtnsCount) startPos = endPosition - posBtnsCount;
    if (startPos < 1) startPos = 1;

    setPositions([]);
    for (let i = startPos; i < startPos + posBtnsCount && i <= endPosition - 1; i += 1) {
      setPositions((prev) => [ ...prev, i]);
    }
  }, [curPos, endPosition, posBtnsCount]);

  return (
    <>
      {
        positions.map((position, index) =>
          <BtnPos key={index} position={position} curPos={curPos} setInputs={setInputs} />
        )
      }
    </>
  );
}

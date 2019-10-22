import { findPointOnCircle } from '@utils/crazyMathStuff';

const makeInsetBar = (size: number, sides: number, offset: number | string) => {
  if (typeof offset === 'number') offset = `${offset}px`;

  let insetBar = `polygon(0 0, calc(100% - ${offset} - ${size}px) 0,`;

  const half = sides / 2;
  for (let i = 0; i < half; i++) {
    const percent = i / half;
    const { x, y } = findPointOnCircle(size, Math.PI * percent);
    insetBar += `calc(100% - ${offset} - ${x}px) ${y}px,`;
  }

  insetBar += `calc(100% - ${offset} + ${size}px) 0,
                      100% 0, 100% 100%, 0 100%);`;

  return insetBar;
};

const circleInsetBar = makeInsetBar(36, 36, 48);

export { circleInsetBar };

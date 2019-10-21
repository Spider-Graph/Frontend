import { findPointOnCircleX, findPointOnCircleY } from '@utils/crazyMathStuff';

const makeBarInset = (size: number, sides: number, offset: string) => {
  const halfSides = sides / 2;

  let circleInsetBar = `polygon(0 0, calc(100% - ${offset} - ${size}px) 0,`;
  for (let i = 0; i < halfSides; i++) {
    const angel = i / halfSides;

    const x = findPointOnCircleX(size, Math.PI * angel);
    const y = findPointOnCircleY(size, Math.PI * angel);
    circleInsetBar += `calc(100% - ${offset} - ${x}px) ${y}px,`;
  }

  circleInsetBar += `calc(100% - ${offset} + ${size}px) 0,
                      100% 0, 100% 100%, 0 100%);`;

  return circleInsetBar;
};

const circleInsetBar = makeBarInset(38, 38, '48px');
const defaultImg = 'https://animalcenter.org/AdoptionPics/105484.jpg';

export { circleInsetBar, defaultImg };

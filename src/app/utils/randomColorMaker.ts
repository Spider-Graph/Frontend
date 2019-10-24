import seedrandom from 'seedrandom';
import { green, indigo, deepPurple, deepOrange, blueGrey } from '@material-ui/core/colors';

const convertHex = (hex: string, opacity: number) => {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};

const getRandomColor = (seed: string) => {
  const rng = seedrandom(seed);
  const randomNumber = Math.floor(rng() * 5);
  switch (randomNumber) {
    case 0:
      return convertHex(green['800'], 60);
    case 1:
      return convertHex(indigo['800'], 60);
    case 2:
      return convertHex(deepPurple['800'], 60);
    case 3:
      return convertHex(deepOrange['800'], 60);
    case 4:
      return convertHex(blueGrey['800'], 60);
  }
};
export { getRandomColor };

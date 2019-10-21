const findPointOnCircleX = (radius: number, angleRadians: number) =>
  radius * Math.cos(angleRadians);

const findPointOnCircleY = (radius: number, angleRadians: number) =>
  radius * Math.sin(angleRadians);

export { findPointOnCircleX, findPointOnCircleY };

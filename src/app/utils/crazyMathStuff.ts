const findPointOnCircle = (radius: number, angleRadians: number) => ({
  x: radius * Math.cos(angleRadians),
  y: radius * Math.sin(angleRadians),
});

export { findPointOnCircle };

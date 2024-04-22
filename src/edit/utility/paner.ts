import { Point } from "@gadaman-rm/iot-widgets/math"

export const paner = (mouseCoord: Point, initPan: Point) => ({
  x: mouseCoord.x - initPan.x,
  y: mouseCoord.y - initPan.y,
})

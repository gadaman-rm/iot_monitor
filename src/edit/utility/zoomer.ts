import { Point } from "@gadaco/iot-widgets/math"

export interface IZoomer {
  wheelDelta: number
  mouseCoord: Point
  initPan: Point
  initZoom: number
  minZoom?: number
  maxZoom?: number
}

export const zoomer = ({
  wheelDelta,
  mouseCoord,
  initPan,
  initZoom,
  minZoom = 0.5,
  maxZoom = 12,
}: IZoomer) => {
  let zoom = initZoom
  let pan = initPan
  if (wheelDelta > 0) zoom = initZoom * 1.2
  else zoom = initZoom / 1.2

  if (zoom >= minZoom && zoom <= maxZoom) {
    const dx = (mouseCoord.x - initPan.x) / initZoom
    const dy = (mouseCoord.y - initPan.y) / initZoom
    pan = { x: mouseCoord.x - dx * zoom, y: mouseCoord.y - dy * zoom }

    return { zoom, pan }
  }
}

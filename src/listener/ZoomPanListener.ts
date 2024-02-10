import { KeyShortcatListener, PanListener, ZoomListener } from "@gadaman-rm/iot-widgets/event"
import { zoomer } from "../utility/zoomer"
import { paner } from "../utility/paner"
import { Point, point } from "@gadaman-rm/iot-widgets/math"
import { SvgContainer } from "@gadaman-rm/iot-widgets"

export class ZoomPanListener {
    svgContainer: SvgContainer
    panListener: PanListener<{ clientX: number, clientY: number }>
    zoomListener: ZoomListener
    digit0keyListener: KeyShortcatListener
    #onZoomPan?: (zoom: number, pan: Point) => void
    constructor(
        svgContainer: SvgContainer,
        panListener: PanListener<{ clientX: number, clientY: number }>,
        zoomListener: ZoomListener,
        digit0keyListener: KeyShortcatListener
    ) {
        this.svgContainer = svgContainer
        this.panListener = panListener
        this.zoomListener = zoomListener
        this.digit0keyListener = digit0keyListener
        this.initHandler()
    }
    public set onZoomPan(fn: (zoom: number, pan: Point) => void) { this.#onZoomPan = fn }

    initHandler() {
        this.digit0keyListener.onKeyDown = (e) => { if (this.#onZoomPan && e.ctrlKey ) this.#onZoomPan(1, { x: 0, y: 0 }) }
        this.panListener.onPanStart = (e) => {
            const pan = this.svgContainer.pan
            e.param.initFn({ clientX: e.clientX - pan.x, clientY: e.clientY - pan.y })
        }
        this.panListener.onPanMove = (e) => {
            if (e.param?.init) {
                const initZoom = this.svgContainer.zoom
                if (this.#onZoomPan) this.#onZoomPan(initZoom, paner(point(e), point(e.param.init as any)))
            }
        }
        this.zoomListener.onZoom = (e) => {
            const mouseCoord = this.svgContainer.mouseCoordInContainerMatrix(e)
            const { pan: initPan, zoom: initZoom } = this.svgContainer
            if (e.ctrlKey) {
                e.preventDefault()
                const wheelDelta = ((e as any)?.wheelDelta ? (e as any).wheelDelta : -e.deltaY) as number
                const newZoom = zoomer({wheelDelta, mouseCoord, initPan, initZoom})
                if (newZoom && this.#onZoomPan) this.#onZoomPan(newZoom.zoom, newZoom.pan)
            }
        }
    }
}

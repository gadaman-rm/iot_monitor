import { KeyShortcatListener, PanListener, ZoomListener } from "@gadaman-rm/iot-widgets/event"
import { zoomer } from "../utility/zoomer"
import { paner } from "../utility/paner"
import { point } from "@gadaman-rm/iot-widgets/math"
import { SvgContainer } from "@gadaman-rm/iot-widgets"

export class ZoomPanListener {
    svgContainer: SvgContainer
    panListener: PanListener<{ clientX: number, clientY: number }>
    zoomListener: ZoomListener
    digit0keyListener: KeyShortcatListener
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

    initHandler() {
        this.digit0keyListener.onKeyDown = (e) => {
            if (e.ctrlKey) {
                this.svgContainer.zoom = 1
                this.svgContainer.pan = { x: 0, y: 0 }
            }
        }
        this.panListener.onPanStart = (e, initFn) => {
            const pan = this.svgContainer.pan
            initFn({ clientX: e.clientX - pan.x, clientY: e.clientY - pan.y })
        }
        this.panListener.onPanMove = (e, init) => {
            if (init) {
                this.svgContainer.pan = paner(point(e), point(init as any))
            }
        }
        this.zoomListener.onZoom = (e) => {
            const mouseCoord = this.svgContainer.mouseCoordInContainerMatrix(e)
            const { pan: initPan, zoom: initZoom } = this.svgContainer
            if (e.ctrlKey) {
                e.preventDefault()
                const wheelDelta = ((e as any)?.wheelDelta ? (e as any).wheelDelta : -e.deltaY) as number
                const newZoom = zoomer({wheelDelta, mouseCoord, initPan, initZoom})
                if(newZoom) {
                    this.svgContainer.zoom = newZoom.zoom
                    this.svgContainer.pan = newZoom.pan
                }
            }
        }
    }
}

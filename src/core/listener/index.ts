import { SvgContainer } from "@gadaman-rm/iot-widgets"
import { SelectListener } from "./SelectListener"
import { ZoomPanListener } from "./ZoomPanListener"
import { EditListener } from "./EditListener"

export class Listener {
    svgContainer: SvgContainer
    zoomPanListener: ZoomPanListener
    selectListener: SelectListener
    editListener: EditListener
    constructor(svgContainer: SvgContainer, zoomPanListener: ZoomPanListener, selectListener: SelectListener, editListener: EditListener) {
        this.svgContainer = svgContainer
        this.zoomPanListener = zoomPanListener
        this.selectListener = selectListener
        this.editListener = editListener
        this.initHandler()
    }

    initHandler() {
        this.zoomPanListener.onZoomPan = (zoom, pan) => {
            this.svgContainer.zoom = zoom
            this.svgContainer.pan = pan
        }
        this.selectListener.addListener('select-change', (e) => this.editListener.select(e))
    }
}
import { SvgContainer } from "@gadaman-rm/iot-widgets"
import { ZoomPanListener } from "../edit/listener/ZoomPanListener"
import { StorageListener } from "../edit/listener/StorageListener"

export class ViewListener {
    constructor(
        public svgContainer: SvgContainer,
        public zoomPanListener: ZoomPanListener,
        public storageListener: StorageListener
    ) { this.initHandler() }

    initHandler() {
        this.zoomPanListener.onZoomPan = (zoom, pan) => {
            this.svgContainer.zoom = zoom
            this.svgContainer.pan = pan
        }
        this.storageListener.addEventListener('storage-change', e => {
            if (e.isSaved) document.title = e.name
            else document.title = e.name + "*"
        })
    }
}

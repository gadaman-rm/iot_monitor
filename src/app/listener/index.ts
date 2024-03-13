import { SvgContainer } from "@gadaman-rm/iot-widgets"
import { SelectListener } from "./SelectListener"
import { ZoomPanListener } from "./ZoomPanListener"
import { EditListener } from "./EditListener"
import { ContextMenu } from "../components"
import { ShortcutListener } from "./ShortcutListener"
import { StorageListener } from "./StorageListener"

export class Listener {
    constructor(
        public contextMenu: ContextMenu,
        public svgContainer: SvgContainer,
        public shortcutListener: ShortcutListener,
        public zoomPanListener: ZoomPanListener,
        public selectListener: SelectListener,
        public editListener: EditListener,
        public storageListener: StorageListener
    ) { this.initHandler() }

    initHandler() {
        this.zoomPanListener.onZoomPan = (zoom, pan) => {
            this.svgContainer.zoom = zoom
            this.svgContainer.pan = pan
        }
        this.selectListener.addListener('select-change', (e) => this.editListener.select(e))
        this.storageListener.addEventListener('storage-change', e => {
            console.log(e);
            
            if (e.isSaved) document.title = e.name
            else document.title = e.name + "*"
        })
        this.editListener.addListener('modechange', e => { if(e === 'edit') this.storageListener.emitSaveChange(false) })
    }
}

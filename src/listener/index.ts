import { SelectListener } from "./SelectListener";
import { ZoomPanListener } from "./ZoomPanListener"

export class Listener {
    zoomPanListener: ZoomPanListener
    selectListener: SelectListener
    constructor(zoomPanListener: ZoomPanListener, selectListener: SelectListener) {
        this.zoomPanListener = zoomPanListener
        this.selectListener = selectListener
    }
}

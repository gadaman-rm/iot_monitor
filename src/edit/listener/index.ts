import { SvgContainer } from "@gadaco/iot-widgets"
import { SelectListener } from "./SelectListener"
import { ZoomPanListener } from "./ZoomPanListener"
import { EditListener } from "./EditListener"
import { ShortcutListener } from "./ShortcutListener"
import { StorageListener } from "./StorageListener"

export class Listener {
  constructor(
    public svgContainer: SvgContainer,
    public shortcutListener: ShortcutListener,
    public zoomPanListener: ZoomPanListener,
    public selectListener: SelectListener,
    public editListener: EditListener,
    public storageListener: StorageListener,
  ) {
    this.initHandler()
    this.editListener.addListener("toolchange", (e) => {
      if (e === "select") this.editListener.mode = "select"
      if (e === "mouse" && this.editListener.mode === "select")
        this.editListener.mode = "view"
    })
  }

  initHandler() {
    this.zoomPanListener.onZoomPan = (zoom, pan) => {
      this.svgContainer.zoom = zoom
      this.svgContainer.pan = pan
    }
    this.selectListener.addListener("select-change", (e) =>
      this.editListener.select(e),
    )
    this.storageListener.addEventListener("storage-change", (e) => {
      if (e.isSaved) document.title = e.name
      else document.title = e.name + "*"
    })
    this.editListener.addListener("modechange", (e) => {
      if (e === "edit") this.storageListener.emitSaveChange(false)
    })
  }
}

import { SvgContainer } from "@gadaco/iot-widgets"
import { SelectListener } from "./SelectListener"
import { ZoomPanListener } from "./ZoomPanListener"
import { EditListener } from "./EditListener"
import { ShortcutListener } from "./ShortcutListener"
import { StorageListener } from "./StorageListener"
import { MenuJson } from "@gadaco/iot-widgets/components"
import { MENU_JSON_DATA } from "../json-data/menuJsonData"

export class Listener {
  constructor(
    public menuJson: MenuJson,
    public svgContainer: SvgContainer,
    public shortcutListener: ShortcutListener,
    public zoomPanListener: ZoomPanListener,
    public selectListener: SelectListener,
    public editListener: EditListener,
    public storageListener: StorageListener,
  ) {
    this.initHandler()
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

    this.menuJson.items = MENU_JSON_DATA
    this.menuJson.addEventListener("menu-select", (e) => {
      switch (e.detail.id) {
        case "rise-top": {
          this.svgContainer.riseToTop()
          break
        }
        case "rise": {
          this.svgContainer.rise()
          break
        }
        case "lower": {
          this.svgContainer.lower()
          break
        }
        case "lower-bottom": {
          this.svgContainer.lowerToBottom()
          break
        }
        case "v-left": {
          this.svgContainer.vlerticalLeft()
          break
        }
        case "v-right": {
          this.svgContainer.vlerticalRight()
          break
        }
        case "v-center": {
          this.svgContainer.vlerticalCenter()
          break
        }
        case "v-distribute-center": {
          this.svgContainer.vlerticalDistributeCenter()
          break
        }
        case "h-top": {
          this.svgContainer.horizontalTop()
          break
        }
        case "h-bottom": {
          this.svgContainer.horizontalBottom()
          break
        }
        case "h-center": {
          this.svgContainer.horizontalCenter()
          break
        }
        case "h-distribute-center": {
          this.svgContainer.horizontalDistributeCenter()
          break
        }
      }
    })
  }
}

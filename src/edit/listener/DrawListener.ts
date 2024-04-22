import { EditBox, IWidgets, SvgContainer } from "@gadaman-rm/iot-widgets"
import { DragListener } from "@gadaman-rm/iot-widgets/event"
import { EditListener } from "./EditListener"
import { MoveDragInit, SelectListener } from "./SelectListener"
import { distancePointFromLine, point } from "@gadaman-rm/iot-widgets/math"
import { StorageListener } from "./StorageListener"

export class DrawListener {
  #drawWidget?: () => IWidgets | undefined | null
  #drawWidgetEditBox?: EditBox
  constructor(
    public svgContainer: SvgContainer,
    public editListener: EditListener,
    public selectListener: SelectListener,
    public dragListener: DragListener<MoveDragInit>,
    public storageListener: StorageListener,
  ) {
    this.initHandler()
  }

  public set drawWidget(fn: () => IWidgets | undefined | null) {
    this.#drawWidget = fn
  }

  initHandler() {
    this.dragListener.onDragStart = (e) => {
      if (
        this.editListener.mode === "draw" &&
        this.#drawWidget &&
        (e.target as HTMLElement).getAttribute("is") !== "i-sidebar"
      ) {
        this.selectListener.deSelectAll()
        const currentMouseCoord = this.svgContainer.mouseCoordInContainer(e)
        const drawWidget = this.#drawWidget()
        if (drawWidget) {
          e.param.initFn!({
            widget: drawWidget,
            x: currentMouseCoord.x,
            y: currentMouseCoord.y,
            clientX: currentMouseCoord.x,
            clientY: currentMouseCoord.y,
            active: true,
            isMoved: false,
          })
          drawWidget.x = currentMouseCoord.x
          drawWidget.y = currentMouseCoord.y
          drawWidget.width = 0
          drawWidget.height = 0

          this.svgContainer.addWidget(drawWidget)
          this.#drawWidgetEditBox = this.editListener.select(drawWidget)
        }
      }
    }
    this.dragListener.onDragMove = (e) => {
      const { init } = e.param
      if (init && init?.active) {
        const currentMouseCoord = this.svgContainer.mouseCoordInContainer(e)
        const tl = point(Number(init.widget.x), Number(init.widget.y))
        const bl = point(Number(init.widget.x), Number(init.widget.y) + 1)
        const tr = point(Number(init.widget.x) + 1, Number(init.widget.y))
        const width = distancePointFromLine(currentMouseCoord, tl, bl)
        const height = distancePointFromLine(currentMouseCoord, tr, tl)

        if (width > 0 && height > 0) {
          init.widget.width = width
          init.widget.height = height
          init.isMoved = true

          const editBox = this.#drawWidgetEditBox!
          editBox.width = width
          editBox.height = height
        }
      }
    }
    this.dragListener.onDragEnd = (e) => {
      let isWidgetRemoved = false
      if (
        e.param.init &&
        e.param.init.widget.width < 15 &&
        e.param.init.widget.height < 15
      ) {
        this.selectListener.deSelectAll()
        this.svgContainer.removeWidget(e.param.init.widget)
        isWidgetRemoved = true
      }
      if (e.param.init) e.param.initFn(null as any)
      if (e.param.init?.isMoved && !isWidgetRemoved)
        this.storageListener.emitSaveChange(false)
    }
  }
}

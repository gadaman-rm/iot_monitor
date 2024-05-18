import { EditBox, IWidgets, SvgContainer } from "@gadaco/iot-widgets"
import { DragListener } from "@gadaco/iot-widgets/event"
import { point } from "@gadaco/iot-widgets/math"
import { EditListener, Mode } from "./EditListener"
import EventEmitter from "eventemitter3"
import { ShortcutListener } from "./ShortcutListener"
import { StorageListener } from "./StorageListener"

export interface MoveDragInit {
  active: boolean
  isMoved: boolean
  widget: IWidgets
  x: number
  y: number
  clientX: number
  clientY: number
  mode: Mode
}

export type EmitterEventType = "select-change"

export class SelectListener {
  constructor(
    public svgContainer: SvgContainer,
    public shortcutListener: ShortcutListener,
    public editListener: EditListener,
    public dragListener: DragListener<MoveDragInit>,
    public eventEmitter: EventEmitter,
    public storageListener: StorageListener,
  ) {
    this.initHandler()
  }

  addListener(events: "select-change", fn: (mode: IWidgets) => void): void
  addListener(events: EmitterEventType, fn: (...args: any[]) => void) {
    this.eventEmitter.on(events, fn)
  }

  removeListener(events: "select-change", fn: (mode: IWidgets) => void): void
  removeListener(events: EmitterEventType, fn: (...args: any[]) => void) {
    this.eventEmitter.removeListener(events, fn)
  }

  removeAllListeners(events: EmitterEventType) {
    this.eventEmitter.removeAllListeners(events)
  }

  emittSelect(widget: IWidgets) {
    this.eventEmitter.emit("select-change" as EmitterEventType, widget)
  }

  initHandler() {
    this.shortcutListener.addEventListener("shortcut-press", (e) => {
      switch (e.type) {
        case "selecte-all":
          this.selectAll()
          break
        case "delete-selected":
          this.svgContainer.editBoxforWidgets.forEach((item) => {
            this.svgContainer.removeEditBox(item.editBox)
            this.svgContainer.removeWidget(item.widget)
          })
          break
      }
    })
    this.dragListener.onDragStart = (e) => {
      if (this.editListener.mode === "select") {
        const { initFn } = e.param
        const currentMouseCoord = this.svgContainer.mouseCoordInContainer(e)
        initFn!({
          clientX: currentMouseCoord.x,
          clientY: currentMouseCoord.y,
          active: true,
          mode: this.editListener.mode,
          widget: new EditBox(),
        } as any)
      } else if (this.editListener.mode !== "draw") {
        const widget = e.target as IWidgets
        const widgetType = widget.getAttribute("is")
        const widgetId = widget.getAttribute("id")
        if (widgetId && widgetId !== "app") {
          const { initFn } = e.param
          if (widgetType !== "g-editbox") {
            const currentMouseCoord = this.svgContainer.mouseCoordInContainer(e)
            initFn!({
              widget,
              x: widget.x,
              y: widget.y,
              clientX: currentMouseCoord.x,
              clientY: currentMouseCoord.y,
              active: true,
              isMoved: false,
              mode: this.editListener.mode,
            })
          }
        }
      }
    }
    this.dragListener.onDragMove = (e) => {
      const { init } = e.param
      if (init && init.active && init.mode === "select") {
        const currentMouseCoord = this.svgContainer.mouseCoordInContainer(e)
        const editBox = init.widget
        editBox.x = init.clientX
        editBox.y = init.clientY
        editBox.width = currentMouseCoord.x - init.clientX
        editBox.height = currentMouseCoord.y - init.clientY

        this.svgContainer.addWidget(editBox)
      } else if (init && init?.active && init.mode !== "draw") {
        const initMouseCoord = point(init.clientX, init.clientY)
        const currentMouseCoord = this.svgContainer.mouseCoordInContainer(e)

        const dx = initMouseCoord.x - init.x
        const dy = initMouseCoord.y - init.y
        const x = currentMouseCoord.x - dx
        const y = currentMouseCoord.y - dy

        init.widget.x = x
        init.widget.y = y
        init.isMoved = true
      }
    }
    this.dragListener.onDragEnd = (e) => {
      const { init } = e.param

      if (init && init.active && init.mode === "select") {
        const selects = this.svgContainer.widgetsInBox(
          { x: init.widget.x, y: init.widget.y },
          {
            x: init.widget.x + init.widget.width,
            y: init.widget.y + init.widget.height,
          },
        )
        this.svgContainer.removeWidget(init.widget)
        selects.forEach((item) => this.emittSelect(item))
        this.editListener.tool = "mouse"
        this.editListener.mode = "view"

        if (e.param.init) e.param.initFn(null as any)
      } else {
        const widgetId = (e.target as any).getAttribute("id")
        if (this.editListener.mode === "view") {
          if (!e.ctrlKey || widgetId === "app" || !widgetId) this.deSelectAll()
          if (e.param.init && e.param.init.widget)
            this.emittSelect(e.param.init.widget)
        }
        if (e.param.init) e.param.initFn(null as any)
        if (e.param.init?.isMoved) this.storageListener.emitSaveChange(false)
      }
    }
  }
  selectAll() {
    this.svgContainer.widgets.forEach((item) => this.emittSelect(item))
  }
  deSelectAll() {
    this.svgContainer.removeAllEditBox()
  }
}

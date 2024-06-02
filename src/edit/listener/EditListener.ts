import { EditBox, IWidgets, SvgContainer } from "@gadaco/iot-widgets"
import EventEmitter from "eventemitter3"
import { Tool, Toolbar, ToolbarControl } from "../components"
import { updatePlan } from "../../api/edit"
import { StorageListener } from "./StorageListener"
import { OK_SYM } from "../../api/utility"
import { MenuJson } from "@gadaco/iot-widgets/components"
import { MENU_JSON_DATA } from "../json-data/menuJsonData"

export type Mode = "edit" | "view" | "draw" | "select"
export type EmitterEventType = "modechange" | "toolchange"

export class EditListener {
  #mode!: Mode
  constructor(
    public menuJson: MenuJson,
    public svgContainer: SvgContainer,
    public eventEmitter: EventEmitter,
    public toolbar: Toolbar,
    public toolbarControl: ToolbarControl,
    public storageListener: StorageListener,
  ) {
    this.svgContainer = svgContainer
    this.init()
  }

  public set selectedSidebar(value: {
    tab: string | null | undefined
    size: number
  }) {
    this.menuJson.rightOffset = value.size
  }

  public get tool(): Tool {
    return this.toolbar.tool as any
  }
  public set tool(tool: Tool) {
    this.toolbar.tool = tool
  }

  addListener(events: "modechange", fn: (mode: Mode) => void): void
  addListener(events: "toolchange", fn: (mode: Tool) => void): void
  addListener(events: EmitterEventType, fn: (...args: any[]) => void) {
    this.eventEmitter.on(events, fn)
  }

  removeListener(events: "modechange", fn: (mode: Mode) => void): void
  removeListener(events: "toolchange", fn: (mode: Tool) => void): void
  removeListener(events: EmitterEventType, fn: (...args: any[]) => void) {
    this.eventEmitter.removeListener(events, fn)
  }

  removeAllListeners(events: EmitterEventType) {
    this.eventEmitter.removeAllListeners(events)
  }

  public set mode(mode: Mode) {
    if (this.#mode !== mode) {
      this.#mode = mode
      this.eventEmitter.emit("modechange" as EmitterEventType, mode)
    }
  }
  public get mode() {
    return this.#mode
  }

  init() {
    setTimeout(() => {
      this.toolbar.tool = "mouse"
      this.eventEmitter.emit("toolchange", this.toolbar.tool)
    }, 0)
    this.toolbar.addEventListener("toolbar-change", (e) => {
      this.eventEmitter.emit("toolchange", e.detail.type)
    })
    this.mode = "view"
    this.toolbarControl.addEventListener("toolbar-click", (e) => {
      switch (e.detail.type) {
        case "save": {
          const widgets = this.svgContainer.widgets.map((item) => {
            let attrs = {} as any
            for (const key of item.getAttributeNames())
              attrs[key] = item.getAttribute(key)!
            return attrs
          })
          updatePlan(this.storageListener.planeName, widgets).then((data) => {
            if (data[OK_SYM]) this.storageListener.emitSaveChange(true)
          })
          break
        }
        case "panel": {
          window.location.href = `/`
          break
        }
      }
    })

    this.menuJson.items = MENU_JSON_DATA
    this.menuJson.topOffset = 60
    this.menuJson.leftOffset = 60
    this.menuJson.rightOffset = 60

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
        case "center": {
          this.svgContainer.verticalCenter()
          this.svgContainer.horizontalCenter()
          break
        }
        case "v-left": {
          this.svgContainer.verticalLeft()
          break
        }
        case "v-right": {
          this.svgContainer.verticalRight()
          break
        }
        case "v-center": {
          this.svgContainer.verticalCenter()
          break
        }
        case "v-distribute-center": {
          this.svgContainer.verticalDistributeCenter()
          break
        }
        case "column-distribute": {
          this.svgContainer.columnDistribute()
          break
        }
        case "expand-width": {
          this.svgContainer.expandWidth()
          break
        }
        case "shrink-width": {
          this.svgContainer.shrinkWidth()
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
        case "row-distribute": {
          this.svgContainer.rowDistribute()
          break
        }
        case "expand-height": {
          this.svgContainer.expandHeight()
          break
        }
        case "shrink-height": {
          this.svgContainer.shrinkHeight()
          break
        }
      }
    })
  }

  select(selectedWidget: IWidgets | null) {
    if (
      selectedWidget &&
      !this.svgContainer.findEditBoxByWidgetId(selectedWidget)
    ) {
      const x = +selectedWidget.getAttribute("x")!
      const y = +selectedWidget.getAttribute("y")!
      const width = +selectedWidget.getAttribute("width")!
      const height = +selectedWidget.getAttribute("height")!
      const rotate = +selectedWidget.getAttribute("rotate")!
      const origin = selectedWidget.getAttribute("origin")!
      const ratio = selectedWidget.getAttribute("ratio")!

      const editBox = new EditBox(this.svgContainer)
      editBox.x = x
      editBox.y = y
      editBox.width = width
      editBox.height = height
      editBox.rotate = rotate
      editBox.origin = origin
      if (ratio) editBox.setAttribute("ratio", ratio)

      editBox.addEventListener("edit-start", () => {
        this.mode = "edit"
      })

      editBox.addEventListener("edit", (e) => {
        const otherEditBoxs = this.svgContainer.editBoxforWidgets.filter(
          (item) => item.editBox.id !== editBox.id,
        )
        switch (e.detail.type) {
          case "move":
            otherEditBoxs.map((item) => {
              const x = item.widget.x + (e.detail.x - selectedWidget.x)
              const y = item.widget.y + (e.detail.y - selectedWidget.y)
              item.widget.x = x
              item.widget.y = y
              item.editBox.x = x
              item.editBox.y = y
              return item
            })
            break
          case "rotate":
            otherEditBoxs.map((item) => {
              item.editBox.rotate = e.detail.rotate
              item.widget.rotate = e.detail.rotate
              return item
            })
            break

          case "rmid-resize":
            otherEditBoxs.map((item) => {
              item.editBox.width = e.detail.width
              item.widget.width = e.detail.width
              return item
            })
            break
          case "bmid-resize":
            otherEditBoxs.map((item) => {
              item.editBox.height = e.detail.height
              item.widget.height = e.detail.height
              return item
            })
            break

          case "br-resize":
            otherEditBoxs.map((item) => {
              item.editBox.width = e.detail.width
              item.widget.width = e.detail.width
              return item
            })
            break
        }

        selectedWidget.width = e.detail.width
        selectedWidget.height = e.detail.height
        selectedWidget.rotate = e.detail.rotate
        selectedWidget.origin = e.detail.origin
        selectedWidget.x = e.detail.x
        selectedWidget.y = e.detail.y
      })
      editBox.addEventListener("edit-end", () => {
        setTimeout(() => {
          this.mode = "view"
        }, 0)
      })
      this.svgContainer.addEditBox(selectedWidget, editBox)
      return editBox
    }
  }
}

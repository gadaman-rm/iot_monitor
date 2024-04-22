import { SvgContainer, isToWidgets } from "@gadaman-rm/iot-widgets"
import { GetPlanJsonWidget, getPlan } from "../../api/edit"
import { OK_SYM } from "../../api/utility"
import EventEmitter from "eventemitter3"

export type StorageEvent = {
  name: string
  type: "change-storage"
  isSaved: boolean
}

export class StorageListener {
  planeName = ""
  constructor(
    public svgContainer: SvgContainer,
    public eventEmitter: EventEmitter,
  ) {
    getPlan()
      .then((data) => {
        if (data[OK_SYM]) {
          const jsonWidgets = JSON.parse(
            data.body!.widgets,
          ) as GetPlanJsonWidget[]
          if ((jsonWidgets as any) !== "[]") {
            jsonWidgets.map((item) => {
              const { is, ...attrs } = item
              const newWidget = isToWidgets(is as any)
              if (newWidget) {
                for (const [key, value] of Object.entries(attrs))
                  newWidget.setAttribute(key, value as any)
                this.svgContainer.addWidget(newWidget)
              }
            })
          }
          this.planeName = data.body!.name
          this.emitSaveChange(true)
        }
      })
      .catch((_e) => {})
  }

  emitSaveChange(isSaved: boolean) {
    this.eventEmitter.emit("storage-change", {
      type: "change-storage",
      name: this.planeName,
      isSaved,
    })
  }
  addEventListener<K extends keyof CustomEventMap>(
    type: K,
    fn: (e: CustomEventMap[K]) => void,
  ) {
    this.eventEmitter.on(type, fn)
  }
  removeEventListener<K extends keyof CustomEventMap>(
    type: K,
    fn: (e: CustomEventMap[K]) => void,
  ) {
    this.eventEmitter.removeListener(type, fn)
  }
}

interface CustomEventMap {
  "storage-change": StorageEvent
}

import { EditBox, IWidgets, SvgContainer } from "@gadaman-rm/iot-widgets"
import "@gadaman-rm/iot-widgets/components"

import { Toolbar } from "../edit/components"
import { ViewListener } from "./ViewListener"

export type IWidgetEditBox = { id: string; editBox: EditBox }

export class View {
  widgetEditBox: IWidgetEditBox[]
  constructor(
    private appRef: HTMLDivElement,
    public svgContainer: SvgContainer,
    public toolbar: Toolbar,
    public viewListener: ViewListener,
    public widgets: IWidgets[] = [],
  ) {
    this.appRef.appendChild(this.svgContainer)
    toolbar.style.setProperty("--g-toolbar-height", "60px")
    this.appRef.appendChild(toolbar)
    this.widgetEditBox = []
    widgets.forEach((widget) => this.svgContainer.addWidget(widget))
    this.toolbar.addEventListener("toolbar-click", (e) => {
      if (e.detail.type === "panel") window.location.href = `/`
    })
  }

  push(widget: IWidgets) {
    this.svgContainer.addWidget(widget)
  }
}

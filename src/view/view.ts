import { EditBox, IWidgets, SvgContainer } from "@gadaco/iot-widgets"
import "@gadaco/iot-widgets/components"

import { ToolbarControl } from "../edit/components"
import { ViewListener } from "./ViewListener"

export type IWidgetEditBox = { id: string; editBox: EditBox }

export class View {
  widgetEditBox: IWidgetEditBox[]
  constructor(
    private appRef: HTMLDivElement,
    public svgContainer: SvgContainer,
    public toolbarControl: ToolbarControl,
    public viewListener: ViewListener,
    public widgets: IWidgets[] = [],
  ) {
    this.appRef.appendChild(this.svgContainer)
    toolbarControl.style.setProperty("--g-toolbar-height", "60px")
    this.appRef.appendChild(toolbarControl)
    this.widgetEditBox = []
    widgets.forEach((widget) => this.svgContainer.addWidget(widget))
    this.toolbarControl.addEventListener("toolbar-click", (e) => {
      if (e.detail.type === "panel") window.location.href = `/`
    })
  }

  push(widget: IWidgets) {
    this.svgContainer.addWidget(widget)
  }
}

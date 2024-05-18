import { EditBox, IWidgets, SvgContainer } from "@gadaco/iot-widgets"
import "@gadaco/iot-widgets/components"
import { Listener } from "./listener"
import { Sidebar, Toolbar, ToolbarControl } from "./components"
import { MenuJson } from "@gadaco/iot-widgets/components"

export type IWidgetEditBox = { id: string; editBox: EditBox }

export class App {
  widgetEditBox: IWidgetEditBox[]
  constructor(
    private appRef: HTMLDivElement,
    public menuJson: MenuJson,
    public svgContainer: SvgContainer,
    public sidebar: Sidebar,
    public toolbar: Toolbar,
    public toolbarControl: ToolbarControl,
    public listener: Listener,
    public widgets: IWidgets[] = [],
  ) {
    this.appRef.appendChild(this.menuJson)
    this.appRef.appendChild(this.svgContainer)

    this.appRef.appendChild(toolbar)
    this.appRef.appendChild(toolbarControl)

    sidebar.style.setProperty("--g-sidebar-margin-start", "60px")
    this.appRef.appendChild(sidebar)
    this.widgetEditBox = []
    widgets.forEach((widget) => this.svgContainer.addWidget(widget))
  }

  push(widget: IWidgets) {
    this.svgContainer.addWidget(widget)
  }
}

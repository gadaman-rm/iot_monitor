import { EditBox, IWidgets, SvgContainer } from "@gadaman-rm/iot-widgets"
import "@gadaman-rm/iot-widgets/components"
import { Listener } from "./listener"
import { ContextMenu, Sidebar } from "./components"

export type IWidgetEditBox = { id: string, editBox: EditBox }

export class App {
    widgetEditBox: IWidgetEditBox[]
    constructor(
        private appRef: HTMLDivElement,
        public contextMenu: ContextMenu,
        public svgContainer: SvgContainer,
        public sidebar: Sidebar,
        public listener: Listener,
        public widgets: IWidgets[] = []
    ) {
        this.appRef.appendChild(this.contextMenu)
        this.appRef.appendChild(this.svgContainer)
        this.appRef.appendChild(sidebar)
        this.widgetEditBox = []
        widgets.forEach(widget => this.svgContainer.addWidget(widget))  
    }

    push(widget: IWidgets) { this.svgContainer.addWidget(widget) }
}

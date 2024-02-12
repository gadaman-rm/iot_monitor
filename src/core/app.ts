import { EditBox, IWidgets, SvgContainer } from "@gadaman-rm/iot-widgets"
import { Listener } from "./listener"

export type IWidgetEditBox = { id: string, editBox: EditBox }

export class App {
    widgetEditBox: IWidgetEditBox[]
    constructor(private appRef: HTMLDivElement, public svgContainer: SvgContainer, public listener: Listener,  public widgets: IWidgets[] = []) {
        this.appRef.appendChild(this.svgContainer)
        this.widgetEditBox = []
        widgets.forEach(widget => this.svgContainer.addWidget(widget))
    }

    push(widget: IWidgets) { this.svgContainer.addWidget(widget) }
}

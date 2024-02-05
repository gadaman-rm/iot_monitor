import { EditBox, SvgContainer, IWidgets } from "@gadaman-rm/iot-widgets"
import { Listener } from "./listener"

export class App {
    appRef: HTMLDivElement
    svgContainer: SvgContainer
    widgetEditBox: { id: string, editBox: EditBox }[]
    listener: Listener
    constructor(appRef: HTMLDivElement, svgContainer: SvgContainer, listener: Listener,  widgets: IWidgets[] = []) {
        this.appRef = appRef
        this.svgContainer = svgContainer
        this.appRef.appendChild(this.svgContainer)
        this.widgetEditBox = []
        widgets.forEach(widget => this.svgContainer.addWidget(widget))
        this.listener = listener
    }

    push(widget: IWidgets) { this.svgContainer.addWidget(widget) }
}

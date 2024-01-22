import { Slider, Gauge, EditBox } from "iot-widgets";
import { randomId } from "iot-widgets/math";

type IWidgets = Slider & Gauge

export class Store {
    app: HTMLDivElement
    widgetEditBox: { id: string, editBox: EditBox }[] 
    constructor(app: HTMLDivElement, widgets: IWidgets[] = []) {
        this.app = app
        this.widgetEditBox = []
        widgets.forEach(widget => this.app.appendChild(widget))
        app.addEventListener('click' , this.handleClick)
    }
    handleClick = (e: MouseEvent) => {
        this.attachEditBox(e.target as any)
    }
    push(widget: IWidgets) {
        this.app.appendChild(widget)
    }
    attachEditBox(widget: HTMLElement) {
        const widgetId = widget.getAttribute('id')
        const widgetType = widget.getAttribute('is')

        // Add EditBox to Widget!
        if (widgetId && widgetId !== 'app' && widgetType !== 'my-editbox') {
            if (!this.widgetEditBox.find(item => item.id == widgetId)) {
                const x = +widget.getAttribute('x')!
                const y = +widget.getAttribute('y')!
                const width = +widget.getAttribute('width')!
                const height = +widget.getAttribute('height')!
                const rotate = +widget.getAttribute('rotate')!
                const origin = widget.getAttribute('origin')!

                const editBox = new EditBox(randomId(), width, height, x, y, rotate, origin)
                this.widgetEditBox.push({ id: widgetId, editBox })
                editBox.onEdit = (e) => {
                    widget.setAttribute('width', e.width.toString())
                    widget.setAttribute('height', e.height.toString())
                    widget.setAttribute('rotate', e.rotate.toString())
                    widget.setAttribute('origin', e.originStr)
                    widget.setAttribute('x', e.x.toString())
                    widget.setAttribute('y', e.y.toString())
                }
                this.app.appendChild(editBox)
            }
        }

        // Remove EditBoxs
        if(widgetId === 'app') {
            this.widgetEditBox.forEach(item => item.editBox.remove())
            this.widgetEditBox = []
        }
    }
}
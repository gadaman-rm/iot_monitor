import { EditBox, SvgContainer } from "@gadaman-rm/iot-widgets"
import { randomId } from "@gadaman-rm/iot-widgets/math"

export class SelectListener {
    svgContainer: SvgContainer
    constructor(svgContainer: SvgContainer) {
        this.svgContainer = svgContainer
        document.addEventListener('click', this.handleClick)
    }

    handleClick = (e: MouseEvent) => {
        this.attachEditBox(e.target as any)
    }
    attachEditBox(widget: HTMLElement) {
        const widgetId = widget.getAttribute('id')
        const widgetType = widget.getAttribute('is')

        // Add EditBox to Widget!
        if (widgetId && widgetId !== 'app' && widgetType !== 'g-editbox') {
            if (!this.svgContainer.findWidgetEditBox(widget as any)) {
                const x = +widget.getAttribute('x')!
                const y = +widget.getAttribute('y')!
                const width = +widget.getAttribute('width')!
                const height = +widget.getAttribute('height')!
                const rotate = +widget.getAttribute('rotate')!
                const origin = widget.getAttribute('origin')!

                const editBox = new EditBox(randomId(), this.svgContainer as any, width, height, x, y, rotate, origin)
                editBox.onEdit = (e) => {
                    widget.setAttribute('width', e.width.toString())
                    widget.setAttribute('height', e.height.toString())
                    widget.setAttribute('rotate', e.rotate.toString())
                    widget.setAttribute('origin', e.originStr)
                    widget.setAttribute('x', e.x.toString())
                    widget.setAttribute('y', e.y.toString())
                }
                this.svgContainer.addWidgetEditBox(widget as any, editBox)
            }
        }

        // Remove EditBoxs
        if (widgetId === 'app' || !widgetId) { this.svgContainer.removeWidgetEditBoxs() }
    }
}

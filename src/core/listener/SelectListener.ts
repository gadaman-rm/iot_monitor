import { IWidgets, SvgContainer } from "@gadaman-rm/iot-widgets"
import { DragListener } from "@gadaman-rm/iot-widgets/event"
import { point } from "@gadaman-rm/iot-widgets/math"

export interface MoveDragInit {
    active: boolean
    widget: IWidgets
    x: number
    y: number
    clientX: number
    clientY: number
}

export class SelectListener {
    svgContainer: SvgContainer
    dragListener: DragListener<MoveDragInit>
    #onSelect?: (widget: IWidgets | null, deselect: boolean) => void
    constructor(svgContainer: SvgContainer, dragListener: DragListener<MoveDragInit>) {
        this.svgContainer = svgContainer
        this.dragListener = dragListener
        this.initHandler()
    }
    public set onSelect(fn: (widget: IWidgets | null, deselect: boolean) => void) { this.#onSelect = fn }
    emittSelect(widget: IWidgets | null, deselect: boolean) { if (this.#onSelect) this.#onSelect(widget, deselect) }

    initHandler() {
        this.dragListener.onDragStart = (e) => {
            const widget = e.target as IWidgets
            const widgetType = widget.getAttribute('is')
            const widgetId = widget.getAttribute('id')
            if (widgetId && widgetId !== 'app') {
                const { initFn } = e.param
                if (widgetType !== 'g-editbox') {
                    if (!e.ctrlKey) this.emittSelect(null, true)
                    const currentMouseCoord = this.svgContainer.mouseCoordInContainer(e)
                    initFn!({ widget, x: widget.x, y: widget.y, clientX: currentMouseCoord.x, clientY: currentMouseCoord.y, active: true })
                }
            }
        }
        this.dragListener.onDragMove = (e) => {
            const { init } = e.param
            if (init && init?.active) {
                const initMouseCoord = point(init.clientX, init.clientY)
                const currentMouseCoord = this.svgContainer.mouseCoordInContainer(e)

                const dx = initMouseCoord.x - init.x
                const dy = initMouseCoord.y - init.y
                const x = currentMouseCoord.x - dx
                const y = currentMouseCoord.y - dy

                init.widget.x = x
                init.widget.y = y
            }
        }
        this.dragListener.onDragEnd = (e) => {
            if (e.param.init && e.param.init.widget) this.emittSelect(e.param.init.widget, !e.ctrlKey)
            const widgetId = (e.target as any).getAttribute('id')
            if (widgetId === 'app' || !widgetId) this.emittSelect(null, true)
            if (e.param.init) e.param.initFn(null as any)
        }
    }
    selectAll() { this.svgContainer.widgets.forEach(item => this.emittSelect(item, false)) }
    deSelectAll() { this.svgContainer.removeWidgetEditBoxs() }
}

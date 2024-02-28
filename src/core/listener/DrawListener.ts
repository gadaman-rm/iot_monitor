import { EditBox, Gauge, IWidgets, SvgContainer } from "@gadaman-rm/iot-widgets"
import { DragListener } from "@gadaman-rm/iot-widgets/event"
import { EditListener } from "./EditListener"
import { MoveDragInit, SelectListener } from "./SelectListener"
import { distancePointFromLine, point } from "@gadaman-rm/iot-widgets/math"

export class DrawListener {
    svgContainer: SvgContainer
    dragListener: DragListener<MoveDragInit>
    #drawWidget?: IWidgets
    #drawWidgetEditBox?: EditBox
    constructor(svgContainer: SvgContainer, public editListener: EditListener, public selectListener: SelectListener, dragListener: DragListener<MoveDragInit>) {
        this.svgContainer = svgContainer
        this.dragListener = dragListener
        this.initHandler()
    }

    public set drawWidget(_widget: IWidgets) { this.#drawWidget = new Gauge() }
    newDraw() { this.#drawWidget = new Gauge()}

    initHandler() {
        this.dragListener.onDragStart = (e) => {
            if (this.editListener.mode === 'draw' && this.#drawWidget && (e.target as HTMLElement).getAttribute('is') !== 'i-sidebar') {
                this.selectListener.deSelectAll()
                
                const currentMouseCoord = this.svgContainer.mouseCoordInContainer(e)
                e.param.initFn!({ widget: this.#drawWidget, x: currentMouseCoord.x, y: currentMouseCoord.y, clientX: currentMouseCoord.x, clientY: currentMouseCoord.y, active: true })
                this.#drawWidget.x = currentMouseCoord.x
                this.#drawWidget.y = currentMouseCoord.y
                this.#drawWidget.width = 0
                this.#drawWidget.height = 0
                
                this.svgContainer.addWidget(this.#drawWidget)
                this.#drawWidgetEditBox = this.editListener.select(this.#drawWidget)
            }
        }
        this.dragListener.onDragMove = (e) => {
            const { init } = e.param
            if (init && init?.active) {
                const currentMouseCoord = this.svgContainer.mouseCoordInContainer(e)
                const tl = point(Number(init.widget.x), Number(init.widget.y))
                const bl = point(Number(init.widget.x), Number(init.widget.y) + 1)
                const tr = point(Number(init.widget.x) + 1, Number(init.widget.y))
                const width = distancePointFromLine(currentMouseCoord, tl, bl)
                const height = distancePointFromLine(currentMouseCoord, tr, tl)

                if (width > 0 && height > 0) {
                    init.widget.width = width
                    init.widget.height = height

                    const editBox = this.#drawWidgetEditBox!
                    editBox.width = width
                    editBox.height = height
                }
            }
        }
        this.dragListener.onDragEnd = (e) => {
            this.newDraw()
            if (e.param.init) e.param.initFn(null as any)
        }
    }
}

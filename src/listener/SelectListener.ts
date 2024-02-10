import { IWidgets } from "@gadaman-rm/iot-widgets"
import { DragListener, DragMouseEvent } from "@gadaman-rm/iot-widgets/event"

export interface MoveDragInit {
    active: boolean
    widget: IWidgets
    x: number
    y: number
    clientX: number
    clientY: number
}

export class SelectListener {
    dragListener: DragListener<MoveDragInit>
    #onSelect?: (widget: IWidgets | null, deselect: boolean) => void
    #onDragStart?: (e: DragMouseEvent<MoveDragInit>) => void
    #onDrag?: (e: DragMouseEvent<MoveDragInit>) => void
    #onDragEnd?: (e: DragMouseEvent<MoveDragInit>) => void
    constructor(dragListener: DragListener<MoveDragInit>) { 
        this.dragListener = dragListener
        this.initHandler()
    }
    public set onSelect(fn: (widget: IWidgets | null, deselect: boolean) => void) { this.#onSelect = fn }
    public set onDragStart(fn: (e: DragMouseEvent<MoveDragInit>) => void) { this.#onDragStart = fn }
    public set onDrag(fn: (e: DragMouseEvent<MoveDragInit>) => void) { this.#onDrag = fn }
    public set onDragEnd(fn: (e: DragMouseEvent<MoveDragInit>) => void) { this.#onDragEnd = fn }

    initHandler() {
        this.dragListener.onDragStart = (e) => {
            const widget = e.target as IWidgets
            const widgetId = widget.getAttribute('id')
            if (this.#onDragStart && widgetId && widgetId !== 'app') this.#onDragStart(e)
        }
        this.dragListener.onDragMove = (e) => { if (this.#onDrag) this.#onDrag(e) }
        this.dragListener.onDragEnd = (e) => {
            const widgetId = (e.target as any).getAttribute('id')
            if (this.#onDragEnd) this.#onDragEnd(e)
            if(e.param.init && e.param.init.widget && this.#onSelect) this.#onSelect(e.param.init.widget, !e.ctrlKey)
            if (this.#onSelect && (widgetId === 'app' || !widgetId)) this.#onSelect(null, true)
        }
    }
    onSelectEmitt(widget: IWidgets | null, deselect: boolean) { if(this.#onSelect) this.#onSelect(widget, deselect) }
}

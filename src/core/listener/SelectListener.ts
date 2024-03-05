import { IWidgets, SvgContainer } from "@gadaman-rm/iot-widgets"
import { DragListener } from "@gadaman-rm/iot-widgets/event"
import { point } from "@gadaman-rm/iot-widgets/math"
import { EditListener } from "./EditListener"
import EventEmitter from "eventemitter3"

export interface MoveDragInit {
    active: boolean
    widget: IWidgets
    x: number
    y: number
    clientX: number
    clientY: number
}

export type EmitterEventType = 'select-change'

export class SelectListener {
    svgContainer: SvgContainer
    dragListener: DragListener<MoveDragInit>
    constructor(svgContainer: SvgContainer, public editListener: EditListener, dragListener: DragListener<MoveDragInit>, public eventEmitter: EventEmitter) {
        this.svgContainer = svgContainer
        this.dragListener = dragListener
        this.initHandler()
    }

    addListener(events: 'select-change', fn: (mode: IWidgets) => void): void
    addListener(events: EmitterEventType, fn: (...args: any[]) => void) { this.eventEmitter.on(events, fn) }

    removeListener(events: 'select-change', fn: (mode: IWidgets) => void): void
    removeListener(events: EmitterEventType, fn: (...args: any[]) => void) { this.eventEmitter.removeListener(events, fn) }

    removeAllListeners(events: EmitterEventType) { this.eventEmitter.removeAllListeners(events) }

    emittSelect(widget: IWidgets) { this.eventEmitter.emit('select-change' as EmitterEventType, widget) }

    initHandler() {
        this.dragListener.onDragStart = (e) => {
            if (this.editListener.mode !== 'draw') {
                const widget = e.target as IWidgets
                const widgetType = widget.getAttribute('is')
                const widgetId = widget.getAttribute('id')
                if (widgetId && widgetId !== 'app') {
                    const { initFn } = e.param
                    if (widgetType !== 'g-editbox') {
                        const currentMouseCoord = this.svgContainer.mouseCoordInContainer(e)
                        initFn!({ widget, x: widget.x, y: widget.y, clientX: currentMouseCoord.x, clientY: currentMouseCoord.y, active: true })
                    }
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
            const widgetId = (e.target as any).getAttribute('id')
            if(this.editListener.mode === 'view') {
                if(!e.ctrlKey || (widgetId === 'app' || !widgetId)) this.deSelectAll()
                if (e.param.init && e.param.init.widget) this.emittSelect(e.param.init.widget)
            }
            if (e.param.init) e.param.initFn(null as any)
        }
    }
    selectAll() { this.svgContainer.widgets.forEach(item => this.emittSelect(item)) }
    deSelectAll() { this.svgContainer.removeWidgetEditBox() }
}

import { EditBox, IWidgets, SvgContainer } from "@gadaman-rm/iot-widgets"
import { SelectListener } from "./SelectListener"
import { ZoomPanListener } from "./ZoomPanListener"
import { point, randomId } from "@gadaman-rm/iot-widgets/math"

export class Listener {
    zoomPanListener: ZoomPanListener
    selectListener: SelectListener
    svgContainer: SvgContainer
    mode: 'edit' | 'view'
    constructor(svgContainer: SvgContainer, zoomPanListener: ZoomPanListener, selectListener: SelectListener) {
        this.mode = 'view'
        this.svgContainer = svgContainer
        this.zoomPanListener = zoomPanListener
        this.selectListener = selectListener
        this.initHandler()
    }

    initHandler() {
        this.zoomPanListener.onZoomPan = (zoom, pan) => {
            this.svgContainer.zoom = zoom
            this.svgContainer.pan = pan
        }
        this.selectListener.onSelect = (widget, deselect) => {
            if(this.mode === 'view') {
                if (!deselect) {
                    this.select(widget)
                } else {
                    this.deSelectAll()
                    this.select(widget)
                }
            }
        }

        this.selectListener.onDragStart = (e) => {
            const { initFn } = e.param
            const widget = e.target as IWidgets
            const widgetType = widget.getAttribute('is')
            if (widgetType !== 'g-editbox') {
                if(!e.ctrlKey) this.deSelectAll()
                const currentMouseCoord = this.svgContainer.mouseCoordInContainer(e)
                initFn!({ widget, x: widget.x, y: widget.y, clientX: currentMouseCoord.x, clientY: currentMouseCoord.y, active: true })
            }
        }
        this.selectListener.onDrag = (e) => { 
            const { init } = e.param
            if(init && init?.active) {
                const { widget } = init
                const initMouseCoord = point(init.clientX, init.clientY)
                const currentMouseCoord = this.svgContainer.mouseCoordInContainer(e)

                const dx = initMouseCoord.x - init.x
                const dy = initMouseCoord.y - init.y
                const x = currentMouseCoord.x - dx
                const y = currentMouseCoord.y - dy

                widget.x = x
                widget.y = y
            }
        }
        this.selectListener.onDragEnd = (e) => { if(e.param.init) e.param.initFn({ ...e.param.init, active: false }) }
    }

    select(widget: IWidgets | null) {
        if (widget && !this.svgContainer.findWidgetEditBox(widget)) {
            const x = +widget.getAttribute('x')!
            const y = +widget.getAttribute('y')!
            const width = +widget.getAttribute('width')!
            const height = +widget.getAttribute('height')!
            const rotate = +widget.getAttribute('rotate')!
            const origin = widget.getAttribute('origin')!

            const editBox = new EditBox(randomId(), this.svgContainer, width, height, x, y, rotate, origin)
            editBox.onEditStart = () => { this.mode = 'edit' }
            editBox.onEdit = (e) => {
                widget.setAttribute('width', e.width.toString())
                widget.setAttribute('height', e.height.toString())
                widget.setAttribute('rotate', e.rotate.toString())
                widget.setAttribute('origin', e.originStr)
                widget.setAttribute('x', e.x.toString())
                widget.setAttribute('y', e.y.toString())
            }
            editBox.onEditEnd = () => { setTimeout(() => { this.mode = 'view'}, 0) }
            this.svgContainer.addWidgetEditBox(widget, editBox)
        }
    }
    selectAll() { this.svgContainer.widgets.forEach(item => this.selectListener.onSelectEmitt(item, false)) }
    deSelectAll() { this.svgContainer.removeWidgetEditBoxs() }
}

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

    select(selectedWidget: IWidgets | null) {
        if (selectedWidget && !this.svgContainer.findWidgetEditBox(selectedWidget)) {
            const x = +selectedWidget.getAttribute('x')!
            const y = +selectedWidget.getAttribute('y')!
            const width = +selectedWidget.getAttribute('width')!
            const height = +selectedWidget.getAttribute('height')!
            const rotate = +selectedWidget.getAttribute('rotate')!
            const origin = selectedWidget.getAttribute('origin')!

            const editBox = new EditBox(randomId(), this.svgContainer, width, height, x, y, rotate, origin)
            editBox.onEditStart = () => { this.mode = 'edit' }
            editBox.onEdit = (e) => {
                const otherEditBoxs = this.svgContainer.editBoxforWidgets.filter(item => item.editBox.id !== editBox.id)

                switch (e.type) {
                    case "move":
                        otherEditBoxs.map((item) => {
                            const x = item.widget.x + (e.x - selectedWidget.x)
                            const y = item.widget.y + (e.y - selectedWidget.y)
                            item.widget.x = x
                            item.widget.y = y
                            item.editBox.x = x
                            item.editBox.y = y
                            return item
                        })
                        break
                    case "rotate":
                        otherEditBoxs.map((item) => {
                            item.editBox.rotate = e.rotate
                            item.widget.rotate = e.rotate
                            return item
                        })
                        break
                    // case "rmid-resize":
                    //     otherEditBoxs.map((item) => {
                    //         item.editBox.width = e.width
                    //         item.widget.width = e.width

                    //         // const x = item.widget.x + (e.x - selectedWidget.x)
                    //         // const y = item.widget.y + (e.y - selectedWidget.y)
                    //         // item.widget.x = x
                    //         // item.widget.y = y
                    //         // item.editBox.x = x
                    //         // item.editBox.y = y

                    //         return item
                    //     })
                    //     break
                }
 
                selectedWidget.width = e.width
                selectedWidget.height = e.height
                selectedWidget.rotate = e.rotate
                selectedWidget.origin = e.origin
                selectedWidget.x = e.x
                selectedWidget.y = e.y
            }
            editBox.onEditEnd = () => { setTimeout(() => { this.mode = 'view'}, 0) }
            this.svgContainer.addWidgetEditBox(selectedWidget, editBox)
        }
    }
    selectAll() { this.svgContainer.widgets.forEach(item => this.selectListener.onSelectEmitt(item, false)) }
    deSelectAll() { this.svgContainer.removeWidgetEditBoxs() }
}

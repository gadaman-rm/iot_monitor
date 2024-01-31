import { Slider, Gauge, EditBox, Container } from "@gadaman-rm/iot-widgets"
import { KeyShortcatListener, PanListener, ZoomListener } from "@gadaman-rm/iot-widgets/event"
import { Point, randomId } from "@gadaman-rm/iot-widgets/math"

const mouseCoordInZoomAndPan2 = (e: MouseEvent, pan: Point, zoom: number) => {
    return {
        x: (e.clientX - pan.x) * zoom,
        y: (e.clientY - pan.y) * zoom,
    }
}

type IWidgets = Slider & Gauge

export class Store {
    app: HTMLDivElement
    widgetEditBox: { id: string, editBox: EditBox }[]
    panListener: PanListener<{ clientX: number, clientY: number }>
    zoomListener: ZoomListener
    digit0keyListener: KeyShortcatListener
    container: Container
    constructor(app: HTMLDivElement, container: Container, widgets: IWidgets[] = []) {
        this.app = app
        this.widgetEditBox = []
        this.container = container
        this.app.appendChild(this.container)
        widgets.forEach(widget => this.container.firstChild!.appendChild(widget))

        // Event
        this.digit0keyListener = new KeyShortcatListener('Digit0')
        this.panListener = new PanListener()
        this.zoomListener = new ZoomListener()
        this.initHandler()

        // document.addEventListener('mousemove', (e) => {
        //     const currentMouseCoord = mouseCoordShow(e)

        //     logInfo({
        //         points: [
        //             {
        //                 label: 'm',
        //                 point: {
        //                     x: currentMouseCoord.x + 10,
        //                     y: currentMouseCoord.y + 10,
        //                 }
        //             }
        //         ]
        //     })
        // })
    }

    initHandler() {
        document.addEventListener('click', this.handleClick)
        this.digit0keyListener.onKeyDown = (e) => {
            if (e.ctrlKey) {
                this.container.zoom = 1
                this.container.pan = { x: 0, y: 0 }
            }
        }
        this.panListener.onPanStart = (e, initFn) => {
            const pan = this.container.pan
            initFn({ clientX: e.clientX - pan.x, clientY: e.clientY - pan.y })
        }
        this.panListener.onPanMove = (e, init) => {
            if (init) {
                const x = e.clientX - init.clientX
                const y = e.clientY - init.clientY

                this.container.pan = { x, y }
            }
        }
        this.zoomListener.onZoom = (e) => {
            if (e.ctrlKey) {
                e.preventDefault()
                const pan = this.container.pan
                const zoom = this.container.zoom
                const currentMouseCoord = mouseCoordInZoomAndPan2(e, pan, zoom)
                // const currentMouseCoord = {x: e.clientX, y: e.clientY}

                const xs = (currentMouseCoord.x - pan.x) / zoom
                const ys = (currentMouseCoord.y - pan.y) / zoom
                this.container.zoom = zoom
                if (((e as any)?.wheelDelta ? (e as any).wheelDelta : -e.deltaY) > 0)
                    this.container.zoom = zoom * 1.2
                else
                    this.container.zoom = zoom / 1.2
                this.container.pan = { x: currentMouseCoord.x - xs * zoom, y: currentMouseCoord.y - ys * zoom }
            }
        }
    }
    handleClick = (e: MouseEvent) => {
        this.attachEditBox(e.target as any)
    }
    push(widget: IWidgets) {
        this.container.firstChild!.appendChild(widget)
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

                const editBox = new EditBox(randomId(), this.container as any, width, height, x, y, rotate, origin)
                this.widgetEditBox.push({ id: widgetId, editBox })
                editBox.onEdit = (e) => {
                    widget.setAttribute('width', e.width.toString())
                    widget.setAttribute('height', e.height.toString())
                    widget.setAttribute('rotate', e.rotate.toString())
                    widget.setAttribute('origin', e.originStr)
                    widget.setAttribute('x', e.x.toString())
                    widget.setAttribute('y', e.y.toString())
                }
                this.container.firstChild!.appendChild(editBox)
            }
        }

        // Remove EditBoxs
        if (widgetId === 'app' || !widgetId) {
            this.widgetEditBox.forEach(item => item.editBox.remove())
            this.widgetEditBox = []
        }
    }
}

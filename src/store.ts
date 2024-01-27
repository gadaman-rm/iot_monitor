import { Slider, Gauge, EditBox } from "iot-widgets"
import { KeyShortcatListener, PanListener, ZoomListener } from "iot-widgets/event"
import { Point, Transform, randomId } from "iot-widgets/math"
import { logInfo } from "iot-widgets/utility"

const mouseCoordInZoomAndPan = (e: MouseEvent, pan: Point, zoom: number) => {
    const dx = e.clientX - e.offsetX
    const dy = e.clientY - e.offsetY

    return {
        x: e.clientX - dx,
        y: e.clientY - dy,
    }
}

const mouseCoordInZoomAndPan2 = (e: MouseEvent, pan: Point, zoom: number) => {
    return {
        x: (e.clientX - pan.x) * zoom,
        y: (e.clientY - pan.y) * zoom,
    }
}

const mouseCoordShow = (e: MouseEvent) => {
    return { x: e.clientX, y: e.clientY}
}

type IWidgets = Slider & Gauge

export class Store {
    app: HTMLDivElement
    widgetEditBox: { id: string, editBox: EditBox }[] 
    panListener: PanListener<{ clientX: number, clientY: number }>
    zoomListener: ZoomListener
    digit0keyListener: KeyShortcatListener
    containerTransform: Transform
    constructor(app: HTMLDivElement, widgets: IWidgets[] = [], pan = { x: 0, y: 0 }, zoom = 1) {
        this.app = app
        this.widgetEditBox = []
        widgets.forEach(widget => this.app.appendChild(widget)) 
        this.setContainerTransform = {x: pan.x, y: pan.y, scaleX: zoom}       
        this.containerTransform = new Transform(this.app) 

        // Event
        this.digit0keyListener = new KeyShortcatListener('Digit0')
        this.panListener = new PanListener()
        this.zoomListener = new ZoomListener()
        this.initHandler()

        document.addEventListener('mousemove', (e) => {
            const currentMouseCoord = mouseCoordShow(e)
            
            logInfo({
                points: [
                    {
                        label: 'm',
                        point: {
                            x: currentMouseCoord.x + 10,
                            y: currentMouseCoord.y + 10,
                        }
                    }
                ]
            })
        })
    }
    public set setContainerTransform(transform: { x: number, y: number, scaleX: number }) {
        this.app.style.transform = `translate(${transform.x}px,${transform.y}px) scale(${transform.scaleX})`
    }

    initHandler() {
        document.addEventListener('click' , this.handleClick)
        this.digit0keyListener.onKeyDown = (e) => {
            if (e.ctrlKey) {
                this.setContainerTransform = {x: 0, y: 0, scaleX: 1}
            }
        }
        this.panListener.onPanStart = (e, initFn) => {
            const transform = this.containerTransform.transform
            initFn({ clientX: e.clientX - transform.x, clientY: e.clientY - transform.y })
        }
        this.panListener.onPanMove = (e, init) => {
            const transform = this.containerTransform.transform
            if(init) {
                const x = e.clientX - init.clientX
                const y = e.clientY - init.clientY

                this.setContainerTransform = {...transform, x, y}
            }
        }
        this.zoomListener.onZoom = (e) => {
            if (e.ctrlKey) {
                e.preventDefault()
                const {scaleX, ...pan} = this.containerTransform.transform
                const currentMouseCoord = mouseCoordInZoomAndPan2(e, pan, scaleX)
                // const currentMouseCoord = {x: e.clientX, y: e.clientY}

                const xs = (currentMouseCoord.x - pan.x) / scaleX
                const ys = (currentMouseCoord.y - pan.y) / scaleX
                let zoom = scaleX
                if (((e as any)?.wheelDelta ? (e as any).wheelDelta : -e.deltaY) > 0)
                    zoom *= 1.2
                else
                    zoom /= 1.2
                this.setContainerTransform = { x: currentMouseCoord.x - xs * zoom, y: currentMouseCoord.y - ys * zoom, scaleX: zoom }
            }
        }
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

                const editBox = new EditBox(randomId(), this.containerTransform  as any, width, height, x, y, rotate, origin)
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
        if(widgetId === 'app' || !widgetId) {
            this.widgetEditBox.forEach(item => item.editBox.remove())
            this.widgetEditBox = []
        }
    }
}
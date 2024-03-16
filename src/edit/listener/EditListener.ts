import { EditBox, IWidgets, SvgContainer } from "@gadaman-rm/iot-widgets"
import EventEmitter from "eventemitter3"
import { Toolbar } from "../components"
import { updatePlan } from "../../api/edit"
import { StorageListener } from "./StorageListener"
import { OK_SYM } from "../../api/utility"

export type Mode = 'edit' | 'view' | 'draw'
export type EmitterEventType = 'modechange'

export class EditListener {
    #mode!: Mode
    constructor(public svgContainer: SvgContainer, public eventEmitter: EventEmitter, public toolbar: Toolbar, public storageListener: StorageListener) {
        this.svgContainer = svgContainer
        this.mode = 'view'
        this.toolbar.addEventListener('toolbar-click', e => {
            switch (e.detail.type) {
                case 'save': {
                    const widgets = this.svgContainer.widgets.map(item => {
                        let attrs = {} as any
                        for (const key of item.getAttributeNames()) attrs[key] = item.getAttribute(key)!
                        return attrs
                    })
                    updatePlan(this.storageListener.planeName, widgets).then(data => { if (data[OK_SYM]) this.storageListener.emitSaveChange(true) })
                    break
                }
                case 'panel': {
                    window.location.href = `/`
                    break
                }
            }
        })
    }

    addListener(events: 'modechange', fn: (mode: Mode) => void): void
    addListener(events: EmitterEventType, fn: (...args: any[]) => void) { this.eventEmitter.on(events, fn) }

    removeListener(events: 'modechange', fn: (mode: Mode) => void): void
    removeListener(events: EmitterEventType, fn: (...args: any[]) => void) { this.eventEmitter.removeListener(events, fn) }

    removeAllListeners(events: EmitterEventType) { this.eventEmitter.removeAllListeners(events) }

    public set mode(mode: Mode) {
        if (this.#mode !== mode) {
            this.#mode = mode
            // this.modeChangeEvent.detail.mode = mode
            // dispatchEvent(this.modeChangeEvent)
            this.eventEmitter.emit('modechange' as EmitterEventType, mode)
        }
    }
    public get mode() { return this.#mode }

    select(selectedWidget: IWidgets | null) {
        if (selectedWidget && !this.svgContainer.findEditBoxByWidgetId(selectedWidget)) {
            const x = +selectedWidget.getAttribute('x')!
            const y = +selectedWidget.getAttribute('y')!
            const width = +selectedWidget.getAttribute('width')!
            const height = +selectedWidget.getAttribute('height')!
            const rotate = +selectedWidget.getAttribute('rotate')!
            const origin = selectedWidget.getAttribute('origin')!
            const ratio = selectedWidget.getAttribute('ratio')!

            const editBox = new EditBox(this.svgContainer)
            editBox.x = x
            editBox.y = y
            editBox.width = width
            editBox.height = height
            editBox.rotate = rotate
            editBox.origin = origin
            if (ratio) editBox.setAttribute('ratio', ratio)

            editBox.addEventListener('edit-start', () => { this.mode = 'edit' })

            editBox.addEventListener('edit', (e) => {
                const otherEditBoxs = this.svgContainer.editBoxforWidgets.filter(item => item.editBox.id !== editBox.id)
                switch (e.detail.type) {
                    case "move":
                        otherEditBoxs.map((item) => {
                            const x = item.widget.x + (e.detail.x - selectedWidget.x)
                            const y = item.widget.y + (e.detail.y - selectedWidget.y)
                            item.widget.x = x
                            item.widget.y = y
                            item.editBox.x = x
                            item.editBox.y = y
                            return item
                        })
                        break
                    case "rotate":
                        otherEditBoxs.map((item) => {
                            item.editBox.rotate = e.detail.rotate
                            item.widget.rotate = e.detail.rotate
                            return item
                        })
                        break

                    case "rmid-resize":
                        otherEditBoxs.map((item) => {
                            item.editBox.width = e.detail.width
                            item.widget.width = e.detail.width
                            return item
                        })
                        break
                    case "bmid-resize":
                        otherEditBoxs.map((item) => {
                            item.editBox.height = e.detail.height
                            item.widget.height = e.detail.height
                            return item
                        })
                        break

                    case "br-resize":
                        otherEditBoxs.map((item) => {
                            item.editBox.width = e.detail.width
                            item.widget.width = e.detail.width
                            return item
                        })
                        break
                }

                selectedWidget.width = e.detail.width
                selectedWidget.height = e.detail.height
                selectedWidget.rotate = e.detail.rotate
                selectedWidget.origin = e.detail.origin
                selectedWidget.x = e.detail.x
                selectedWidget.y = e.detail.y
            })
            editBox.addEventListener('edit-end', () => { setTimeout(() => { this.mode = 'view' }, 0) })
            this.svgContainer.addEditBox(selectedWidget, editBox)
            return editBox
        }
    }
}

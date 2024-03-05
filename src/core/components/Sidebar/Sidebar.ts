import { Sidebar as GSidebar } from "@gadaman-rm/iot-widgets/components"
import htmlText from './Sidebar.html?raw'
import cssText from './Sidebar.scss?inline'
import { EditListener } from "../../listener/EditListener"
import { DrawListener } from "../../listener/DrawListener"
import { MdIconButton } from "@material/web/iconbutton/icon-button"
import { EditBox, strToWidgets } from "@gadaman-rm/iot-widgets"
import { MdFilledTextField } from "@material/web/textfield/filled-text-field"
import EventEmitter from "eventemitter3"

const template = document.createElement('template')
template.innerHTML = `<style>${cssText}</style>${htmlText}`

// export const ATTRIBUTES = [] as const
const TAG_NAME = `i-sidebar`
export class Sidebar extends HTMLDivElement {
    // static get observedAttributes() { return ATTRIBUTES}
    rootRef: GSidebar
    propertyBoxRef: HTMLDivElement
    widgetsRef: HTMLDivElement
    xRef: MdFilledTextField
    yRef: MdFilledTextField
    widthRef: MdFilledTextField
    heightRef: MdFilledTextField
    rotateRef: MdFilledTextField
    constructor(public eventEmitter: EventEmitter, public editListener: EditListener, public drawListener: DrawListener) {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot!.appendChild(template.content.cloneNode(true))
        this.setAttribute('is', TAG_NAME)
        this.rootRef = this.shadowRoot!.querySelector('#root')!
        this.propertyBoxRef = this.shadowRoot!.querySelector('#property-box')!
        this.widgetsRef = this.shadowRoot!.querySelector('#widgets')!
        this.xRef = this.shadowRoot!.querySelector('#x')!
        this.yRef = this.shadowRoot!.querySelector('#y')!
        this.widthRef = this.shadowRoot!.querySelector('#width')!
        this.heightRef = this.shadowRoot!.querySelector('#height')!
        this.rotateRef = this.shadowRoot!.querySelector('#rotate')!

        this.editListener.svgContainer.addEventListener('select-change', (e) => {
            if(e.detail.selects.length > 0) {
                const editBox = e.detail.selects[0].editBox as EditBox
                this.xRef.value = editBox.x.toString()
                this.yRef.value = editBox.y.toString()
                this.widthRef.value = editBox.width.toString()
                this.heightRef.value = editBox.height.toString()
                this.rotateRef.value = editBox.rotate.toString()
            } else {
                this.xRef.value = ""
                this.yRef.value = ""
                this.widthRef.value = ""
                this.heightRef.value = ""
                this.rotateRef.value = ""
            }
        })
    }

    // attributeUpdate(attributeName: any, oldValue: string, newValue: string) { }
    connectedCallback() {
        this.rootRef.addEventListener('click', this.handleClick)
        this.shadowRoot!.querySelectorAll<MdIconButton>('.header_btn')!.forEach(item => {
            item.onclick = () => {
                this.rootRef.close()
                setTimeout(() => this.rootRef.removeAttribute('tab'), 400)
            }
        })
        this.editListener.addListener('modechange', (mode) => {
            if(mode === 'draw') {
                document.body.style.cursor = "crosshair"
            } else {
                this.select(null) 
                document.body.style.cursor = "inherit"
            }
        })
    }
    disconnectedCallback() { this.rootRef.removeEventListener('click', this.handleClick) }

    handleClick = (e: MouseEvent) => { this.select(e.target as any) }
    select(elem: HTMLElement | null) {
        let selected = null as any
        ([...this.widgetsRef.children] as HTMLElement[]).map((item) => {
            if (item === elem) {
                selected = item
                selected.classList.add('widget--selected')
                this.drawListener.drawWidget = () => strToWidgets(item.getAttribute('name') as any)
            }
            else item.classList.remove('widget--selected')
        })

        if (selected) this.editListener.mode = 'draw'
        if (!selected && this.editListener.mode === 'draw') this.editListener.mode = 'view'
    }
}

customElements.define(TAG_NAME, Sidebar, { extends: 'div' })

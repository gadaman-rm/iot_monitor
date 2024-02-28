import { Sidebar as GSidebar} from "@gadaman-rm/iot-widgets/components"
import htmlText from './Sidebar.html?raw'
import cssText from './Sidebar.scss?inline'
import { EditListener } from "../../listener/EditListener"
import { DrawListener } from "../../listener/DrawListener"
import { Gauge } from "@gadaman-rm/iot-widgets"
import { MdIconButton } from "@material/web/iconbutton/icon-button"

const template = document.createElement('template')
template.innerHTML = `<style>${cssText}</style>${htmlText}`

// export const ATTRIBUTES = [] as const
const TAG_NAME=`i-sidebar`
export class Sidebar extends HTMLDivElement {
    // static get observedAttributes() { return ATTRIBUTES}
    rootRef: GSidebar
    propertyBoxRef: HTMLDivElement
    widgetsRef: HTMLDivElement
    constructor(public editListener: EditListener, public drawListener: DrawListener) {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot!.appendChild(template.content.cloneNode(true))
        this.setAttribute('is', TAG_NAME)
        this.rootRef = this.shadowRoot!.querySelector('#root')!
        this.propertyBoxRef = this.shadowRoot!.querySelector('#properties')!
        this.widgetsRef = this.shadowRoot!.querySelector('#widgets')!
    }

    // attributeUpdate(attributeName: any, oldValue: string, newValue: string) { }
    connectedCallback() { 
        this.rootRef.addEventListener('click', this.handleClick) 
        this.shadowRoot!.querySelectorAll<MdIconButton>('.header_btn')!.forEach(item => {
            item.onclick = () => { this.rootRef.close() }
        })
        this.editListener.onModeChange = (mode) => { 
            if(mode === 'draw') {
                document.body.style.cursor = "crosshair"
            } else {
                this.select(null) 
                document.body.style.cursor = "inherit"
            }
        }
    }
    disconnectedCallback() { this.rootRef.removeEventListener('click', this.handleClick) }

    handleClick = (e: MouseEvent) => { this.select(e.target as any) }
    select(elem: HTMLElement | null) {
        let selected = null as any
        ([...this.widgetsRef.children] as HTMLElement[]).map((item) => {
            if (item === elem) {
                selected = item
                selected.classList.add('widget--selected')
                this.drawListener.drawWidget = new Gauge()
            }
            else item.classList.remove('widget--selected')
        })

        if(selected) this.editListener.mode = 'draw'
        else this.editListener.mode = 'view'
    }
}

customElements.define(TAG_NAME, Sidebar, { extends: 'div' })
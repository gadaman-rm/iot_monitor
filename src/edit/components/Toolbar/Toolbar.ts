import { MdIconButton } from '@material/web/iconbutton/icon-button'
import htmlText from './Toolbar.html?raw'
import cssText from './Toolbar.scss?inline'

const template = document.createElement('template')
template.innerHTML = `<style>${cssText}</style>${htmlText}`

export interface ToolbarClickEvent { 
    e: MouseEvent,
    type: 'save' | 'panel',
}

const TAG_NAME = `g-toolbar`
const ATTRIBUTES = ['id'] as const
export class Toolbar extends HTMLDivElement {
    static get observedAttributes() { return ATTRIBUTES }
    rootRef: HTMLDivElement
    saveRef: MdIconButton
    panelRef: MdIconButton
    toolbarClickEvent: CustomEvent<ToolbarClickEvent>
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot!.appendChild(template.content.cloneNode(true))
        this.setAttribute('is', TAG_NAME)
        this.rootRef = this.shadowRoot!.querySelector('#root')!
        this.saveRef = this.shadowRoot!.querySelector('#save')!
        this.panelRef = this.shadowRoot!.querySelector('#panel')!
        this.toolbarClickEvent = new CustomEvent<ToolbarClickEvent>("toolbar-click", { detail: {} as any })
        
        this.saveRef.addEventListener('click', e => { 
            this.toolbarClickEvent.detail.e = e
            this.toolbarClickEvent.detail.type = 'save'
            this.dispatchEvent(this.toolbarClickEvent)
        })

        this.panelRef.addEventListener('click', e => { 
            this.toolbarClickEvent.detail.e = e
            this.toolbarClickEvent.detail.type = 'panel'
            this.dispatchEvent(this.toolbarClickEvent)
        })
    }

    public get id() { return this.getAttribute('id')! }
    public set id(id: string) { this.setAttribute('id', id) }

    connectedCallback() { }
    disconnectedCallback() { }
    attributeChangedCallback(attrName: typeof ATTRIBUTES[number], oldValue: string, newValue: string) {
        switch (attrName) {
            case 'id': this.idUpdate(oldValue, newValue)
                break
        }
    }

    idUpdate(oldId: string, newId: string) { console.log(oldId, newId) }

    // @ts-ignore: Unreachable code error
    addEventListener<K extends keyof CustomElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: CustomElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void
    // @ts-ignore: Unreachable code error
    removeEventListener<K extends keyof CustomElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: CustomElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void
}

interface CustomElementEventMap extends HTMLElementEventMap {
    "toolbar-click": { detail: ToolbarClickEvent }
}

customElements.define(TAG_NAME, Toolbar, { extends: 'div' })

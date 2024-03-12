import { SvgContainer } from '@gadaman-rm/iot-widgets'
import htmlText from './ContextMenu.html?raw'
import cssText from './ContextMenu.scss?inline'

const template = document.createElement('template')
template.innerHTML = `<style>${cssText}</style>${htmlText}`

export interface MenuSelectEvent {
    type: 'rise-top' | 'rise' | 'lower' | 'lower-bottom',
}

const TAG_NAME = `g-context-menu`
const ATTRIBUTES = [] as const
export class ContextMenu extends HTMLDivElement {
    static get observedAttributes() { return [...ATTRIBUTES] }
    menuSelectEvent: CustomEvent<MenuSelectEvent>
    rootRef: HTMLDivElement
    riseTopRef: HTMLMenuElement
    riseRef: HTMLMenuElement
    lowerRef: HTMLMenuElement
    lowerBottomRef: HTMLMenuElement
    constructor(public svgContainer: SvgContainer) {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot!.appendChild(template.content.cloneNode(true))
        this.setAttribute('is', TAG_NAME)
        this.rootRef = this.shadowRoot!.querySelector('#root')!
        this.riseTopRef = this.shadowRoot!.querySelector('#rise-top')!
        this.riseRef = this.shadowRoot!.querySelector('#rise')!
        this.lowerRef = this.shadowRoot!.querySelector('#lower')!
        this.lowerBottomRef = this.shadowRoot!.querySelector('#lower-bottom')!
        this.menuSelectEvent = new CustomEvent<MenuSelectEvent>('menu-select', { detail: {} as any })

        document.addEventListener("contextmenu", (e) => {
            e.preventDefault()
            e.stopPropagation()
            this.rootRef.style.display = "flex"
            this.rootRef.style.insetInlineStart = (e.clientX) + "px"
            this.rootRef.style.insetBlockStart = (e.clientY) + "px"
        })
        document.addEventListener("click", (e) => {
            e.stopPropagation()
            this.rootRef.style.display = "none"
        })
        window.addEventListener('blur', () => this.rootRef.style.display = "none", false)
        window.addEventListener('wheel', () => this.rootRef.style.display = "none", false)

        this.riseTopRef.addEventListener('click', () => {
            this.svgContainer.riseToTop()
            this.menuSelectEvent.detail.type = 'rise-top'
            this.dispatchEvent(this.menuSelectEvent)
        })

        this.riseRef.addEventListener('click', () => {
            this.svgContainer.rise()
            this.menuSelectEvent.detail.type = 'rise'
            this.dispatchEvent(this.menuSelectEvent)
        })

        this.lowerRef.addEventListener('click', () => {
            this.svgContainer.lower()
            this.menuSelectEvent.detail.type = 'lower'
            this.dispatchEvent(this.menuSelectEvent)
        })

        this.lowerBottomRef.addEventListener('click', () => {
            this.svgContainer.lowerToBottom()
            this.menuSelectEvent.detail.type = 'lower-bottom'
            this.dispatchEvent(this.menuSelectEvent)
        })
    }

    // @ts-ignore: Unreachable code error
    addEventListener<K extends keyof CustomElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: CustomElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void
    // @ts-ignore: Unreachable code error
    removeEventListener<K extends keyof CustomElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: CustomElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void
}

interface CustomElementEventMap extends HTMLElementEventMap {
    "menu-select": { detail: MenuSelectEvent }
}

declare global {
    interface HTMLElementTagNameMap { TAG_NAME: ContextMenu }
}

customElements.define(TAG_NAME, ContextMenu, { extends: 'div' })

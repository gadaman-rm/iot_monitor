import "@material/web/iconbutton/filled-icon-button"
import htmlText from "./Toolbar.html?raw"
import cssText from "./Toolbar.scss?inline"
import { Tabs } from "@gadaco/iot-widgets/components"

const template = document.createElement("template")
template.innerHTML = `<style>${cssText}</style>${htmlText}`

export type Tool = "mouse" | "select"
export interface ToolbarChangeEvent {
  e: MouseEvent
  type: Tool
}

const TAG_NAME = `g-toolbar`
const ATTRIBUTES = ["id"] as const
export class Toolbar extends HTMLDivElement {
  initAttribute(name: string, defaultValue: string) {
    if (!this.attributes.getNamedItem(name))
      this.setAttribute(name, defaultValue)
  }
  static get observedAttributes() {
    return ATTRIBUTES
  }
  rootRef: HTMLDivElement
  tabRef: Tabs
  toolbarChangeEvent: CustomEvent<ToolbarChangeEvent>
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot!.appendChild(template.content.cloneNode(true))
    this.setAttribute("is", TAG_NAME)
    this.rootRef = this.shadowRoot!.querySelector("#root")!
    this.tabRef = this.shadowRoot!.querySelector("#tabs")!
    this.toolbarChangeEvent = new CustomEvent<ToolbarChangeEvent>(
      "toolbar-change",
      { detail: {} as any },
    )
  }

  public get id() {
    return this.getAttribute("id")!
  }
  public set id(id: string) {
    this.setAttribute("id", id)
  }

  public get tool(): Tool {
    return this.tabRef.tab as any
  }
  public set tool(tool: Tool) {
    this.tabRef.tab = tool
  }

  connectedCallback() {
    setTimeout(() => {
      this.tabRef.onChange = (e) => {
        this.toolbarChangeEvent.detail.e = e
        this.toolbarChangeEvent.detail.type = e.param.role as any
        this.dispatchEvent(this.toolbarChangeEvent)
      }
    }, 0)
  }
  disconnectedCallback() {}
  attributeChangedCallback(
    attrName: (typeof ATTRIBUTES)[number],
    oldValue: string,
    newValue: string,
  ) {
    switch (attrName) {
      case "id":
        this.idUpdate(oldValue, newValue)
        break
    }
  }

  idUpdate(_oldId: string, _newId: string) {}

  // @ts-ignore: Unreachable code error
  addEventListener<K extends keyof CustomElementEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: CustomElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void
  // @ts-ignore: Unreachable code error
  removeEventListener<K extends keyof CustomElementEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: CustomElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void
}

interface CustomElementEventMap extends HTMLElementEventMap {
  "toolbar-change": { detail: ToolbarChangeEvent }
}

customElements.define(TAG_NAME, Toolbar, { extends: "div" })

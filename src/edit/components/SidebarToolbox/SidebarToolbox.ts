import htmlText from "./SidebarToolbox.html?raw"
import cssText from "./SidebarToolbox.scss?inline"
import { EditListener } from "../../listener/EditListener"
import { DrawListener } from "../../listener/DrawListener"
import { SvgContainer } from "@gadaco/iot-widgets"
import EventEmitter from "eventemitter3"
import { SelectListener } from "../../listener/SelectListener"
import { StorageListener } from "../../listener/StorageListener"

const template = document.createElement("template")
template.innerHTML = `<style>${cssText}</style>${htmlText}`

// export const ATTRIBUTES = [] as const
const TAG_NAME = `i-sidebar-toolbox`
export class SidebarToolbox extends HTMLDivElement {
  // static get observedAttributes() { return ATTRIBUTES}
  rootRef: HTMLDivElement
  constructor(
    public svgContainer: SvgContainer,
    public eventEmitter: EventEmitter,
    public editListener: EditListener,
    public drawListener: DrawListener,
    public selectListener: SelectListener,
    public storageListener: StorageListener,
  ) {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot!.appendChild(template.content.cloneNode(true))
    this.setAttribute("is", TAG_NAME)
    this.rootRef = this.shadowRoot!.querySelector("#root")!
  }

  // attributeUpdate(attributeName: any, oldValue: string, newValue: string) { }
  connectedCallback() {
    this.editListener.svgContainer.addEventListener("editbox-change", (e) => {
      if (e.detail.editBoxforWidgets.length === 1) {
      }
    })
  }
  disconnectedCallback() {}
}

customElements.define(TAG_NAME, SidebarToolbox, { extends: "div" })

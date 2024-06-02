import htmlText from "./SidebarAlign.html?raw"
import cssText from "./SidebarAlign.scss?inline"
import { EditListener } from "../../listener/EditListener"
import { DrawListener } from "../../listener/DrawListener"
import { SvgContainer } from "@gadaco/iot-widgets"
import EventEmitter from "eventemitter3"
import { SelectListener } from "../../listener/SelectListener"
import { StorageListener } from "../../listener/StorageListener"
import { MdFilledTextField } from "@material/web/textfield/filled-text-field"

const template = document.createElement("template")
template.innerHTML = `<style>${cssText}</style>${htmlText}`

// export const ATTRIBUTES = [] as const
const TAG_NAME = `i-sidebar-align`
export class SidebarAlign extends HTMLDivElement {
  // static get observedAttributes() { return ATTRIBUTES}
  rootRef: HTMLDivElement
  containerRef: HTMLDivElement
  idRef: MdFilledTextField
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
    this.idRef = this.shadowRoot!.querySelector("#id")!
    this.containerRef = this.shadowRoot!.querySelector("#container")!

    this.containerRef.addEventListener("click", (e) => {
      const selectedItem = e
        .composedPath()
        .find(
          (item) => (item as HTMLElement).tagName?.toLowerCase() === "div",
        ) as HTMLLIElement | undefined

      switch (selectedItem?.getAttribute("id")) {
        case "vertical-left": {
          this.svgContainer.verticalLeft()
          break
        }
        case "vertical-center": {
          this.svgContainer.verticalCenter()
          break
        }
        case "vertical-right": {
          this.svgContainer.verticalRight()
          break
        }

        case "horizontal-top": {
          this.svgContainer.horizontalTop()
          break
        }
        case "horizontal-center": {
          this.svgContainer.horizontalCenter()
          break
        }
        case "horizontal-bottom": {
          this.svgContainer.horizontalBottom()
          break
        }

        case "vertical-distribute-center": {
          this.svgContainer.verticalDistributeCenter()
          break
        }
        case "column-distribute": {
          this.svgContainer.columnDistribute()
          break
        }
        case "expand-width": {
          this.svgContainer.expandWidth()
          break
        }
        case "shrink-width": {
          this.svgContainer.shrinkWidth()
          break
        }
        case "horizontal-distribute-center": {
          this.svgContainer.horizontalDistributeCenter()
          break
        }
        case "row-distribute": {
          this.svgContainer.rowDistribute()
          break
        }
        case "expand-height": {
          this.svgContainer.expandHeight()
          break
        }
        case "shrink-height": {
          this.svgContainer.shrinkHeight()
          break
        }
        case "center": {
          this.svgContainer.verticalCenter()
          this.svgContainer.horizontalCenter()
          break
        }

        case "highest": {
          this.svgContainer.highest()
          break
        }
        case "higher": {
          console.log(selectedItem)
          this.svgContainer.higher()
          break
        }
        case "lower": {
          this.svgContainer.lower()
          break
        }
        case "lowest": {
          this.svgContainer.lowest()
          break
        }
      }
    })
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

customElements.define(TAG_NAME, SidebarAlign, { extends: "div" })

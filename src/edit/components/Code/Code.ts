import htmlText from "./Code.html?raw"
import cssText from "./Code.scss?inline"
import { EditListener } from "../../listener/EditListener"
import { DrawListener } from "../../listener/DrawListener"
import { Row, SvgContainer } from "@gadaco/iot-widgets"
import { JsonEdit } from "@gadaco/iot-widgets/components"
import EventEmitter from "eventemitter3"
import { SelectListener } from "../../listener/SelectListener"
import { StorageListener } from "../../listener/StorageListener"

const template = document.createElement("template")
template.innerHTML = `<style>${cssText}</style>${htmlText}`

// export const ATTRIBUTES = [] as const
const TAG_NAME = `i-code`
export class Code extends HTMLDivElement {
  // static get observedAttributes() { return ATTRIBUTES}
  rootRef: HTMLDivElement
  jsonEditRef: JsonEdit
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
    this.jsonEditRef = this.shadowRoot!.querySelector("#json-edit")!
  }

  // attributeUpdate(attributeName: any, oldValue: string, newValue: string) { }
  connectedCallback() {
    this.editListener.svgContainer.addEventListener("editbox-change", (e) => {
      const editBoxforWidgets = e.detail.editBoxforWidgets

      if (editBoxforWidgets.length === 1) {
        const { widget } = editBoxforWidgets[0]

        this.jsonEditRef.readonly = false
        switch (widget.getAttribute("is")) {
          case "g-row": {
            this.jsonEditRef.code = JSON.stringify(
              (widget as Row).items,
              null,
              2,
            )

            this.jsonEditRef.onChange = (e) => {
              this.storageListener.emitSaveChange(false)

              const items = this.jsonEditRef.codeInJson()
              if (items && Array.isArray(items)) {
                ;(widget as Row).items = eval(e.detail.json)
              }
            }
            break
          }
        }
      } else {
        // console.log(e.detail.editBoxforWidgets)

        this.jsonEditRef.readonly = true
        this.jsonEditRef.onChange = () => {}
        this.jsonEditRef.code = ""
      }
    })
  }
  disconnectedCallback() {}
}

customElements.define(TAG_NAME, Code, { extends: "div" })

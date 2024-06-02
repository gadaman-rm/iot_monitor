import htmlText from "./SidebarGeometry.html?raw"
import cssText from "./SidebarGeometry.scss?inline"
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
const TAG_NAME = `i-sidebar-geometry`
export class SidebarGeometry extends HTMLDivElement {
  // static get observedAttributes() { return ATTRIBUTES}
  rootRef: HTMLDivElement
  idRef: MdFilledTextField
  xRef: MdFilledTextField
  yRef: MdFilledTextField
  widthRef: MdFilledTextField
  heightRef: MdFilledTextField
  rotateRef: MdFilledTextField
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
    this.xRef = this.shadowRoot!.querySelector("#x")!
    this.yRef = this.shadowRoot!.querySelector("#y")!
    this.widthRef = this.shadowRoot!.querySelector("#width")!
    this.heightRef = this.shadowRoot!.querySelector("#height")!
    this.rotateRef = this.shadowRoot!.querySelector("#rotate")!
    this.idRef.disabled = true
    this.xRef.disabled = true
    this.yRef.disabled = true
    this.widthRef.disabled = true
    this.heightRef.disabled = true
    this.rotateRef.disabled = true
  }

  // attributeUpdate(attributeName: any, oldValue: string, newValue: string) { }
  connectedCallback() {
    this.editListener.svgContainer.addEventListener("editbox-change", (e) => {
      if (e.detail.editBoxforWidgets.length === 1) {
        this.idRef.disabled = false
        this.xRef.disabled = false
        this.yRef.disabled = false
        this.widthRef.disabled = false
        this.heightRef.disabled = false
        this.rotateRef.disabled = false

        const { editBox, widget } = e.detail.editBoxforWidgets[0]
        this.idRef.value = widget.id.toString()
        this.idRef.onclick = (e) => (e.target as MdFilledTextField).select()
        this.idRef.oninput = (e) => {
          const id = (e.target as any).value
          if (!this.svgContainer.widgets.find((item) => item.id === id)) {
            widget.id = (e.target as any).value
            this.idRef.error = false
          } else {
            this.idRef.error = true
            this.idRef.errorText =
              "ID already exists, please enter a different ID."
          }
          this.storageListener.emitSaveChange(false)
        }

        this.xRef.value = editBox.x.toString()
        this.xRef.oninput = (e) => {
          const x = +(e.target as any).value || 0
          editBox.x = x
          widget.x = x
          this.storageListener.emitSaveChange(false)
        }

        this.yRef.value = editBox.y.toString()
        this.yRef.oninput = (e) => {
          const y = +(e.target as any).value || 0
          editBox.y = y
          widget.y = y
          this.storageListener.emitSaveChange(false)
        }

        this.widthRef.value = editBox.width.toString()
        this.widthRef.oninput = (e) => {
          const width = +(e.target as any).value || 0
          editBox.width = width
          widget.width = width
          this.storageListener.emitSaveChange(false)
        }

        this.heightRef.value = editBox.height.toString()
        this.heightRef.oninput = (e) => {
          const height = +(e.target as any).value || 0
          editBox.height = height
          widget.height = height
          this.storageListener.emitSaveChange(false)
        }

        this.rotateRef.value = editBox.rotate.toString()
        this.rotateRef.oninput = (e) => {
          const rotate = +(e.target as any).value || 0
          editBox.rotate = rotate
          widget.rotate = rotate
          this.storageListener.emitSaveChange(false)
        }

        editBox.addEventListener("edit", (e) => {
          this.xRef.value = e.detail.x.toString()
          this.yRef.value = e.detail.y.toString()
          this.widthRef.value = e.detail.width.toString()
          this.heightRef.value = e.detail.height.toString()
          this.rotateRef.value = e.detail.rotate.toString()
        })
      } else if (e.detail.editBoxforWidgets.length === 0) {
        this.idRef.value = ""
        this.idRef.error = false
        this.idRef.disabled = true
        this.xRef.value = ""
        this.yRef.value = ""
        this.widthRef.value = ""
        this.heightRef.value = ""
        this.rotateRef.value = ""
        this.xRef.disabled = true
        this.yRef.disabled = true
        this.widthRef.disabled = true
        this.heightRef.disabled = true
        this.rotateRef.disabled = true
      }
    })
  }
  disconnectedCallback() {}
}

customElements.define(TAG_NAME, SidebarGeometry, { extends: "div" })

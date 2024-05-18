import { Sidebar as GSidebar } from "@gadaco/iot-widgets/components"
import htmlText from "./Sidebar.html?raw"
import cssText from "./Sidebar.scss?inline"
import { EditListener } from "../../listener/EditListener"
import { DrawListener } from "../../listener/DrawListener"
import { MdIconButton } from "@material/web/iconbutton/icon-button"
import { isToWidgets } from "@gadaco/iot-widgets"
import { MdFilledTextField } from "@material/web/textfield/filled-text-field"
import EventEmitter from "eventemitter3"
import { SelectListener } from "../../listener/SelectListener"

const template = document.createElement("template")
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
  constructor(
    public eventEmitter: EventEmitter,
    public editListener: EditListener,
    public drawListener: DrawListener,
    public selectListener: SelectListener,
  ) {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot!.appendChild(template.content.cloneNode(true))
    this.setAttribute("is", TAG_NAME)
    this.rootRef = this.shadowRoot!.querySelector("#root")!
    this.propertyBoxRef = this.shadowRoot!.querySelector("#property-box")!
    this.widgetsRef = this.shadowRoot!.querySelector("#widgets")!
    this.xRef = this.shadowRoot!.querySelector("#x")!
    this.yRef = this.shadowRoot!.querySelector("#y")!
    this.widthRef = this.shadowRoot!.querySelector("#width")!
    this.heightRef = this.shadowRoot!.querySelector("#height")!
    this.rotateRef = this.shadowRoot!.querySelector("#rotate")!
    this.xRef.disabled = true
    this.yRef.disabled = true
    this.widthRef.disabled = true
    this.heightRef.disabled = true
    this.rotateRef.disabled = true
  }

  // attributeUpdate(attributeName: any, oldValue: string, newValue: string) { }
  connectedCallback() {
    this.rootRef.addEventListener("click", this.handleClick)
    this.shadowRoot!.querySelectorAll<MdIconButton>(".header_btn")!.forEach(
      (item) => {
        item.onclick = () => {
          this.rootRef.close()
          setTimeout(() => this.rootRef.removeAttribute("tab"), 400)
        }
      },
    )
    this.editListener.addListener("modechange", (mode) => {
      if (mode === "draw") {
        document.body.style.cursor = "crosshair"
      } else {
        this.select(null)
        document.body.style.cursor = "inherit"
      }
    })

    this.editListener.svgContainer.addEventListener("editbox-change", (e) => {
      if (e.detail.editBoxforWidgets.length === 1) {
        this.xRef.disabled = false
        this.yRef.disabled = false
        this.widthRef.disabled = false
        this.heightRef.disabled = false
        this.rotateRef.disabled = false

        const { editBox, widget } = e.detail.editBoxforWidgets[0]
        this.xRef.value = editBox.x.toString()
        this.xRef.oninput = (e) => {
          const x = +(e.target as any).value || 0
          editBox.x = x
          widget.x = x
        }

        this.yRef.value = editBox.y.toString()
        this.yRef.oninput = (e) => {
          const y = +(e.target as any).value || 0
          editBox.y = y
          widget.y = y
        }

        this.widthRef.value = editBox.width.toString()
        this.widthRef.oninput = (e) => {
          const width = +(e.target as any).value || 0
          editBox.width = width
          widget.width = width
        }

        this.heightRef.value = editBox.height.toString()
        this.heightRef.oninput = (e) => {
          const height = +(e.target as any).value || 0
          editBox.height = height
          widget.height = height
        }

        this.rotateRef.value = editBox.rotate.toString()
        this.rotateRef.oninput = (e) => {
          const rotate = +(e.target as any).value || 0
          editBox.rotate = rotate
          widget.rotate = rotate
        }

        editBox.addEventListener("edit", (e) => {
          this.xRef.value = e.detail.x.toString()
          this.yRef.value = e.detail.y.toString()
          this.widthRef.value = e.detail.width.toString()
          this.heightRef.value = e.detail.height.toString()
          this.rotateRef.value = e.detail.rotate.toString()
        })
      } else if (e.detail.editBoxforWidgets.length === 0) {
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
  disconnectedCallback() {
    this.rootRef.removeEventListener("click", this.handleClick)
  }

  handleClick = (e: MouseEvent) => {
    this.select(e.target as any)
  }
  select(elem: HTMLElement | null) {
    let selected = null as any
    ;([...this.widgetsRef.children] as HTMLElement[]).map((item) => {
      if (item === elem) {
        selected = item
        selected.classList.add("widget--selected")
        this.drawListener.drawWidget = () =>
          isToWidgets(item.getAttribute("name") as any)
      } else item.classList.remove("widget--selected")
    })

    if (selected) this.editListener.mode = "draw"
    if (!selected && this.editListener.mode === "draw")
      this.editListener.mode = "view"
  }
}

customElements.define(TAG_NAME, Sidebar, { extends: "div" })

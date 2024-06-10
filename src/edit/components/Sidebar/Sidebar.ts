import "@material/web/textfield/filled-text-field"
import "@material/web/textfield/outlined-text-field"

import "@material/web/select/outlined-select"
import "@material/web/select/filled-select"
import "@material/web/select/select-option"

import "@material/web/checkbox/checkbox"

import "@material/web/radio/radio"

import "@material/web/button/outlined-button"
import "@material/web/button/filled-button"
import "@material/web/button/filled-tonal-button"
import "@material/web/button/elevated-button"

import "@material/web/tabs/tabs"
import "@material/web/tabs/primary-tab"
import "@material/web/tabs/secondary-tab"
import "@gadaco/iot-widgets/components"

import { Sidebar as GSidebar } from "@gadaco/iot-widgets/components"
import htmlText from "./Sidebar.html?raw"
import cssText from "./Sidebar.scss?inline"
import { EditListener } from "../../listener/EditListener"
import { DrawListener } from "../../listener/DrawListener"
import { MdIconButton } from "@material/web/iconbutton/icon-button"
import { SvgContainer } from "@gadaco/iot-widgets"
import EventEmitter from "eventemitter3"
import { SelectListener } from "../../listener/SelectListener"
import { StorageListener } from "../../listener/StorageListener"
import { MdTabs } from "@material/web/tabs/tabs"
import { SidebarGeometry } from "../SidebarGeometry/SidebarGeometry"
import { SidebarCode } from "../SidebarCode/SidebarCode"
import { MdPrimaryTab } from "@material/web/tabs/primary-tab"
import { SidebarAlign } from "../SidebarAlign/SidebarAlign"
import { SidebarToolbox } from "../SidebarToolbox/SidebarToolbox"

const template = document.createElement("template")
template.innerHTML = `<style>${cssText}</style>${htmlText}`

// export const ATTRIBUTES = [] as const
const TAG_NAME = `i-sidebar`
export class Sidebar extends HTMLDivElement {
  // static get observedAttributes() { return ATTRIBUTES}
  rootRef: GSidebar
  propertyBoxRef: HTMLDivElement
  tabs: MdTabs
  activeTab = "geometry"
  geometryPanelRef: HTMLDivElement
  geometryTab: MdPrimaryTab
  codeTab: MdPrimaryTab
  codePanelRef: HTMLDivElement
  propertiesRef: MdTabs
  alignRef: HTMLDialogElement
  sidebarToolboxRef: HTMLDialogElement
  constructor(
    public svgContainer: SvgContainer,
    public eventEmitter: EventEmitter,
    public editListener: EditListener,
    public drawListener: DrawListener,
    public selectListener: SelectListener,
    public storageListener: StorageListener,
    public sidebarGeometry: SidebarGeometry,
    public sidebarToolbox: SidebarToolbox,
    public sidebarCode: SidebarCode,
    public sidebarAlign: SidebarAlign,
  ) {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot!.appendChild(template.content.cloneNode(true))
    this.setAttribute("is", TAG_NAME)
    this.rootRef = this.shadowRoot!.querySelector("#root")!
    this.propertyBoxRef = this.shadowRoot!.querySelector("#property-box")!
    this.tabs = this.shadowRoot!.querySelector("#tabs")!
    this.geometryTab = this.shadowRoot!.querySelector("#geometry-tab")!
    this.codeTab = this.shadowRoot!.querySelector("#code-tab")!
    this.geometryPanelRef = this.shadowRoot!.querySelector("#geometry-panel")!
    this.codePanelRef = this.shadowRoot!.querySelector("#code-panel")!
    this.propertiesRef = this.shadowRoot!.querySelector("#properties")!
    this.alignRef = this.shadowRoot!.querySelector("#align")!
    this.sidebarToolboxRef = this.shadowRoot!.querySelector("#sidebar-toolbox")!

    this.sidebarToolboxRef.appendChild(sidebarToolbox)
    this.alignRef.appendChild(sidebarAlign)

    this.rootRef.addEventListener("sidebar-change", (e) => {
      this.editListener.selectedSidebar = e.detail as any
    })

    this.geometryPanelRef.appendChild(sidebarGeometry)

    this.codeTab.style.visibility = "hidden"
    this.codePanelRef.style.display = "none"
    this.codePanelRef.appendChild(sidebarCode)
  }

  // attributeUpdate(attributeName: any, oldValue: string, newValue: string) { }
  connectedCallback() {
    this.editListener.svgContainer.addEventListener("editbox-change", (e) => {
      const editBoxforWidgets = e.detail.editBoxforWidgets
      if (editBoxforWidgets.length === 1) {
        const { widget } = editBoxforWidgets[0]

        switch (widget.getAttribute("is")) {
          case "g-form-builder":
          case "g-row": {
            this.codeTab.style.visibility = "visible"
            break
          }
          default: {
            this.codeTab.style.visibility = "hidden"
            if (this.tabs.activeTab?.ariaLabel === "code-tab")
              this.tabs.activeTabIndex = 0

            break
          }
        }
      } else {
        this.codeTab.ariaDisabled
        this.codeTab.style.visibility = "hidden"
      }
    })
    this.tabs.onchange = () => {
      this.activeTab = this.tabs.activeTab?.ariaLabel!
      switch (this.activeTab) {
        case "geometry-tab":
          this.codePanelRef.style.display = "none"
          this.geometryPanelRef.style.display = "block"
          break
        case "code-tab":
          this.geometryPanelRef.style.display = "none"
          this.codePanelRef.style.display = "block"
          break
      }
    }

    this.rootRef.addEventListener("click", (e) =>
      this.sidebarToolbox.sidebarClickEmit(e),
    )
    this.shadowRoot!.querySelectorAll<MdIconButton>(".header_btn")!.forEach(
      (item) => {
        item.onclick = () => {
          this.rootRef.close()
          setTimeout(() => this.rootRef.removeAttribute("tab"), 400)
        }
      },
    )
  }
  disconnectedCallback() {}
}

customElements.define(TAG_NAME, Sidebar, { extends: "div" })

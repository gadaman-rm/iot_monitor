import { MenuJsonItem } from "@gadaco/iot-widgets/components"

export const MENU_JSON_DATA: MenuJsonItem[] = [
  {
    type: "sub-item",
    text: "Order",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="layers"><path d="M2.5,10.56l9,5.2a1,1,0,0,0,1,0l9-5.2a1,1,0,0,0,0-1.73l-9-5.2a1,1,0,0,0-1,0l-9,5.2a1,1,0,0,0,0,1.73ZM12,5.65l7,4-7,4.05L5,9.69Zm8.5,7.79L12,18.35,3.5,13.44a1,1,0,0,0-1.37.36,1,1,0,0,0,.37,1.37l9,5.2a1,1,0,0,0,1,0l9-5.2a1,1,0,0,0,.37-1.37A1,1,0,0,0,20.5,13.44Z"></path></svg>`,
    menuJsonItems: [
      {
        type: "item",
        id: "rise-top",
        text: "Rise to Top",
        hint: "",
        icon: "",
      },
      {
        type: "item",
        id: "rise",
        text: "Rise",
        hint: "",
        icon: "",
      },
      {
        type: "item",
        id: "lower",
        text: "Lower",
        hint: "",
        icon: "",
      },
      {
        type: "item",
        id: "lower-bottom",
        text: "Lower to Bottom",
        hint: "",
        icon: "",
      },
    ],
  },

  {
    type: "sub-item",
    text: "Align",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.29,13.29,4,18.59V17a1,1,0,0,0-2,0v4a1,1,0,0,0,.08.38,1,1,0,0,0,.54.54A1,1,0,0,0,3,22H7a1,1,0,0,0,0-2H5.41l5.3-5.29a1,1,0,0,0-1.42-1.42ZM5.41,4H7A1,1,0,0,0,7,2H3a1,1,0,0,0-.38.08,1,1,0,0,0-.54.54A1,1,0,0,0,2,3V7A1,1,0,0,0,4,7V5.41l5.29,5.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM21,16a1,1,0,0,0-1,1v1.59l-5.29-5.3a1,1,0,0,0-1.42,1.42L18.59,20H17a1,1,0,0,0,0,2h4a1,1,0,0,0,.38-.08,1,1,0,0,0,.54-.54A1,1,0,0,0,22,21V17A1,1,0,0,0,21,16Zm.92-13.38a1,1,0,0,0-.54-.54A1,1,0,0,0,21,2H17a1,1,0,0,0,0,2h1.59l-5.3,5.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L20,5.41V7a1,1,0,0,0,2,0V3A1,1,0,0,0,21.92,2.62Z"></path></svg>`,
    menuJsonItems: [
      {
        type: "item",
        id: "v-left",
        text: "Vertical left",
        hint: "",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="horizontal-align-left"><path d="M21,10H16V7a1,1,0,0,0-1-1H4V3A1,1,0,0,0,2,3V21a1,1,0,0,0,2,0V18H21a1,1,0,0,0,1-1V11A1,1,0,0,0,21,10ZM4,8H14v2H4Zm16,8H4V12H20Z"></path></svg>`,
      },
      {
        type: "item",
        id: "v-right",
        text: "Vertical right",
        hint: "",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="horizontal-align-right"><path d="M21,2a1,1,0,0,0-1,1V6H9A1,1,0,0,0,8,7v3H3a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H20v3a1,1,0,0,0,2,0V3A1,1,0,0,0,21,2ZM20,16H4V12H20Zm0-6H10V8H20Z"></path></svg>`,
      },
      {
        type: "item",
        id: "v-center",
        text: "Vertical center",
        hint: "",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="vertical-align-center"><path d="M21,11H18V6a1,1,0,0,0-1-1H14V3a1,1,0,0,0-1-1H7A1,1,0,0,0,6,3v8H3a1,1,0,0,0,0,2H6v8a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V19h3a1,1,0,0,0,1-1V13h3a1,1,0,0,0,0-2Zm-9,9H8V4h4Zm4-3H14V7h2Z"></path></svg>`,
      },
      {
        type: "item",
        id: "v-distribute-center",
        text: "V-distribute center",
        hint: "",
        icon: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.6072 4.9996h-1v-2c0-1.3333-2-1.3333-2 0v2h-1c-.55228 0-1 .44772-1 1v12c0 .55228.44772 1 1 1h1v2c0 1.3333 2 1.3333 2 0v-2h1c.55229 0 1-.44772 1-1v-12c0-.55228-.44772-1-1-1zm-1 12h-2v-10h2zm9.7855-11.999h-1v-2c0-1.3333-2-1.3333-2 0v2h-1c-.55228 0-1 .44772-1 1v12c0 .55228.44772 1 1 1h1v2c0 1.3333 2 1.3333 2 0v-2h1c.55228 0 1-.44772 1-1v-12c0-.55228-.44772-1-1-1zm-1 12h-2v-10h2z"/></svg>`,
      },
      {
        type: "item",
        id: "h-top",
        text: "Horizontal top",
        hint: "",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="vertical-align-top"><path d="M21,2H3A1,1,0,0,0,3,4H6V21a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V16h3a1,1,0,0,0,1-1V4h3a1,1,0,0,0,0-2ZM12,20H8V4h4Zm4-6H14V4h2Z"></path></svg>`,
      },
      {
        type: "item",
        id: "h-bottom",
        text: "Horizontal bottom",
        hint: "",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="vertical-align-bottom"><path d="M21,20H18V9a1,1,0,0,0-1-1H14V3a1,1,0,0,0-1-1H7A1,1,0,0,0,6,3V20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm-9,0H8V4h4Zm4,0H14V10h2Z"></path></svg>`,
      },
      {
        type: "item",
        id: "h-center",
        text: "Horizontal center",
        hint: "",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21,10H19V7a1,1,0,0,0-1-1H13V3a1,1,0,0,0-2,0V6H6A1,1,0,0,0,5,7v3H3a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h8v3a1,1,0,0,0,2,0V18h8a1,1,0,0,0,1-1V11A1,1,0,0,0,21,10ZM7,8H17v2H7Zm13,8H4V12H20Z"></path></svg>`,
      },
      {
        type: "item",
        id: "h-distribute-center",
        text: "H-distribute center",
        hint: "",
        icon: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m19 9.6072v-1h2c1.3333 0 1.3333-2 0-2h-2v-1c0-.55228-.44772-1-1-1h-12c-.55228 0-1 .44772-1 1v1h-2c-1.3333 0-1.3333 2 0 2h2v1c0 .55229.44772 1 1 1h12c.55228 0 1-.44772 1-1zm-12-1v-2h10v2zm11.999 9.7855v-1h2c1.3333 0 1.3333-2 0-2h-2v-1c0-.55228-.44772-1-1-1h-12c-.55228 0-1 .44772-1 1v1h-2c-1.3333 0-1.3333 2 0 2h2v1c0 .55228.44772 1 1 1h12c.55228 0 1-.44772 1-1zm-12-1v-2h10v2z"/></svg>`,
      },
    ],
  },
]

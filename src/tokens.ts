import { Container, token } from "brandi"
import {
  CreateAppFn,
  CreateKeyShortcatListenerFn,
  CreatePanListenerFn,
  CreateSvgContainerFn,
  CreateZoomListenerFn,
  ISidebar,
  IEditListener,
  IListener,
  ISelectListener,
  IDrawListener,
  IZoomPanListener,
  IDragListener,
  IEventEmitter,
  IMenuJson,
  IShortcutListener,
  IToolbarControl,
  IStorageListener,
  CreateViewFn,
  IViewListener,
  IToolbar,
  ISidebarAlign,
  ISidebarGeometry,
  ISidebarCode,
  ISidebarToolbox,
} from "./types"
import { MoveDragInit } from "./edit/listener/SelectListener"

export const RootContainer = token<Container>("RootContainer")

export const App = token<CreateAppFn>("App")
export const View = token<CreateViewFn>("View")
export const SvgContainer = token<CreateSvgContainerFn>("SvgContainer")
export const ZoomListener = token<CreateZoomListenerFn>("ZoomListener")
export const PanListener = token<CreatePanListenerFn>("PanListener")
export const KeyShortcatListener = token<CreateKeyShortcatListenerFn>(
  "KeyShortcatListener",
)
export const DragListener = token<IDragListener<MoveDragInit>>("DragListener")

export const ShortcutListener = token<IShortcutListener>("ShortcutListener")
export const ZoomPanListener = token<IZoomPanListener>("ZoomPanListener")
export const SelectListener = token<ISelectListener>("SelectListener")
export const DrawListener = token<IDrawListener>("DrawListener")
export const EditListener = token<IEditListener>("EditListener")
export const StorageListener = token<IStorageListener>("StorageListener")
export const Listener = token<IListener>("Listener")
export const ViewListener = token<IViewListener>("ViewListener")
export const EventEmitter = token<IEventEmitter>("EventEmitter")

// ********************** core components **********************
export const SidebarCode = token<ISidebarCode>("SidebarCode")
export const SidebarToolbox = token<ISidebarToolbox>("SidebarToolbox")
export const SidebarAlign = token<ISidebarAlign>("SidebarAlign")
export const SidebarGeometry = token<ISidebarGeometry>("SidebarGeometry")
export const Sidebar = token<ISidebar>("Sidebar")
export const MenuJson = token<IMenuJson>("MenuJson")
export const Toolbar = token<IToolbar>("Toolbar")
export const ToolbarControl = token<IToolbarControl>("ToolbarControl")

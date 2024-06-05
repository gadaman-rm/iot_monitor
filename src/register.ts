import { Container, injected } from "brandi"
import {
  createApp,
  createView,
  createDragListener,
  createKeyShortcatListener,
  createPanListener,
  createSvgContainer,
  createZoomListener,
} from "./create"
import {
  App,
  MenuJson,
  DragListener,
  DrawListener,
  EditListener,
  EventEmitter,
  KeyShortcatListener,
  Listener,
  PanListener,
  RootContainer,
  SelectListener,
  ShortcutListener,
  SidebarAlign,
  SidebarGeometry,
  Sidebar,
  StorageListener,
  SvgContainer,
  ToolbarControl,
  View,
  ViewListener,
  ZoomListener,
  ZoomPanListener,
  Toolbar,
  SidebarCode,
  SidebarToolbox,
} from "./tokens"
import {
  ISidebarAlign,
  ISidebarGeometry,
  ISidebar,
  IEditListener,
  IListener,
  ISelectListener,
  IZoomPanListener,
  IDrawListener,
  IEventEmitter,
  IMenuJson,
  IShortcutListener,
  IToolbarControl,
  IStorageListener,
  IViewListener,
  IToolbar,
  ISidebarCode,
  ISidebarToolbox,
} from "./types"

export function registerBindings(container: Container) {
  container.bind(RootContainer).toConstant(container)

  container.bind(App).toInstance(createApp).inSingletonScope()
  container.bind(View).toInstance(createView).inSingletonScope()
  container.bind(SvgContainer).toInstance(createSvgContainer).inSingletonScope()
  container.bind(ZoomListener).toInstance(createZoomListener).inSingletonScope()
  container.bind(PanListener).toInstance(createPanListener).inSingletonScope()
  container
    .bind(KeyShortcatListener)
    .toInstance(createKeyShortcatListener)
    .inTransientScope()
  container.bind(DragListener).toInstance(createDragListener).inTransientScope()

  container
    .bind(ShortcutListener)
    .toInstance(IShortcutListener)
    .inSingletonScope()
  container
    .bind(ZoomPanListener)
    .toInstance(IZoomPanListener)
    .inSingletonScope()
  container.bind(SelectListener).toInstance(ISelectListener).inSingletonScope()
  container.bind(DrawListener).toInstance(IDrawListener).inSingletonScope()
  container.bind(EditListener).toInstance(IEditListener).inSingletonScope()
  container
    .bind(StorageListener)
    .toInstance(IStorageListener)
    .inSingletonScope()
  container.bind(Listener).toInstance(IListener).inSingletonScope()
  container.bind(ViewListener).toInstance(IViewListener).inSingletonScope()
  container.bind(EventEmitter).toInstance(IEventEmitter).inTransientScope()

  // ********************** core components **********************
  container.bind(SidebarCode).toInstance(ISidebarCode).inSingletonScope()
  container.bind(SidebarAlign).toInstance(ISidebarAlign).inSingletonScope()
  container.bind(SidebarToolbox).toInstance(ISidebarToolbox).inSingletonScope()
  container
    .bind(SidebarGeometry)
    .toInstance(ISidebarGeometry)
    .inSingletonScope()
  container.bind(Sidebar).toInstance(ISidebar).inSingletonScope()
  container.bind(MenuJson).toInstance(IMenuJson).inSingletonScope()
  container.bind(Toolbar).toInstance(IToolbar).inSingletonScope()
  container.bind(ToolbarControl).toInstance(IToolbarControl).inSingletonScope()
}

export function registerInjections() {
  injected(
    createApp,
    MenuJson,
    SvgContainer,
    Sidebar,
    Toolbar,
    ToolbarControl,
    Listener,
  )
  injected(createView, SvgContainer, ToolbarControl, ViewListener)
  injected(
    IZoomPanListener,
    SvgContainer,
    PanListener,
    ZoomListener,
    ShortcutListener,
  )
  injected(createDragListener, SvgContainer)
  injected(
    ISelectListener,
    SvgContainer,
    ShortcutListener,
    EditListener,
    DragListener,
    EventEmitter,
    StorageListener,
  )
  injected(
    IDrawListener,
    SvgContainer,
    EditListener,
    SelectListener,
    DragListener,
    StorageListener,
  )
  injected(
    IEditListener,
    MenuJson,
    SvgContainer,
    EventEmitter,
    Toolbar,
    ToolbarControl,
    StorageListener,
    ShortcutListener,
  )
  injected(IStorageListener, SvgContainer, EventEmitter)
  injected(
    IListener,
    SvgContainer,
    ShortcutListener,
    ZoomPanListener,
    SelectListener,
    EditListener,
    StorageListener,
  )
  injected(IViewListener, SvgContainer, ZoomPanListener, StorageListener)
  injected(IShortcutListener, EventEmitter, StorageListener)

  // ********************** core components **********************
  injected(
    ISidebarCode,
    SvgContainer,
    EventEmitter,
    EditListener,
    DrawListener,
    SelectListener,
    StorageListener,
  )
  injected(
    ISidebarToolbox,
    SvgContainer,
    EventEmitter,
    EditListener,
    DrawListener,
    SelectListener,
    StorageListener,
  )
  injected(
    ISidebarGeometry,
    SvgContainer,
    EventEmitter,
    EditListener,
    DrawListener,
    SelectListener,
    StorageListener,
  )
  injected(
    ISidebarAlign,
    SvgContainer,
    EventEmitter,
    EditListener,
    DrawListener,
    SelectListener,
    StorageListener,
  )
  injected(
    ISidebar,
    SvgContainer,
    EventEmitter,
    EditListener,
    DrawListener,
    SelectListener,
    StorageListener,
    SidebarGeometry,
    SidebarToolbox,
    SidebarCode,
    SidebarAlign,
  )
}

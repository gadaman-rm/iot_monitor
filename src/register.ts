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
  ContextMenu,
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
  Sidebar,
  StorageListener,
  SvgContainer,
  Toolbar,
  View,
  ViewListener,
  ZoomListener,
  ZoomPanListener,
} from "./tokens"
import {
  ISidebar,
  IEditListener,
  IListener,
  ISelectListener,
  IZoomPanListener,
  IDrawListener,
  IEventEmitter,
  IContextMenu,
  IShortcutListener,
  IToolbar,
  IStorageListener,
  IViewListener,
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
  container.bind(Sidebar).toInstance(ISidebar).inSingletonScope()
  container.bind(ContextMenu).toInstance(IContextMenu).inSingletonScope()
  container.bind(Toolbar).toInstance(IToolbar).inSingletonScope()
}

export function registerInjections() {
  injected(createApp, ContextMenu, SvgContainer, Sidebar, Toolbar, Listener)
  injected(createView, SvgContainer, Toolbar, ViewListener)
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
  injected(IEditListener, SvgContainer, EventEmitter, Toolbar, StorageListener)
  injected(IStorageListener, SvgContainer, EventEmitter)
  injected(
    IListener,
    ContextMenu,
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
  injected(ISidebar, EventEmitter, EditListener, DrawListener, SelectListener)
  injected(IContextMenu, SvgContainer)
}

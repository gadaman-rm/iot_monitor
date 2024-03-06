import { Container, token } from 'brandi'
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
} from './types'
import { MoveDragInit } from './core/listener/SelectListener'

export const RootContainer = token<Container>('RootContainer')

export const App = token<CreateAppFn>('App')
export const SvgContainer = token<CreateSvgContainerFn>('SvgContainer')
export const ZoomListener = token<CreateZoomListenerFn>('ZoomListener')
export const PanListener = token<CreatePanListenerFn>('PanListener')
export const KeyShortcatListener = token<CreateKeyShortcatListenerFn>('KeyShortcatListener')
export const DragListener = token<IDragListener<MoveDragInit>>('DragListener')

export const ZoomPanListener = token<IZoomPanListener>('ZoomPanListener')
export const SelectListener = token<ISelectListener>('SelectListener')
export const DrawListener = token<IDrawListener>('DrawListener')
export const EditListener = token<IEditListener>('EditListener')
export const Listener = token<IListener>('Listener')
export const EventEmitter = token<IEventEmitter>('EventEmitter')

// ********************** core components **********************
export const Sidebar = token<ISidebar>('Sidebar')
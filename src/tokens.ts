import { Container, token } from 'brandi'
import { 
    CreateAppFn, 
    CreateDragListenerFn, 
    CreateKeyShortcatListenerFn, 
    CreatePanListenerFn, 
    CreateSvgContainerFn, 
    CreateZoomListenerFn,
    IEditListener,
    IListener,
    ISelectListener,
    IZoomPanListener,
} from './types'

export const RootContainer = token<Container>('RootContainer')

export const App = token<CreateAppFn>('App')
export const SvgContainer = token<CreateSvgContainerFn>('SvgContainer')
export const ZoomListener = token<CreateZoomListenerFn>('ZoomListener')
export const PanListener = token<CreatePanListenerFn>('PanListener')
export const KeyShortcatListener = token<CreateKeyShortcatListenerFn>('KeyShortcatListener')
export const DragListener = token<CreateDragListenerFn>('DragListener')

export const ZoomPanListener = token<IZoomPanListener>('ZoomPanListener')
export const SelectListener = token<ISelectListener>('SelectListener')
export const EditListener = token<IEditListener>('EditListener')
export const Listener = token<IListener>('Listener')

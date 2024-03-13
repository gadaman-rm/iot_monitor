import EventEmitter from "eventemitter3"
import { StorageListener } from "./StorageListener"

export type ShortcutEvent = { 
    type: 'reset-zoom-pan' | 'delete-selected' | 'selecte-all' 
}
export type EmitterEventType = 'shortcut-press'
export class ShortcutListener {
    constructor(public eventEmitter: EventEmitter, public storageListener: StorageListener) {
        // document.addEventListener('keydown', this.handleKeyDown)
        document.addEventListener('keyup', this.handleKeyUp)
    }

    // handleKeyDown = (_e: KeyboardEvent) => {  }
    handleKeyUp = (e: KeyboardEvent) => { 
        // console.log("Up: ", e.code) 
        switch (e.code) {
            case 'KeyA': 
                if(e.ctrlKey) this.emittSelect('selecte-all')
                break
            case 'Digit0': 
                if(e.ctrlKey) this.emittSelect('reset-zoom-pan')
                break
            case 'Delete': 
                this.emittSelect('delete-selected')
                this.storageListener.emitSaveChange(false)
                break
        }
    }

    addEventListener<K extends keyof CustomEventMap>(type: K, fn: (e: CustomEventMap[K]) => void) { this.eventEmitter.on(type, fn) }
    removeEventListener<K extends keyof CustomEventMap>(type: K, fn: (e: CustomEventMap[K]) => void) { this.eventEmitter.removeListener(type, fn) }
    emittSelect(type: ShortcutEvent['type']) { this.eventEmitter.emit('shortcut-press', {type}) }

    removeEvent = () => {
        // document.removeEventListener('keydown', this.handleKeyDown)
        document.removeEventListener('keyup', this.handleKeyUp)
    }
}

interface CustomEventMap {
    "shortcut-press": ShortcutEvent
}

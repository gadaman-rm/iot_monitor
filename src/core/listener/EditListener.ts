import { EditBox, IWidgets, SvgContainer } from "@gadaman-rm/iot-widgets"
import { randomId } from "@gadaman-rm/iot-widgets/math"

export class EditListener {
    svgContainer: SvgContainer
    mode: 'edit' | 'view'
    constructor(svgContainer: SvgContainer) {
        this.svgContainer = svgContainer
        this.mode = 'view'
    }

    select(selectedWidget: IWidgets | null) {
        if (selectedWidget && !this.svgContainer.findWidgetEditBox(selectedWidget)) {
            const x = +selectedWidget.getAttribute('x')!
            const y = +selectedWidget.getAttribute('y')!
            const width = +selectedWidget.getAttribute('width')!
            const height = +selectedWidget.getAttribute('height')!
            const rotate = +selectedWidget.getAttribute('rotate')!
            const origin = selectedWidget.getAttribute('origin')!

            const editBox = new EditBox(randomId(), this.svgContainer, width, height, x, y, rotate, origin)
            editBox.onEditStart = () => { this.mode = 'edit' }
            editBox.onEdit = (e) => {
                const otherEditBoxs = this.svgContainer.editBoxforWidgets.filter(item => item.editBox.id !== editBox.id)

                switch (e.type) {
                    case "move":
                        otherEditBoxs.map((item) => {
                            const x = item.widget.x + (e.x - selectedWidget.x)
                            const y = item.widget.y + (e.y - selectedWidget.y)
                            item.widget.x = x
                            item.widget.y = y
                            item.editBox.x = x
                            item.editBox.y = y
                            return item
                        })
                        break
                    case "rotate":
                        otherEditBoxs.map((item) => {
                            item.editBox.rotate = e.rotate
                            item.widget.rotate = e.rotate
                            return item
                        })
                        break

                    case "rmid-resize":
                        otherEditBoxs.map((item) => {
                            item.editBox.width = e.width
                            item.widget.width = e.width
                            return item
                        })
                        break
                    case "bmid-resize":
                        otherEditBoxs.map((item) => {
                            item.editBox.height = e.height
                            item.widget.height = e.height
                            return item
                        })
                        break

                    case "br-resize":
                        otherEditBoxs.map((item) => {
                            item.editBox.width = e.width
                            item.widget.width = e.width
                            item.editBox.height = e.height
                            item.widget.height = e.height
                            return item
                        })
                        break
                }

                selectedWidget.width = e.width
                selectedWidget.height = e.height
                selectedWidget.rotate = e.rotate
                selectedWidget.origin = e.origin
                selectedWidget.x = e.x
                selectedWidget.y = e.y
            }
            editBox.onEditEnd = () => { setTimeout(() => { this.mode = 'view' }, 0) }
            this.svgContainer.addWidgetEditBox(selectedWidget, editBox)
        }
    }
}

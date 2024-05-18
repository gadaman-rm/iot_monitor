import { Gauge, Slider } from "@gadaco/iot-widgets"
import { random, randomItem } from "@gadaco/iot-widgets/math"
import { App } from "./app"

export const startTest = (app: App, number = 2000) => {
  console.log(`Start creating ${number} Widgets!`)
  for (let i = 0; i < number; i++) {
    const widget = randomItem([new Gauge(), new Slider()])

    widget.x = random(0, 8000)
    widget.y = random(0, 8000)
    widget.width = random(50, 100)
    // widget.height = random(15, 30)
    widget.rotate = random(0, 180)

    app.push(widget)
  }
  console.log(`${number} Widgets created successfully!`)
}

import { Gauge, Slider } from '@gadaman-rm/iot-widgets'
import { random, randomId, randomItem } from '@gadaman-rm/iot-widgets/math'
import { App } from './app'

export const startTest = (app: App, number = 2000) => {
    console.log(`Start creating ${number} Widgets!`)
    for (let i = 0; i < number; i++) {
        const x = random(0, 8000)
        const y = random(0, 8000)
        const width = random(50, 100)
        const height = random(50, 100)
        const rotate = random(0, 180)
        const type = randomItem([
            new Gauge(randomId(), width, height, x, y, rotate),
            new Slider(randomId(), width, height, x, y, rotate),
        ]) as any
        
        app.push(type)
    }
    console.log(`${number} Widgets created successfully!`);
}

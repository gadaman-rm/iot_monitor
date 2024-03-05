import "@material/web/iconbutton/icon-button"
import "@material/web/textfield/filled-text-field"
import './reset.scss'
import './app.scss'
// import { startTest } from './test'
import { container } from '../container'
import { App } from '../tokens'
import { startTest } from "./test"

const slTest = document.createElement('div')
slTest.innerHTML =`
<div is='g-slider' width="200" x="200" y="400">
</div>
`

const app = container.get(App)
app.push(slTest as any)
startTest(app, 500)

import { Router } from "../../router/router.js"
import "../../router/router-outlet.ts"
import "@material/web/button/text-button"
import "./index.scss"
import { choosePlan, getPlans, GetPlans, svaePlan } from '../../src/api/edit.ts'
import { isAuthoriz, OK_SYM, signOut } from '../../src/api/utility.ts'
import { MdIconButton } from '@material/web/iconbutton/icon-button'
import "@material/web/textfield/filled-text-field"
import { MdFilledTextField } from "@material/web/textfield/filled-text-field"
import { access } from "../../src/api/auth.ts"

const router = new Router()
router.addRoute("/", "panel-component")
router.addRoute("/dynamic", "dynamic-component")

export class Panel extends HTMLElement {
  isLoaded = false
  isError = false
  plans: GetPlans['plans']
  newPlanName = ''

  constructor() {
    super()
    this.innerHTML = `<h1>Panel</h1><p>Loading...<p>`
    access().then(data => {
      if (data[OK_SYM]) {
        getPlans().then(data => {
          this.isLoaded = true
          if (data[OK_SYM]) this.plans = this.plans = data.body!.plans
          this.render()
        }).catch(error => {
          this.isError = true
          throw error
        })
      } else {
        window.location.pathname = "/pages/signin.html"
      }
    })
    .catch( e => { window.location.pathname = "/pages/signin.html" })
  }

  render() {
    const strPlan = this.plans.reduce((p, c) => {
      return p + `<div id="i${c._id}" class="plan-item">${c.name}</div>`
    }, '')
    this.innerHTML = `
      <h1>Panel</h1>
      <md-icon-button id="new-plan">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
      </md-icon-button>
      <div class="plans">
        ${strPlan}
      <div>

      <div class="modal">
      <div class="modal_backdrop"></div>
      <dialog class="modal_dialog">
        <div class="modal_dialog_body">
            <md-icon-button class="modal_close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            </md-icon-button>
            <md-filled-text-field class="modal_plan-name" label="Plan Name" type="text"></md-filled-text-field>
            <md-icon-button class="modal_ok">OK</md-icon-button>
          </dialog>
        </div>
      </div>
    `

    const dialogRef = this.querySelector<HTMLDialogElement>('.modal_dialog')!
    const dialogBackdropRef = this.querySelector<HTMLDivElement>('.modal_backdrop')!
    const dialogCloseButtonRef = this.querySelector<HTMLDialogElement>('.modal_close')!
    const dialogOkButtonRef = this.querySelector<HTMLDialogElement>('.modal_ok')!
    const dialogPlanNameRef = this.querySelector<MdFilledTextField>('.modal_plan-name')!
    dialogPlanNameRef.addEventListener('input', e => this.newPlanName = (e.target as any).value)

    dialogCloseButtonRef.addEventListener('click', e => {
      dialogRef.open = false
      dialogBackdropRef.style.display = 'none'
      dialogPlanNameRef.value = ""
    })

    dialogOkButtonRef.addEventListener('click', e => {
      svaePlan(this.newPlanName, "[]").then(saveData => { if (saveData[OK_SYM]) window.location.href = `/app.html` })

      dialogRef.open = false
      dialogBackdropRef.style.display = 'none'
      dialogPlanNameRef.value = ""
    })

    this.querySelector<MdFilledTextField>('#new-plan')!.addEventListener('click', e => { 
      dialogBackdropRef.style.display = 'block'
      dialogRef.open = true
    })
    /************************ modal ************************/

    this.plans.forEach(item => {
      this.querySelector<HTMLDivElement>("#i" + item._id)!.addEventListener('click', () => {
        choosePlan(item._id).then(data => { if (data[OK_SYM]) window.location.href = `/app.html` })
      })
    })

  }
}

customElements.define("panel-component", Panel)


// customElements.define(
//   "dynamic-component",
//   class extends HTMLElement {
//     connectedCallback(): void {
//       this.innerHTML = "<h1>Dynamic</h1>"
//     }
//   }
// )

router.init()

document.getElementById("signoutBtn")?.addEventListener("click", () => signOut())

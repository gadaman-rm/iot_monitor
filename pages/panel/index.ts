import { Router } from "../../router/router.js"
import "../../router/router-outlet.ts"
import "@material/web/button/text-button"
import "./index.scss"
import { choosePlan, deletePlan, getPlans, GetPlans, savePlan } from '../../src/api/edit.ts'
import { OK_SYM, signOut } from '../../src/api/utility.ts'
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
    this.checkAccess()
  }

  checkAccess() {
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
      .catch(e => { window.location.pathname = "/pages/signin.html" })
  }

  render() {
    const strPlan = this.plans.reduce((p, c) => {
      return p + `<div class="plan-item">
      ${c.name}
        <div class="plan-actions">
          <md-icon-button id="d_${c._id}">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
          </md-icon-button>

          <md-icon-button id="v_${c._id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
          </md-icon-button>

          <md-icon-button id="e_${c._id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
          </md-icon-button>

        </div>
      </div>`
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

    dialogBackdropRef.addEventListener('click', e => {
      dialogRef.open = false
      dialogBackdropRef.style.display = 'none'
      dialogPlanNameRef.value = ""
    })

    dialogOkButtonRef.addEventListener('click', e => {
      savePlan(this.newPlanName, "[]").then(saveData => { if (saveData[OK_SYM]) window.location.href = `/edit.html` })

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
      // Edit button click
      this.querySelector<MdIconButton>("#e_" + item._id)!.addEventListener('click', () => {
        choosePlan(item._id).then(data => { if (data[OK_SYM]) window.location.href = `/edit.html` })
      })

      // View button click
      this.querySelector<MdIconButton>("#v_" + item._id)!.addEventListener('click', () => {
        choosePlan(item._id).then(data => { if (data[OK_SYM]) window.location.href = `/view.html` })
      })

      // Delete button click
      this.querySelector<MdIconButton>("#d_" + item._id)!.addEventListener('click', () => {
        deletePlan(item._id).then(data => { if (data[OK_SYM]) this.checkAccess() })
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

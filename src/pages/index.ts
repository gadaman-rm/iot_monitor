import "../theme"
import { Modal } from "@gadaco/iot-widgets/components"
import "@gadaco/iot-widgets/components"
import "./index.scss"
import { access, signOut } from "../api/auth"
import "@material/web/button/text-button"
import { OK_SYM } from "../api/utility"
import {
  GetPlans,
  choosePlan,
  deletePlan,
  getPlans,
  savePlan,
} from "../api/edit"
import "@material/web/textfield/filled-text-field"
import { MdFilledTextField } from "@material/web/textfield/filled-text-field"
import { MdFilledIconButton } from "@material/web/iconbutton/filled-icon-button"
import "@material/web/iconbutton/filled-icon-button"
import "@material/web/dialog/dialog"

let newPlanName: string
const dialogRef = document.querySelector<Modal>("#modal")!
const plansRef = document.querySelector<Modal>("#plans")!
const dialogOkButtonRef =
  document.querySelector<HTMLDialogElement>("#modal_ok")!
const dialogPlanNameRef =
  document.querySelector<MdFilledTextField>(".modal_plan-name")!

document
  .querySelector<MdFilledTextField>("#new-plan")!
  .addEventListener("click", () => {
    dialogRef.open = true
  })

document.getElementById("signoutBtn")?.addEventListener("click", () => {
  signOut().then((data) => {
    if (data[OK_SYM]) window.location.pathname = "/signin.html"
  })
})

dialogPlanNameRef.addEventListener(
  "input",
  (e) => (newPlanName = (e.target as any).value),
)

dialogOkButtonRef.addEventListener("click", () => {
  savePlan(newPlanName, "[]").then((saveData) => {
    if (saveData[OK_SYM]) window.location.href = `/edit.html`
  })

  dialogRef.open = false
  dialogPlanNameRef.value = ""
})

const render = (plans: GetPlans["plans"]) => {
  const strPlan = plans.reduce((p, c) => {
    return (
      p +
      `<div class="plan-item">
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
    )
  }, "")

  plansRef.innerHTML = strPlan

  /************************ modal ************************/

  plans.forEach((item) => {
    // Edit button click
    document
      .querySelector<MdFilledIconButton>("#e_" + item._id)!
      .addEventListener("click", () => {
        choosePlan(item._id).then((data) => {
          if (data[OK_SYM]) window.location.href = `/edit.html`
        })
      })

    // View button click
    document
      .querySelector<MdFilledIconButton>("#v_" + item._id)!
      .addEventListener("click", () => {
        choosePlan(item._id).then((data) => {
          if (data[OK_SYM]) window.location.href = `/view.html`
        })
      })

    // Delete button click
    document
      .querySelector<MdFilledIconButton>("#d_" + item._id)!
      .addEventListener("click", () => {
        deletePlan(item._id).then((data) => {
          if (data[OK_SYM]) checkAccess()
        })
      })
  })
}

const checkAccess = () => {
  plansRef.innerHTML = `<p>Loading...<p>`

  access()
    .then((data) => {
      if (data[OK_SYM]) {
        getPlans()
          .then((data) => {
            if (data[OK_SYM]) {
              render(data.body!.plans)
            }
          })
          .catch((error) => {
            throw error
          })
      } else {
        window.location.pathname = "/signin.html"
      }
    })
    .catch((_e) => {
      window.location.pathname = "/signin.html"
    })
}

checkAccess()

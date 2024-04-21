import { errorHandler } from "./utility"

export interface GetPlans {
  plans: { _id: string; name: string }[]
  msg: string
}
export const getPlans = async () => {
  return errorHandler<GetPlans>(() =>
    fetch("/api/load_all_plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
  )
}

export interface GetPlan {
  _id: string
  name: string
  widgets: string
}
export interface GetPlanJsonWidget {
  is: string
  id: string
  x: number
  y: number
  width: number
  height: number
  ratio: number
  rotate: number
  originStr: string
}
export const getPlan = async () => {
  return errorHandler<GetPlan>(() =>
    fetch("/api/load_plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
  )
}

export interface ChoosePlan {
  msg: string
}
export const choosePlan = async (id: string) => {
  return errorHandler<ChoosePlan>(() =>
    fetch("/api/choose_plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    }),
  )
}

export interface SavePlan {
  _id: string
  msg: string
}
export const savePlan = async (
  planName: string,
  widgets: GetPlan["widgets"],
) => {
  return errorHandler<SavePlan>(() =>
    fetch("/api/save_plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: planName,
        widgets: JSON.stringify(widgets),
      }),
    }),
  )
}

export interface UpdatePlan {
  _id: string
  msg: string
}
export const updatePlan = async (
  planName: string,
  widgets: GetPlanJsonWidget[],
) => {
  return errorHandler<UpdatePlan>(() =>
    fetch("/api/update_plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: planName,
        widgets: JSON.stringify(widgets),
      }),
    }),
  )
}

export interface DeletePlan {
  msg: string
}
export const deletePlan = async (id: string) => {
  return errorHandler<DeletePlan>(() =>
    fetch("/api/delete_plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    }),
  )
}

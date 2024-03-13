//signup.ts
import "@material/web/button/filled-button.js";
import "@material/web/button/outlined-button.js";
import "@material/web/button/text-button";
import "@material/web/textfield/outlined-text-field";
import "@material/web/icon/icon";
import "./signup.scss";

const signupPart = document.getElementById("signupPart") as HTMLElement;
signupPart.style.display = "block";
const verifyPart = document.getElementById("verifyPart") as HTMLElement;
verifyPart.style.display = "block";
const finishPart = document.getElementById("finishPart") as HTMLElement;
finishPart.style.display = "block";
const smsIconElement = document.getElementById("smsIcon") as HTMLElement;
const remainTimeElement = document.getElementById("remainTime") as HTMLElement;
let codeViewTimeout: ReturnType<typeof setTimeout>;

async function signup() {
  const fullname = (document.getElementById("fullname") as HTMLInputElement).value;
  const username = (document.getElementById("username") as HTMLInputElement).value;
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ fullname, username }),
    });
    console.log(response);
    if (response.ok) {
      console.log("Signup successful");
      const responseData = await response.json();
      console.log("Server response:", responseData);
      addHideClassToElement(signupPart);
      addShowClassToElement(verifyPart);
      let remainCodeViewTime = responseData.remainVerifyTime;
      const codeViewTimer = setInterval(() => {
        if (remainCodeViewTime > 0) remainCodeViewTime--;
        remainTimeElement.innerHTML = remainCodeViewTime;
        if (remainCodeViewTime % 5 == 0) {
          toggleHideClass(smsIconElement);
          toggleHideClass(remainTimeElement);
        }
      }, 1000);
      codeViewTimeout = setTimeout(() => {
        addHideClassToElement(verifyPart);
        addHideClassToElement(finishPart);
        addShowClassToElement(signupPart);
        clearInterval(codeViewTimer);
      }, remainCodeViewTime * 1000);
    } else {
      console.error("Signup failed:", response.statusText);
      const responseData = await response.json();
      console.log("Server response:", responseData);
    }
  } catch (error) {
    console.error("Error during signup:", error);
  }
}

async function verify() {
  const code = (document.getElementById("code") as HTMLInputElement).value;
  try {
    const response = await fetch("/api/verify", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ code }),
    });
    console.log(response);
    if (response.ok) {
      console.log("Verify successful");
      const responseData = await response.json();
      console.log("Server response:", responseData);
      addHideClassToElement(signupPart);
      addHideClassToElement(verifyPart);
      addShowClassToElement(finishPart);
      clearTimeout(codeViewTimeout);
    } else {
      console.error("Signup failed:", response.statusText);
      const responseData = await response.json();
      console.log("Server response:", responseData);
    }
  } catch (error) {
    console.error("Error during signup:", error);
  }
}

function addHideClassToElement(element: HTMLElement) {
  element.classList.remove("show");
  element.classList.add("hide");
}

function addShowClassToElement(element: HTMLElement) {
  element.classList.remove("hide");
  element.classList.add("show");
}

function toggleHideClass(element: HTMLElement) {
  if (element.classList.contains("show")) {
    element.classList.remove("show");
    element.classList.add("hide");
  } else if (element.classList.contains("hide")) {
    element.classList.remove("hide");
    element.classList.add("show");
  }
}

function navigatePanel() {
  window.location.pathname = '/';
}

function navigateSignin() {
  window.location.pathname = '/pages/signin.html';
}

document.getElementById("signupBtn")?.addEventListener("click", signup);
document.getElementById("verifyBtn")?.addEventListener("click", verify);
document.getElementById("signinBtn")?.addEventListener("click", navigateSignin);
document.getElementById("panelBtn")?.addEventListener("click", navigatePanel);
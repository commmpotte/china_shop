(()=>{"use strict";const e=e=>{e.classList.remove("show"),setTimeout((()=>{e.classList.remove("d-block")}),500)};(()=>{const t=document.getElementById("auth-modal"),o=document.getElementById("open-auth-btn"),s=t.querySelectorAll(".close-btn"),l=t.querySelector(".login-btn"),n=document.getElementById("open-cart-btn"),a=document.getElementById("logout-btn"),c=()=>{o.classList.add("d-none"),n.classList.remove("d-none"),a.classList.remove("d-none"),e(t)};o.addEventListener("click",(()=>{(e=>{e.classList.add("d-block"),setTimeout((()=>{e.classList.add("show")}),500)})(t)})),s.forEach((o=>{o.addEventListener("click",(()=>{e(t)}))})),l.addEventListener("click",(()=>{const e=t.querySelector("#login-control"),o=t.querySelector("#password-control"),s={login:e.value,password:o.value};""!==e.value&&""!==o.value||alert("Заполните все поля для успешной авторизации"),localStorage.setItem("auth",JSON.stringify(s)),c()})),a.addEventListener("click",(()=>{localStorage.removeItem("auth"),o.classList.remove("d-none"),n.classList.add("d-none"),a.classList.add("d-none")})),JSON.parse(localStorage.getItem("auth"))&&c()})()})();
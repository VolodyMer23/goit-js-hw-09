const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");console.log(t),t.addEventListener("click",(function(){t.disabled=!0,document.body.style.backgroundColor=n(),o=setInterval((()=>{document.body.style.backgroundColor=n()}),1e3)})),e.addEventListener("click",(function(){o&&(t.disabled=!1,clearInterval(o))}));let o=null;function n(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}
//# sourceMappingURL=01-color-switcher.0119da44.js.map
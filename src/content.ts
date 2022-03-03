const bgcolor = "lightpink";

const sleep = new Promise(resolve => setTimeout(resolve, 1000))

sleep.then(draw);

function draw() {
  const portalApps = document.getElementsByTagName("portal-application");

  portalApps[0].addEventListener("click", (event) => {
    const elements = document.getElementsByClassName("name");
    Array.prototype.forEach.call(elements, (element) => {
      if (element.textContent.match(/PROD-*/)) {
        element.parentElement.parentElement.style.backgroundColor = bgcolor;
      }
    });
  });
}

const bgcolor = "lightpink";

var sleep = new Promise(resolve => setTimeout(resolve, 1000))

sleep.then(draw);

function draw() {
  var portalApps = document.getElementsByTagName("portal-application");

  portalApps[0].addEventListener("click", (event) => {
    var elements = document.getElementsByClassName("name");
    Array.prototype.forEach.call(elements, (element) => {
      if (element.textContent.match(/PROD-*/)) {
        element.parentElement.parentElement.style.backgroundColor = bgcolor;
      }
    });
  });
}

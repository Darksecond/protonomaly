window.addEventListener("load", function () {
  init_gallery();
  init_lightbox();
});

let gallery = [];
let galleryIndex = 0;

function init_gallery() {
  let elements = document.getElementsByClassName("in-gallery");
  if (elements.length == 0) return;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    gallery.push(element.src);
    element.dataset.galleryIndex = i;

    element.addEventListener("click", function () {
      open_gallery(element);
    });

    element.classList.add("hover");
  }

  document.addEventListener("keydown", function (event) {
    if (is_lightbox_open()) {
      if (event.key === "ArrowRight") {
        next_gallery();
      } else if (event.key === "ArrowLeft") {
        prev_gallery();
      }
    }
  });
}

function open_gallery(element) {
  galleryIndex = parseInt(element.dataset.galleryIndex);
  let src = gallery[galleryIndex];
  open_lightbox(src);
}

function next_gallery() {
  galleryIndex = (galleryIndex + 1) % gallery.length;
  let src = gallery[galleryIndex];
  open_lightbox(src);
}

function prev_gallery() {
  galleryIndex = (galleryIndex - 1 + gallery.length) % gallery.length;
  let src = gallery[galleryIndex];
  open_lightbox(src);
}

function init_lightbox() {
  let t = document.createElement("div");
  t.id = "lightbox";
  t.onclick = close_lightbox;
  t.innerHTML = '<div id="close">×</div><img id="lightbox-image">';

  let body = document.getElementsByTagName("body")[0];
  body.appendChild(t);

  document.addEventListener("keydown", function (event) {
    if (is_lightbox_open()) {
      if (event.key === "Escape") {
        close_lightbox();
      }
    }
  });
}

function open_lightbox(src) {
  document.getElementById("lightbox-image").src = src;
  document.getElementById("lightbox").style.display = "flex";
}

function close_lightbox() {
  document.getElementById("lightbox").style.display = "none";
  document.getElementById("lightbox-image").src = "";
}

function is_lightbox_open() {
  return document.getElementById("lightbox").style.display != "none";
}

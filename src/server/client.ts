import { Application } from "@hotwired/stimulus";
import "@hotwired/turbo";

document.addEventListener("turbo:load", () => {
  document
    .querySelector("nav > ul > li:last-child > a")
    .removeAttribute("style");
});

Application.start();

// image-slot — custom element for swappable hero photography.
// Drop a real <img> or background-image inside <image-slot> to replace the placeholder.
(function () {
  if (customElements.get("image-slot")) return;
  class ImageSlot extends HTMLElement {
    connectedCallback() {
      if (!this.style.display) this.style.display = "block";
      if (!this.style.width) this.style.width = "100%";
      if (!this.style.height) this.style.height = "100%";
    }
  }
  customElements.define("image-slot", ImageSlot);
})();

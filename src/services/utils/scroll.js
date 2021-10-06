class BodyScroll {
  static enable() {
    console.debug("enableScroll");
    document.body.classList.remove("noscroll");
  }

  static disable() {
    console.debug("disableScroll");
    document.body.classList.add("noscroll");
  }
}

export { BodyScroll };

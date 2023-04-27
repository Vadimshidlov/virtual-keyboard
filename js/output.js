export default class Output {
  constructor() {
    this.content = "";
    this.language = "eng";
    this.element = document.createElement("textarea");
    this.element.classList.add("text_area");
    this.element.innerText = this.content;
    this.element.autofocus = true;
    this.sectionKeyboardItems = document.createElement("section");
    this.sectionKeyboardItems.classList.add("keyboard_items");
  }
}

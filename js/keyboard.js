import Output from "./output.js";

class VirtualKeyboard extends Output {
  constructor() {
    super();
    this.main = null;
    this.keyboard = null;
  }

  getKeyboard(keyboardKeysLang) {
    // create main-block
    this.main = document.createElement("div");
    this.main.classList.add("_container");
    // create header
    const header = document.createElement("header");
    header.classList.add("header");
    const headerTitle = document.createElement("h3");
    headerTitle.textContent = "RS School Virtual Keyboard";
    headerTitle.classList.add("header_title");
    header.append(headerTitle);
    this.main.append(header);
    document.body.append(this.main);

    // create keyboard
    const bodyKeyboard = document.createElement("main");
    bodyKeyboard.classList.add("page");
    const sectionText = document.createElement("section");
    sectionText.classList.add("text");
    // const textArea = document.createElement("textarea");
    // textArea.classList.add("text_area");
    // textArea.innerText = this.output;
    const textArea = this.element;
    const sectionKeyboard = document.createElement("section");
    sectionKeyboard.classList.add("keyboard");
    // const sectionKeyboardItems = document.createElement("section");
    this.sectionKeyboardItems = this.getKeyboardItems(
      keyboardKeysLang,
      this.shiftState
    );
    this.sectionKeyboardItems.classList.add("keyboard_items");
    sectionText.append(textArea);
    // sectionKeyboard.append(sectionKeyboardItems);
    sectionKeyboard.append(sectionText);
    sectionKeyboard.append(this.sectionKeyboardItems);
    this.main.append(sectionKeyboard);
  }
}

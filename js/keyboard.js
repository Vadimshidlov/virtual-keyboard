import Output from "./output.js";
import { keyboardKeysEng, keyboardKeysRu } from "./keys.js";

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

  getKeyboardItems(keysLang, shiftState = false) {
    const section = document.createElement("section");
    const notLetters = [
      "CapsLock",
      "Enter",
      "ShiftLeft",
      "ShiftRight",
      "ControlLeft",
      "Space",
      "AltRight",
      "AltLeft",
      "ControlRight",
      "Tab",
      "AltLeft",
      "Backspace",
      "Delete",
    ];

    // keyLayout.forEach((item) => {
    Object.keys(keysLang).forEach((key) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = keysLang[key];

      btn.classList.add("keyboard_item");
      if (!notLetters.includes(key)) {
        btn.setAttribute("keyType", "textBtn");
        btn.addEventListener("click", () => {
          if (btn.classList.contains("keyboard_item_uppercase")) {
            this.setValue(keysLang[key].toUpperCase());
          } else {
            this.setValue(keysLang[key]);
          }
        });
      }

      switch (key) {
        case "Backspace":
          const btnBackspaceImg = document.createElement("img");
          btnBackspaceImg.src = keysLang[key];
          btnBackspaceImg.classList.add("keyboard_item-image");
          btn.innerHTML = "";
          btn.appendChild(btnBackspaceImg);
          break;

        case "CapsLock":
          btn.classList.add("keyboard_item_caps");
          break;
        case "Enter":
          btn.classList.add("keyboard_item_enter");
          break;
        case "ShiftLeft":
          btn.classList.add("keyboard_item_Shift");
          break;
        case "ShiftRight":
          btn.classList.add("keyboard_item_ShiftRgt");
          break;
        case "Space":
          btn.classList.add("keyboard_item_large-space");
          break;

        default:
          break;
      }
      section.append(btn);
    });

    return section;
  }
}

const keyboard = new VirtualKeyboard();

window.addEventListener("DOMContentLoaded", () => {
  keyboard.getKeyboard(keyboardKeysEng);
});

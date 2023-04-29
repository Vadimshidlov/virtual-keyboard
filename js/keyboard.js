import Output from "./output.js";
import { keyboardKeysEng, keyboardKeysRu } from "./keys.js";

class VirtualKeyboard extends Output {
  constructor() {
    super();
    this.main = null;
    this.keyboard = null;
    this.shiftState = false;
    this.notLetters = null;
    this.keyslang = null;
  }

  addEventListeners() {
    // window.addEventListener("keydown", (event) => {
    //   const btnAltLeft = document.getElementById("AltLeft");
    //   const btnShiftLeft = document.getElementById("ShiftLeft");
    //   if (
    //     (event.code === "ShiftLeft" && event.altKey) ||
    //     (event.code === "ShiftRight" && event.altKey)
    //   ) {
    //     e.preventDefault();
    //     // btnAltLeft.classList.add("keyboard_item_active");
    //     // btnShiftLeft.classList.add("keyboard_item_active");
    //     this.setLanguage();
    //     // setTimeout(() => {
    //     //   btnAltLeft.classList.remove("keyboard_item_active");
    //     //   btnShiftLeft.classList.remove("keyboard_item_active");
    //     // }, 50);
    //   }
    //   // if (
    //   //   (event.code === "ShiftLeft" && event.altKey) ||
    //   //   (event.code === "ShiftRight" && event.altKey)
    //   // ) {}
    // });

    window.addEventListener("keydown", (e) => {
      if ((e.code === "ShiftLeft" || e.code === "ShiftRight") && !e.altKey) {
        if (this.shiftState) {
          return;
        }
        this.shift();
      }
      e.preventDefault();
      const keyCaps = document.querySelector(
        ".keyboard_item.keyboard_item_caps"
      );
      // if (this.shiftState) {
      //   this.setValue(this.keyslang[e.code].toUpperCase());
      //   return;
      // }

      if (this.notLetters.indexOf(e.code) === -1) {
        if (keyCaps.classList.contains("caps-on") || this.shiftState) {
          console.log("value from caps setValuelistener -->");
          this.setValue(this.keyslang[e.code].toUpperCase());
        } else {
          this.setValue(this.keyslang[e.code].toLowerCase());
        }
      }
    });

    const keyListener = (e) => {
      const keys = document.querySelectorAll(".keyboard_item");
      for (let i = 0; i < keys.length; i += 1) {
        if (e.code !== "CapsLock") {
          if (
            // this.keyslang[e.code] === keys[i].textContent ||
            // this.keyslang[e.code] === keys[i].textContent.toUpperCase() ||
            e.code === keys[i].id
          ) {
            keys[i].classList.add("keyboard_item_active");
          }
        }
        console.log("ecode", e.code);
        console.log("ekey", e.key);
      }
      console.log("id", keys[0].id);
    };

    window.addEventListener("keydown", keyListener);

    window.addEventListener("keyup", (e) => {
      const keys = document.querySelectorAll(".keyboard_item");
      for (let i = 0; i < keys.length; i += 1) {
        // if (e.code !== "CapsLock") {
        //   setTimeout(() => {
        //     keys[i].classList.remove("keyboard_item_active");
        //   }, 50);
        // }
        if (e.code !== "CapsLock") {
          if (
            // this.keyslang[e.code] === keys[i].textContent ||
            // this.keyslang[e.code] === keys[i].textContent.toUpperCase() ||
            e.code === keys[i].id
          ) {
            setTimeout(() => {
              keys[i].classList.remove("keyboard_item_active");
            }, 50);
          }
        }
      }
    });

    const shiftKeyUp = (e) => {
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
        this.shiftState = false;
        this.main.remove();
        this.getKeyboard();
      }

      // if (e.code === "CapsLock") {
      //   this.capsState = false;
      // }

      console.log(`this.capsState`, this.capsState);
    };
    window.addEventListener("keyup", shiftKeyUp);

    window.addEventListener("keydown", (e) => {
      if (e.code === "Tab") {
        e.preventDefault();
        this.setValue("  ");
      }
      if (e.code === "Space") {
        e.preventDefault();
        this.setValue(" ");
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.code === "CapsLock") {
        const capsBtn = document.querySelector(".keyboard_item_caps");
        capsBtn.classList.toggle("keyboard_item_active");
        this.capsLock();
        // console.log(`this.capsState`, this.capsState);
        return;
      }
      if (e.code === "Backspace") {
        this.backSpace();
      }
      if (e.code === "Enter") {
        this.enter();
      }
      if (e.code === "Delete") {
        this.delete();
      }
    });
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

      if (key === "CapsLock") {
        btn.addEventListener("click", () => {
          btn.classList.toggle("keyboard_item_active");
          this.capsLock();
        });
        // btn.addEventListener('keydown', () => {
        //   console.log('hello');
        //   btn.classList.toggle('keyboard_item_active');
        //   this.capsLock();
        // });
      }
      if (key === "Space") {
        btn.addEventListener("click", () => {
          this.setValue(" ");
          // this.content += ' ';
        });
      }
      if (key === "Enter") {
        btn.addEventListener("click", () => {
          this.enter();
          // this.content += ' ';
        });
      }
      if (key === "Tab") {
        btn.addEventListener("click", () => {
          // this.content += '  ';
          this.setValue("  ");
        });
      }
      if (key === "Backspace") {
        btn.addEventListener("click", () => {
          console.log("ky");
          this.backSpace();
        });
      }
      if (key === "Delete") {
        btn.addEventListener("click", () => {
          console.log("del");
        });
      }
      if (key === "ShiftLeft") {
        btn.addEventListener("mousedown", () => {
          console.log("shift");
        });
      }

      btn.addEventListener("mousedown", (e) => {
        if (btn.innerText !== "CapsLock") {
          e.preventDefault();
          btn.classList.add("keyboard_item_active");
        }
      });

      btn.addEventListener("mouseup", () => {
        if (btn.innerText !== "CapsLock") {
          btn.classList.remove("keyboard_item_active");
        }
      });

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

  setLanguage(event) {
    if (
      (event.code === "ShiftLeft" && event.altKey) ||
      (event.code === "ShiftRight" && event.altKey)
    ) {
      console.log("Change language");

      if (localStorage.getItem("language") === "ru") {
        this.main.remove();
        localStorage.setItem("language", "eng");
        this.getKeyboard(keyboardKeysEng);
        console.log("rerender");
        console.log(localStorage);
      } else if (localStorage.getItem("language") === "eng") {
        this.main.remove();
        localStorage.setItem("language", "ru");
        this.getKeyboard(keyboardKeysRu);
        console.log("rerender");
        console.log(localStorage);
      }
    }
  }

  shift() {
    this.shiftState = true;
    this.main.remove();
    this.getKeyboard();
    if (this.capsState) {
      this.capsState = false;
    }
  }

  setValue(value) {
    const str = this.content;
    if (
      str.length !== 0 &&
      this.element.selectionStart === 0 &&
      this.element.selectionEnd === 0
    ) {
      this.content = value + str;
      this.element.value = this.content;
      this.element.selectionStart = 0;
      this.element.selectionEnd = 0;
      return;
    }

    if (
      str.length !== 0 &&
      this.element.selectionStart === 0 &&
      this.element.selectionEnd === str.length
    ) {
      this.content = value;
      this.element.value = this.content;
      return;
    }

    if (
      this.element.selectionStart !== 0 &&
      this.element.selectionStart !== this.content.length &&
      this.element.selectionEnd === this.element.selectionStart
    ) {
      const caret = this.element.selectionStart + 1;
      this.content =
        str.slice(0, this.element.selectionStart) +
        value +
        str.slice(this.element.selectionStart, str.length);
      this.element.value = this.content;
      this.element.selectionStart = caret;
      this.element.selectionEnd = caret;
      return;
    }
    console.log("str", str);
    console.log(value);
    this.content += value;
    this.element.value = this.content;
  }

  backSpace() {
    console.log("backspace");
    this.element.focus();
    if (this.element.selectionStart === 0 && this.element.selectionEnd === 0) {
      return;
    }

    if (
      this.element.selectionStart !== 0 &&
      this.element.selectionStart !== this.content.length &&
      this.element.selectionStart === this.element.selectionEnd
    ) {
      const start = this.content.slice(0, this.element.selectionStart - 1);
      const end = this.content.slice(
        this.element.selectionStart,
        this.content.length
      );
      const caret = this.element.selectionStart - 1;
      console.log("caret from backspace", caret);
      const res = start + end;
      console.log(start);
      console.log(end);
      this.content = res;

      this.element.value = this.content;
      this.element.selectionStart = caret;
      this.element.selectionEnd = caret;
      console.log("caret", caret);
      return;
    }

    if (this.element.selectionStart === this.content.length) {
      console.log(this.content);
      this.content = this.content.slice(0, -1);
      this.element.value = this.content;
      console.log("end");
      return;
    }

    if (
      this.element.selectionStart === 0 &&
      this.element.selectionEnd === this.content.length
    ) {
      this.content = "";
      this.element.value = this.content;
      console.log("full");
      return;
    }

    console.log(this.content);
    this.content = this.content.slice(0, -1);
    this.element.value = this.content;
  }

  delete() {
    this.element.focus();
    if (this.element.selectionStart === 0 && this.element.selectionEnd === 0) {
      const str = this.content.slice(1, this.content.length);
      this.content = str;
      this.element.value = this.content;
      this.element.selectionStart = 0;
      this.element.selectionEnd = 0;
      return;
    }
    if (
      this.element.selectionStart !== 0 &&
      this.element.selectionStart !== this.content.length &&
      this.element.selectionStart === this.element.selectionEnd
    ) {
      const start = this.content.slice(0, this.element.selectionStart);
      const end = this.content.slice(
        this.element.selectionStart + 1,
        this.content.length
      );
      const caret = this.element.selectionStart;
      const res = start + end;
      console.log(start);
      console.log(end);
      this.content = res;

      this.element.value = this.content;
      console.log("center");
      this.element.selectionStart = caret;
      this.element.selectionEnd = caret;
      return;
    }
    if (
      this.element.selectionStart === 0 &&
      this.element.selectionEnd === this.content.length
    ) {
      this.content = "";
      this.element.value = this.content;
      console.log("full");
    }
  }

  enter() {
    const caret = this.element.selectionStart;
    this.setValue("\n");
    this.element.selectionStart = caret + 1;
    this.element.selectionEnd = caret + 1;
  }

  capsLock() {
    const buttons = this.sectionKeyboardItems;
    this.capsState = true;
    const keyCaps = document.querySelector(".keyboard_item_caps");
    keyCaps.classList.toggle("caps-on");
    buttons.childNodes.forEach((el) => {
      if (el.getAttribute("keyType")) {
        el.classList.toggle("keyboard_item_uppercase");
      }
    });
  }
}

const keyboard = new VirtualKeyboard();

window.addEventListener("DOMContentLoaded", () => {
  keyboard.getKeyboard(keyboardKeysEng);
});

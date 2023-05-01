import { keyboardKeysEng, keyboardKeysEngShift, keyboardKeysRu, keyboardKeysRuShift, } from './keys.js';
import Output from './Output.js';

class VirtualKeyboard extends Output {
  constructor() {
    super();
    this.main = null;
    this.keyboard = null;
    this.capsState = false;
    this.shiftState = false;
    this.notLetters = null;
    this.keyslang = null;
    this.keys = null;
    this.addEventListeners();
  }

  addEventListeners() {
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

      if (this.notLetters.indexOf(e.code) === -1) {
        if (keyCaps.classList.contains("caps-on") || this.shiftState) {
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
            e.code === keys[i].id
          ) {
            keys[i].classList.add("keyboard_item_active");
          }
        }
      }
    };

    window.addEventListener("keydown", keyListener);

    window.addEventListener("keyup", (e) => {
      const keys = document.querySelectorAll(".keyboard_item");
      for (let i = 0; i < keys.length; i += 1) {
        if (e.code !== "CapsLock") {
          if (
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

  getKeyboard(keyboardKeysLangCall) {

    let keyboardKeysLang = keyboardKeysLangCall;

    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'eng');
    }

    if (localStorage.getItem('language') && !this.shiftState) {
      if (localStorage.getItem('language') === 'ru') {
        keyboardKeysLang = keyboardKeysRu;
      } else if (localStorage.getItem('language') === 'eng') {
        keyboardKeysLang = keyboardKeysEng;
      }
    } else if (localStorage.getItem('language') && this.shiftState) {
      if (localStorage.getItem('language') === 'ru') {
        keyboardKeysLang = keyboardKeysRuShift;
      } else if (localStorage.getItem('language') === 'eng') {
        keyboardKeysLang = keyboardKeysEngShift;
      }
    }

    this.keyslang = keyboardKeysLang;

    this.main = document.createElement('div');
    this.main.classList.add('_container');
    const header = document.createElement('header');
    header.classList.add('header');
    const headerTitle = document.createElement('h3');
    headerTitle.textContent = 'RS School Virtual Keyboard';
    headerTitle.classList.add('header_title');
    header.append(headerTitle);
    this.main.append(header);
    document.body.append(this.main);

    const bodyKeyboard = document.createElement('main');
    bodyKeyboard.classList.add('page');
    const sectionText = document.createElement('section');
    sectionText.classList.add('text');

    const textArea = this.element;
    const sectionKeyboard = document.createElement('section');
    sectionKeyboard.classList.add('keyboard');

    this.sectionKeyboardItems = this.getKeyboardItems(
      keyboardKeysLang,
      this.shiftState,
    );
    this.sectionKeyboardItems.classList.add('keyboard_items');
    sectionText.append(textArea);

    sectionKeyboard.append(sectionText);
    sectionKeyboard.append(this.sectionKeyboardItems);
    const paragraphText = document.createElement('div');
    paragraphText.classList.add('keyboard_info');
    const paragraphOne = document.createElement('p');
    const paragraphTwo = document.createElement('p');
    const br = document.createElement('br');
    paragraphOne.innerHTML = 'Клавиатура создана в операционной системе Windows';
    paragraphTwo.innerHTML = 'Для переключения языка комбинация: Левыe alt + shift';
    paragraphText.appendChild(paragraphOne);
    paragraphText.appendChild(br);
    paragraphText.appendChild(paragraphTwo);
    sectionKeyboard.append(paragraphText);
    this.main.append(sectionKeyboard);
    // this.main.append(paragraphText);
  }

  getKeyboardItems(keysLang) {
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

    this.notLetters = notLetters;

    Object.keys(keysLang).forEach((key) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.id = key;
      if (this.capsState && this.shiftState) {
        if (!notLetters.includes(key)) {
          btn.textContent = keysLang[key].toLowerCase();
        } else {
          btn.textContent = keysLang[key];
        }
      } else {
        btn.textContent = keysLang[key];
      }

      btn.classList.add('keyboard_item');
      if (!notLetters.includes(key)) {
        btn.setAttribute('keyType', 'textBtn');
        btn.addEventListener('click', () => {
          if (btn.classList.contains('keyboard_item_uppercase')) {
            this.setValue(keysLang[key].toUpperCase());
          } else {
            this.setValue(keysLang[key]);
          }
        });
      }

      if (key === 'CapsLock') {
        btn.addEventListener('click', () => {
          btn.classList.toggle('keyboard_item_active');
          this.capsLock();
        });
      }

      if (key === 'Space') {
        btn.addEventListener('click', () => {
          this.setValue(' ');
        });
      }

      if (key === 'Enter') {
        btn.addEventListener('click', () => {
          this.enter();
        });
      }

      if (key === 'Tab') {
        btn.addEventListener('click', () => {
          this.setValue('  ');
        });
      }

      if (key === 'Backspace') {
        btn.addEventListener('click', () => {
          this.backSpace();
        });
      }

      if (key === 'Delete') {
        btn.addEventListener('click', () => {
          this.delete();
        });
      }

      if (key === 'ShiftLeft') {
        btn.addEventListener('mousedown', () => {
          this.shift();
        });
        btn.addEventListener('mouseup', () => {
          this.shiftState = false;
          this.main.remove();
          this.getKeyboard();
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

      const btnBackspaceImg = document.createElement('img');
      switch (key) {
        case "Backspace":
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
      (event.code === 'ShiftLeft' && event.altKey)
      || (event.code === 'ShiftRight' && event.altKey)
    ) {
      event.preventDefault();
      if (localStorage.getItem('language') === 'ru') {
        this.main.remove();
        localStorage.setItem('language', 'eng');
        this.getKeyboard(keyboardKeysEng);
      } else if (localStorage.getItem('language') === 'eng') {
        this.main.remove();
        localStorage.setItem('language', 'ru');
        this.getKeyboard(keyboardKeysRu);
      }
    }
  }

  shift(callback) {
    window.removeEventListener('keydown', callback);
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
      str.length !== 0
      && this.element.selectionStart === 0
      && this.element.selectionEnd === 0
    ) {
      this.content = value + str;
      this.element.value = this.content;
      this.element.selectionStart = 0;
      this.element.selectionEnd = 0;
      return;
    }

    if (
      str.length !== 0
      && this.element.selectionStart === 0
      && this.element.selectionEnd === str.length
    ) {
      this.content = value;
      this.element.value = this.content;
      return;
    }

    if (
      this.element.selectionStart !== 0
      && this.element.selectionStart !== this.content.length
      && this.element.selectionEnd === this.element.selectionStart
    ) {
      const caret = this.element.selectionStart + 1;
      this.content = str.slice(0, this.element.selectionStart)
        + value
        + str.slice(this.element.selectionStart, str.length);
      this.element.value = this.content;
      this.element.selectionStart = caret;
      this.element.selectionEnd = caret;
      return;
    }
    this.content += value;
    this.element.value = this.content;
  }

  backSpace() {
    this.element.focus();
    if (this.element.selectionStart === 0 && this.element.selectionEnd === 0) {
      return;
    }

    if (
      this.element.selectionStart !== 0
      && this.element.selectionStart !== this.content.length
      && this.element.selectionStart === this.element.selectionEnd
    ) {
      const start = this.content.slice(0, this.element.selectionStart - 1);
      const end = this.content.slice(
        this.element.selectionStart,
        this.content.length,
      );
      const caret = this.element.selectionStart - 1;
      this.content = start + end;

      this.element.value = this.content;
      this.element.selectionStart = caret;
      this.element.selectionEnd = caret;
      return;
    }

    if (this.element.selectionStart === this.content.length) {
      this.content = this.content.slice(0, -1);
      this.element.value = this.content;
      return;
    }

    if (
      this.element.selectionStart === 0
      && this.element.selectionEnd === this.content.length
    ) {
      this.content = '';
      this.element.value = this.content;
      return;
    }

    this.content = this.content.slice(0, -1);
    this.element.value = this.content;
  }

  delete() {
    this.element.focus();
    if (this.element.selectionStart === 0 && this.element.selectionEnd === 0) {
      this.content = this.content.slice(1, this.content.length);
      this.element.value = this.content;
      this.element.selectionStart = 0;
      this.element.selectionEnd = 0;
      return;
    }
    if (
      this.element.selectionStart !== 0
      && this.element.selectionStart !== this.content.length
      && this.element.selectionStart === this.element.selectionEnd
    ) {
      const start = this.content.slice(0, this.element.selectionStart);
      const end = this.content.slice(
        this.element.selectionStart + 1,
        this.content.length,
      );
      const caret = this.element.selectionStart;
      this.content = start + end;

      this.element.value = this.content;
      this.element.selectionStart = caret;
      this.element.selectionEnd = caret;
      return;
    }
    if (
      this.element.selectionStart === 0
      && this.element.selectionEnd === this.content.length
    ) {
      this.content = '';
      this.element.value = this.content;
    }
  }

  enter() {
    const caret = this.element.selectionStart;
    this.setValue('\n');
    this.element.selectionStart = caret + 1;
    this.element.selectionEnd = caret + 1;
  }

  capsLock() {
    const buttons = this.sectionKeyboardItems;
    this.capsState = true;
    const keyCaps = document.querySelector('.keyboard_item_caps');
    keyCaps.classList.toggle('caps-on');
    buttons.childNodes.forEach((el) => {
      if (el.getAttribute('keyType')) {
        el.classList.toggle('keyboard_item_uppercase');
      }
    });
  }
}

const keyboard = new VirtualKeyboard();

window.addEventListener('keydown', (event) => {
  keyboard.setLanguage(event);
});

window.addEventListener("DOMContentLoaded", () => {
  keyboard.getKeyboard(keyboardKeysEng);
});

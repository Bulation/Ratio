export default class Component<T extends HTMLElement = HTMLElement> {
  public node: T;
  parentNode: HTMLElement;
  callbacks: Array<(e?: Event) => void> = [];

  constructor(parentNode: HTMLElement | null, tagName: keyof HTMLElementTagNameMap, className = '', content = '') {
    const el = document.createElement(tagName) as T;
    el.className = className;
    el.textContent = content;
    if (parentNode) {
      parentNode.append(el);
    }
    this.parentNode = parentNode;
    this.node = el;
  }

  setClass(className: string) {
    this.node.classList.add(className);
    return this;
  }

  removeClass(className: string) {
    this.node.classList.remove(className);
    return this;
  }

  setStyle(styleName: string, value: string) {
    this.node.style.setProperty(styleName, value);
    return this;
  }

  getStyle(styleName: keyof HTMLElement) {
    return this.node[styleName];
  }

  setAttribute(attribute: string, value: string) {
    this.node.setAttribute(attribute, value);
    return this;
  }

  removeAttribute(attribute: string) {
    this.node.removeAttribute(attribute);
    return this;
  }

  setListener(event: keyof HTMLElementEventMap, callback: (e?: Event) => void, params?: boolean | AddEventListenerOptions) {
    this.node.addEventListener(event, callback, params);
    return this;
  }

  setContent(content: string) {
    this.node.textContent = content;
    return this;
  }

  destroy() {
    this.node.remove();
  }
}
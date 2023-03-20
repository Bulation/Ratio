import Component from "../../common/component";
import Popup from '../../common/popup';

export default class PopupView {
  backDrop: Popup;
  popup: Component;
  popupHeader: Component<HTMLElement>;
  popupBody: Component<HTMLElement>;
  popupTitle: Component<HTMLElement>;
  constructor(content: string) {
    this.backDrop = new Popup(document.body, 'div', 'popup-wrapper', '');
    this.popup = this.backDrop.popup; // компонент модального окна
    this.popupHeader = new Component(this.popup.node, 'div', 'popup-header', '');
    this.popupBody = new Component(this.popup.node, 'div', 'popup-body', '');
    this.popupTitle = new Component(this.popupBody.node, 'h2', 'popup-title', content);
  }

  renderBtn(content: string, listener: () => void) { // рендер кнопки внизу модалки
    new Component(this.popup.node, 'button', 'btn popup-btn', content).setListener(
      'click',
      listener
    );
  }
}
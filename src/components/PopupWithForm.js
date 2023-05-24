import React from "react";

function PopupWithForm({ name, title, children, isOpen, buttonText, onClose }) {
  return (
    <div
      className={`popup popup-${name}
        ${isOpen ? `popup_opened` : ""}`}
    >
      <div className="popup__conteiner">
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__form-${name}`} name={name}>
          {children}
          <button type="submit" className="popup__submit-button">
            {buttonText}
          </button>
        </form>
        <button
          type="button"
          className="popup__close"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
export default PopupWithForm;

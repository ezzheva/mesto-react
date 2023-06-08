import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isLoading,
}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Создать"}
    >
      <input
        type="text"
        id="popup__input-title"
        className="popup__input popup__input_type_element-title"
        name="element-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="popup__input-error popup__input-title-error"></span>
      <input
        type="url"
        id="popup__input-link"
        className="popup__input popup__input_type_element-link"
        name="element-link"
        placeholder="Ссылка на картинку"
        required
        value={link || ""}
        onChange={handleChangeLink}
      />
      <span className="popup__input-error popup__input-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

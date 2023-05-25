import React, { useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  /**попап редактирование профиля */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  /**попап добавления карточки */
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  /**попап редактирования аватара */
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  /** попап карточки */
  const [selectedCard, setSelectedCard] = useState({});

  /**попап редактирование профиля */
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  /**попап добавления карточки */
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  /**попап редактирования аватара */
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  /**функция закрытия попапов */
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="root">
      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />

        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="text"
            id="popup__input-name"
            className="popup__input popup__input_type_name"
            name="user-name"
            placeholder="Ваше Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__input-error popup__input-name-error"></span>
          <input
            type="text"
            id="popup__input-about"
            className="popup__input popup__input_type_about"
            name="about"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__input-error popup__input-about-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="add"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
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
          />
          <span className="popup__input-error popup__input-title-error"></span>
          <input
            type="url"
            id="popup__input-link"
            className="popup__input popup__input_type_element-link"
            name="element-link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error popup__input-link-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          buttonText="Создать"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="url"
            id="avatar"
            className="popup__input popup__input_type_avatar"
            name="avatar"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error avatar-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="trash"
          title="Вы уверенны?"
          buttonText="Да"
          onClose={closeAllPopups}
        />

        <Footer />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}

export default App;

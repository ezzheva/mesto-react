import React, { useEffect, useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";

function App() {
  /**попап редактирование профиля */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  /**попап добавления карточки */
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  /**попап редактирования аватара */
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  /** попап карточки */
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);

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
  /**лайк */
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке
    if (!isLiked) {
      api // Отправляем запрос в API и получаем обновлённые данные карточки
        .getLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  /**удаление карточки */
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter((c) =>
          c._id !== card._id))
        // const newCards = cards.filter((c) =>
        //   c._id === card._id ? "" : newCard
        // );
        // setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data){
      api
      .patchUserInfo(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data){
    api
      .patchAvatarInfo(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
      })
      .catch((err) => {
        console.log(err);
      });
    }      

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, cardData]) => {
        setCurrentUser(data);
        setCards(cardData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />

          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

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

          <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

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
    </CurrentUserContext.Provider>
  );
}

export default App;

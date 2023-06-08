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
import AddPlacePopup from "./AddPlacePopup.js";

function App() {
  /**попап редактирование профиля */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  /**попап добавления карточки */
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  /**попап редактирования аватара */
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  /** попап карточки */
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  
  /**  отслеживания состояния загрузки во время ожидания ответа от сервера*/
  const [isLoading, setIsLoading] = useState(false);

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
      api
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
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  /**универсальную функцию, которая принимает функцию запроса*/
  function handleSubmit(request) {
    // изменяем текст кнопки до вызова запроса
    setIsLoading(true);
    request()
      // закрывать попап нужно только в `then`
      .then(closeAllPopups)
      .catch(console.error)
      // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
      .finally(() => setIsLoading(false));
  }
  /** формы профиля*/
  function handleUpdateUser(inputValues) {
    // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
    function makeRequest() {
      // `return` позволяет потом дальше продолжать цепочку `then, catch, finally`
      return api.patchUserInfo(inputValues).then(setCurrentUser);
    }
    // вызываем универсальную функцию, передавая в нее запрос
    handleSubmit(makeRequest);
  }
  // function handleUpdateUser(data) {
  //   setIsLoading(true)
  //   api
  //     .patchUserInfo(data)
  //     .then((userInfo) => {
  //       setCurrentUser(userInfo)
  //       closeAllPopups()
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     })
  // }
  /**форма аватара */
  function handleUpdateAvatar(inputValues) {
    function makeRequest() {
      return api.patchAvatarInfo(inputValues).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  // /**форма добавления карточки */
  function handleAddPlaceSubmit(inputValues) {
    function makeRequest() {
      return api.addNewCard(inputValues).then((newCard) => {
        setCards([newCard, ...cards]);
      });
    }
    handleSubmit(makeRequest);
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
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

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

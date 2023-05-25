import React, { useState, useEffect } from "react";
import api from "../utils/Api.js";
import Card from "./Card.js";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  const cardsElements = cards.map((card) => (
    <Card key={card._id} card={card} onCardClick={onCardClick} />
  ));

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, cardData]) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
        setCards(cardData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Main">
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-box" onClick={onEditAvatar}>
            <img className="profile__avatar" src={userAvatar} alt="аватарка" />
          </div>
          <div className="profile__container">
            <div className="profile__info">
              <h1 className="profile__name">{userName}</h1>
              <button
                onClick={onEditProfile}
                className="profile__button-edit"
                type="button"
                aria-label="Edit"
              ></button>
            </div>
            <p className="profile__about">{userDescription}</p>
          </div>
          <button
            onClick={onAddPlace}
            className="profile__button-add"
            type="button"
            aria-label="Add"
          ></button>
        </section>

        <section className="cards">{cardsElements}</section>
      </main>
    </div>
  );
}

export default Main;

import React, { useState, useEffect } from "react";
import api from "../utils/Api.js";
import Card from "./Card.js";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getInitialCards()
      .then((cardData) => {
        setCards(
          cardData.map((data) => {
            return {
              id: data._id,
              name: data.name,
              link: data.link,
              likes: data.likes,
            };
          })
        );
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

        <section className="cards">
          {cards.map(({ id, ...card }) => (
            <Card key={id} {...card} onCardClick={onCardClick} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Main;

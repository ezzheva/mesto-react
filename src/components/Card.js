import React from "react";

function Card(card) {
  function handleCardClick() {
    card.onCardClick(card);
  }

  return (
    <div className="card">
      <img
        className="card__img"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="card__block">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-counter">
          <button
            type="button"
            className="card__like"
            aria-label="like"
          ></button>
          <p className="card__number-likes">{card.likes.length}</p>
        </div>
      </div>
      <button
        type="button"
        className="card__delete"
        aria-label="delete"
      ></button>
    </div>
  );
}
export default Card;

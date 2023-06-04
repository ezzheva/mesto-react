import React, { useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const [avatar,setAvatar] = useState("");
    const avatarRef = useRef();

    function handleChangeAvatar(evt) {
        setAvatar(evt.target.value);
      }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
          avatar: avatarRef.current.value
        });
        onClose();
      } 

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit = {handleSubmit}
    >
      <input
        type="url"
        id="avatar"
        className="popup__input popup__input_type_avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
        value={avatar}
        onChange={handleChangeAvatar}
      />
      <span className="popup__input-error avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

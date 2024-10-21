
import React from "react";
import css from "./Modal.module.css";

export const Modal = ({ onClose, onConfirm, contactName }) => {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <h3>Are you sure?</h3>
        <p>
          Do you really want to delete the contact "{contactName}"? This action
          cannot be undone.
        </p>
        <div className={css.actions}>
          <button className={css.buttonCancel} onClick={onClose}>
            Cancel
          </button>
          <button className={css.buttonConfirm} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

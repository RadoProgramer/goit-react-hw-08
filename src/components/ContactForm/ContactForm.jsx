import { useState } from 'react';
import css from './ContactForm.module.css';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handlePhoneChange = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h3>Add Contact</h3>
      <input
        className={css.input}
        id="nameField"
        type="text"
        name="name"
        value={name}
        onChange={handleNameChange}
        placeholder="Name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        required
      />
      <input
        className={css.input}
        id="number"
        type="tel"
        name="number"
        value={number}
        onChange={handlePhoneChange}
        placeholder="Phone Number"
        pattern="\+?\d{1,4}?[ .\\-\\s]?\(?\d{1,3}?\)?[ .\\-\\s]?\d{1,4}[ .\\-\\s]?\d{1,4}[ .\\-\\s]?\d{1,9}"
        required
      />
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};
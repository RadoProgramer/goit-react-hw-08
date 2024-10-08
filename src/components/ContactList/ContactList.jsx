import PropTypes from 'prop-types';
import css from './ContactsList.module.css';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from '../../redux/contacts/selectors';

export const ContactsList = ({ onDelete }) => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.container}>
      {filteredContacts.length > 0 ? (
        <table className={css.table}>
          <thead className={css.theading}>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Remove Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map(contact => (
              <tr className={css.tbody} key={contact.id}>
                <td className={css.name}>{contact.name}: </td>
                <td>{contact.number}</td>
                <td>
                  <button
                    className={css.button}
                    onClick={() => onDelete(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={css.text}>No contacts found</p>
      )}
    </div>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
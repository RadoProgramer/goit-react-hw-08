import PropTypes from 'prop-types';

const ContactItem = ({ contact, onDelete }) => {
  return (
    <li>
      <span>{contact.name}: {contact.phone}</span>
      <button onClick={() => onDelete(contact.id)}>Delete</button>
    </li>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactItem;

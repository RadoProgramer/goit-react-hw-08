import PropTypes from 'prop-types';

const SearchBox = ({ filter, onChange }) => {
  return (
    <input type="text" value={filter} onChange={onChange} placeholder="Search contacts..." />
  );
};

SearchBox.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBox;

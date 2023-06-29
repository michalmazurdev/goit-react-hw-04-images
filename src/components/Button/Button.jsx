import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ clicked }) => {
  return (
    <button className={css.button} onClick={clicked}>
      LOAD MORE
    </button>
  );
};
Button.propTypes = {
  clicked: PropTypes.func,
};

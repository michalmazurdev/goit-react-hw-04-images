import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => (
  <header className={css.searchbar}>
    <form className={css.searchForm} onSubmit={onSubmit}>
      <button type="submit" className={css.button}>
        <span className={css.buttonLabel}></span>
      </button>
      <input
        className={css.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  </header>
);

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

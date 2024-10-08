import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import css from './LoginForm.module.css';

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <div className={css.formModal}>
      <div className={css.loginForm}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <h2 className={css.heading}>Please Log In</h2>
          <input
            type="email"
            name="email"
            placeholder="Please enter your e-mail"
          />
          <input
            type="password"
            name="password"
            placeholder="Please enter your password"
          />
          <button className={`${css.btn} ${css.login}`} type="submit">
            Log In
          </button>
          <p>
            <a href="!#">Forgotten account</a>
          </p>
          <hr />
        </form>
      </div>
    </div>
  );
};
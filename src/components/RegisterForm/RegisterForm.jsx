import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './RegisterForm.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <div className={css.formModal}>
      <div className={css.signupForm}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <h2 className={css.heading}>Please Register</h2>
          <input
            type="test"
            name="name"
            placeholder="Choose Username"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create password"
            required
          />
          <button className={`${css.btn} ${css.signup}`} type="submit">
            Create Account
          </button>
          <p>
            Clicking <strong>create account</strong> means that you are agree to
            our <a href="!#">terms of services</a>.
          </p>
          <hr />
        </form>
      </div>
    </div>
  );
};
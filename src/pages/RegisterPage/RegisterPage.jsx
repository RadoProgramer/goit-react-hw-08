import DocumentTitle from '../../components/DocumentTitle';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

export default function RegisterPage() {
  return (
    <div>
      <DocumentTitle>Register</DocumentTitle>
      <h2>Create a new account</h2>
      <RegisterForm />
    </div>
  );
}

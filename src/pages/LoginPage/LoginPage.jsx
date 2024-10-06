import DocumentTitle from '../../components/DocumentTitle';
import { LoginForm } from '../../components/LoginForm/LoginForm';

export default function LoginPage() {
  return (
    <div>
      <DocumentTitle>Login</DocumentTitle>
      <h2>Login to your account</h2>
      <LoginForm />
    </div>
  );
}

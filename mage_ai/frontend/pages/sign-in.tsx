import BasePage from '@components/BasePage';
import SignForm from '@components/Sessions/SignForm';

function SignInPage() {
  return (
    <BasePage
      headerProps={{
        hideActions: true,
      }}
      title="登录"
    >
      <SignForm
        title="👋 登录"
      />
    </BasePage>
  );
}

SignInPage.getInitialProps = async () => ({});

export default SignInPage;

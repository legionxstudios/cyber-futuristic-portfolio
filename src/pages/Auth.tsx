import { Helmet } from 'react-helmet-async';
import { AuthLayout } from "@/components/auth/AuthLayout";

const Auth = () => {
  return (
    <>
      <Helmet>
        <title>Sign In | Tudor Stanescu Portfolio</title>
        <meta name="description" content="Sign in to access the admin dashboard of Tudor Stanescu's portfolio." />
        <meta property="og:title" content="Sign In | Tudor Stanescu Portfolio" />
        <meta property="og:description" content="Sign in to access the admin dashboard of Tudor Stanescu's portfolio." />
      </Helmet>
      <AuthLayout />
    </>
  );
};

export default Auth;
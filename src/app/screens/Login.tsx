import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import AccessForm from "@app/AccessForm";

const Login = () => {
  const { t } = useTranslation();
  return (
    <main>
      <Helmet>
        <title>{t('loginTitle')}</title>
      </Helmet>

      <h1>{t('loginTitle')}</h1>
      <AccessForm onSubmit={() => null} user={{}}/>
    </main>
  );
}

export default Login;

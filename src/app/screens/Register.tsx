import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import AccessForm from "@app/AccessForm";

const Register = () => {
  const { t } = useTranslation();
  return (
    <main>
      <Helmet>
        <title>{t('registerTitle')}</title>
      </Helmet>

      <h1>{t('registerTitle')}</h1>
      <AccessForm onSubmit={() => null}/>
    </main>
  );
}

export default Register;

import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import AccessForm from "@app/AccessForm";

const Authenticate = () => {
  const { t } = useTranslation();
  return (
    <main>
      <Helmet>
        <title>{t('authenticateTitle')}</title>
      </Helmet>

      <h1>{t('authenticateTitle')}</h1>
      <AccessForm onSubmit={() => null} user={{}}/>
    </main>
  );
}

export default Authenticate;

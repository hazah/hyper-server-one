import React from "react";
import { Helmet } from "react-helmet";

import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <main>
      <Helmet>
        <title>{t('homeTitle')}</title>
      </Helmet>

      <h1>{t('homeTitle')}</h1>
    </main>
  );
}

export default Home;

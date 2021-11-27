import React from "react";
import { Helmet } from "react-helmet";

import { useTranslation } from "react-i18next";

const About = ({ url }) => {
  const { t } = useTranslation();
  return (
    <main>
      <Helmet>
        <title>{t('aboutTitle')}</title>
      </Helmet>

      <h1>{t('aboutTitle')}</h1>
      <p>{url}</p>
    </main>
  );
}

export default About;

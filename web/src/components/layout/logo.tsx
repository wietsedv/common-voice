import * as React from 'react';
import { LocaleLink, useLocale, useNativeLocaleNames } from '../locale-helpers';

import LogoImage from '../ui/logo-image/logo-image';

interface Props {
  isReverse?: boolean;
}

const Logo = ({ isReverse }: Props) => {
  const nativeNames = useNativeLocaleNames();
  const [locale] = useLocale();

  return (
    <LocaleLink className="Logo" to="">
      <LogoImage isReverse={isReverse} />
      {locale !== "nl" ? <h3>{nativeNames[locale]}</h3> : ""}
    </LocaleLink>
  );
};

export default Logo;

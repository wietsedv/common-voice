import * as React from 'react';
import { LocaleLink } from '../locale-helpers';

import LogoImage from '../ui/logo-image/logo-image';
import { Localized } from '@fluent/react';

interface Props {
  isReverse?: boolean;
  locale: string;
}

const Logo = ({ isReverse, locale }: Props) => {
  return (
    <LocaleLink className="Logo" to="">
      <LogoImage isReverse={isReverse} />
      <Localized id={locale} />
    </LocaleLink>
  );
};

export default Logo;

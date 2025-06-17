import * as React from 'react';

interface Props {
  isReverse?: boolean;
}

const LogoImage = ({ isReverse }: Props) => {
  // const imageSource = isReverse
  //   ? require('./cv-logo-white.svg')
  //   : require('./cv-logo-black.svg');

  const host = window.location.host;

  if (host == "praatfrysk.nl") { // fries
    return <h1>Praat Frysk</h1>
  }
  if (host == "proatsaksisch.nl") {  // gronings
    return <h1>Proat Saksisch</h1>
  }
  return <h1>Praot Saksisch</h1>
};

export default LogoImage;

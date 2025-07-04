import * as React from 'react';

interface Props {
  isReverse?: boolean;
}

const LogoImage = ({ isReverse }: Props) => {
  // const imageSource = isReverse
  //   ? require('./cv-logo-white.svg')
  //   : require('./cv-logo-black.svg');

  const host = window.location.host;

  if (host == "proaten.nl") {
    return <h1>Proaten</h1>
  }
  if (host == "proatn.nl") {
    return <h1>Proatn</h1>
  }
  if (host == "praotn.nl") {
    return <h1>Proatn</h1>
  }
  return <h1>Praoten</h1>
};

export default LogoImage;

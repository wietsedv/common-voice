import React from 'react'

import './action-items-section.css'

type Props = {
  isLocaleContributable: boolean
}


export const ActionItemsSection: React.FC<Props> = ({
  isLocaleContributable,
}) => {
  const host = window.location.host.replace(".nl", "");

  return (
    <section className="action-items-section" id="action-items">
      <div className="action-items-section-container">
        <h1 className="title">{host[0] === "p" ? "P" + host.slice(1) : "Praoten"} is een gratis platform waarop iedere spreker van het Nedersaksisch in Nederland kan meehelpen om spraaktechnologie te verbeteren</h1>

        <p className="subtitle">In Nederland kennen we meerdere dialecten van het Nedersaksisch die voornamelijk in het noordoosten van Nederland worden gesproken. Klik hierboven op de kaart op de regio waar jij vandaan komt.</p>
      </div>
    </section>
  )
}

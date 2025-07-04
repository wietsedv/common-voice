import React from 'react'

import './action-items-section.css'

type Props = {
  isLocaleContributable: boolean
}


export const ActionItemsSection: React.FC<Props> = ({
  isLocaleContributable,
}) => {
  return (
    <section className="action-items-section" id="action-items">
      <div className="action-items-section-container">
        <h1 className="title">Praoten is een gratis platform waarop iedere spreker van het Nedersaksisch kan meehelpen om spraaktechnologie te verbeteren</h1>

        <p className="subtitle">In Nederland kennen we meerdere dialecten van het Nedersaksisch die voornamelijk in Groningen, Drenthe, Overijssel en Gelderland worden gesproken. Klik hierboven op de kaart op de regio waar jij vandaan komt.</p>
      </div>
    </section>
  )
}

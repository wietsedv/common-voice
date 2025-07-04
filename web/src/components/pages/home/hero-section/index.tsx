/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import { Localized } from '@fluent/react'
import classNames from 'classnames'

import { LinkButton } from '../../../ui/ui'
import { ArrowRight, MicIcon, Play } from '../../../ui/icons'

import {Map} from "../../../map"

import { LocaleLink } from '../../../locale-helpers'
import URLS from '../../../../urls'

import { usePreloadImage } from '../../../../hooks/use-preload-image'

import './hero-section.css'

type Props = {
  isLocaleContributable: boolean
}

export const HeroSection: React.FC<Props> = ({ isLocaleContributable }) => {
  // const imageUrl = require('./assets/hero-hd.webp')
  // const isLoaded = usePreloadImage(imageUrl)

  const linkDisabled = !isLocaleContributable

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-text-wrapper">
          <div className="hero-text-container">
            <h1>Technologie die Nedersaksisch spreekt</h1>
            <Localized id="hero-subtitle-1" elems={{ bold: <b /> }}>
              <p />
            </Localized>
            <Localized id="hero-subtitle-2">
              <p />
            </Localized>
            {/* <Localized id="get-started" elems={{ icon: <ArrowRight /> }}>
              <LinkButton rounded to={`${URLS.ROOT}?page=home#action-items`} />
            </Localized> */}
          </div>
        </div>
        <div className="hero-image-container">
          <Map />
        </div>
      </div>
    </section>
  )
}

import React from 'react'

import { HeroSection } from './hero-section'
import { ActionItemsSection } from './action-items-section'
import { CommunitySection } from './community-section'
import { FeaturedSection } from './featured-section'
import { DevelopersSection } from './developers-section'
import { GetInvolvedSection } from './get-involved'
import { PartnerSection } from './partner-section'
import { PartnersSection } from './partners-section'

import Page from '../../ui/page'

import { useScrollToSection } from '../../../hooks/use-scroll-to-section'
import { isContributable, useLocale } from '../../locale-helpers'

const Home = () => {
  useScrollToSection()

  const [locale] = useLocale()

  const isLocaleContributable = isContributable(locale)

  return (
    <Page className="home">
      <div>
		  <section className="hero-section">
        <div className="hero-container">
          <div className="hero-text-wrapper">
            <div className="hero-text-container">
              <h1>Deze website is nog in ontwikkeling. Kom later terug!</h1>
            </div>
          </div>
        </div>
      </section>
      </div>
      <HeroSection isLocaleContributable={isLocaleContributable} />
      <ActionItemsSection isLocaleContributable={isLocaleContributable} />
      {/* <CommunitySection /> */}
      {/* <FeaturedSection /> */}
      {/* <DevelopersSection /> */}
      {/* <GetInvolvedSection isLocaleContributable={isLocaleContributable} /> */}
      {/* <PartnerSection /> */}
      {/* <PartnersSection /> */}
    </Page>
  )
}

export default Home

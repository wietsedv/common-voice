/* eslint-disable @typescript-eslint/no-var-requires */

import { Localized } from "@fluent/react";
import classNames from "classnames";
import type React from "react";
import { usePreloadImage } from "../../../../hooks/use-preload-image";
import URLS from "../../../../urls";
import { LocaleLink } from "../../../locale-helpers";
import { Map } from "../../../map";
import { ArrowRight, MicIcon, Play } from "../../../ui/icons";
import { LinkButton } from "../../../ui/ui";

import "./hero-section.css";

type Props = {
	isLocaleContributable: boolean;
};

export const HeroSection: React.FC<Props> = ({ isLocaleContributable }) => {
	// const imageUrl = require('./assets/hero-hd.webp')
	// const isLoaded = usePreloadImage(imageUrl)

	const linkDisabled = !isLocaleContributable;

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
						<p>
							<br/>Klik hiernaast op de naam van het gebied waarvan je de
							lokale variant spreekt, om jouw stem op te nemen en jouw taal te
							helpen!
						</p>
					</div>
				</div>
				<div className="hero-image-container">
					<Map />
				</div>
			</div>
		</section>
	);
};

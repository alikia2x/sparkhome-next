import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
	const { t } = useTranslation();
	return (
		<div className="h-screen w-screen overflow-x-hidden bg-white dark:bg-[rgb(23,25,29)]">
			<Helmet>
				<title>{t("about.title")}</title>
			</Helmet>
			<main
				className="relative h-full w-full md:w-3/4 lg:w-1/2 left-0 md:left-[12.5%] lg:left-1/4
                    pt-12 px-3 md:px-0"
			>
				{children}
			</main>
		</div>
	);
}

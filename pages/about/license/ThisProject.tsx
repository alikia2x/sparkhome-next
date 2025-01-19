import LICENSE from "LICENSE?raw";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

export default function ThisProjectLicensePage() {
	const { t } = useTranslation();
	return (
		<div className="dark:bg-[rgb(23,25,29)] dark:text-white min-h-screen w-screen overflow-x-hidden">
			<Helmet>
				<title>{t("license.title")}</title>
			</Helmet>
			<main
				className="relative h-full w-full md:w-3/4 lg:w-1/2 left-0 md:left-[12.5%] lg:left-1/4
                    pt-12"
			>
				<h1 className="text-4xl font-bold mb-6">{t('license.page-title')}</h1>
				<p className="text-lg mb-8">{t('license.desc')}</p>
				<div className="font-mono text-justify whitespace-break-spaces">{LICENSE}</div>
			</main>
		</div>
	);
}

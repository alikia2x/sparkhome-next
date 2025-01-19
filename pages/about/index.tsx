import useDarkMode from "lib/darkModeHook";
import { apiVersion, clientVersion } from "lib/version";
import AboutLayout from "./layout";
import { useTranslation } from "react-i18next";

function License() {
	const { t } = useTranslation();
	return (
		<>
			<p className="flex items-center my-4">
				<span className="font-medium text-2xl md:text-2xl mr-4 w-[36rem]">
					{t("about.oss.title")}
				</span>
				<span
					className="relative font-bold px-2 py-1 rounded-md text-nowrap underline
                     bg-green-600 text-white"
				>
					<a href="/about/oss-licenses">{t("about.oss.view")}</a>
				</span>
			</p>
			<p className="flex items-center my-4">
				<span className="font-medium text-2xl md:text-2xl mr-4 w-[36rem]">
					{t("about.license.title")}
				</span>
				<span
					className="relative font-bold px-2 py-1 rounded-md text-nowrap underline
                     bg-red-500 text-white"
				>
					<a href="/about/license">{t("about.license.text")}</a>
				</span>
			</p>
		</>
	);
}

export default function AboutPage() {
	const darkMode = useDarkMode();
	const { t } = useTranslation();
	return (
		<AboutLayout>
			<h1 className="text-4xl font-bold mb-6">{t("about.title")}</h1>
			<div className="flex mb-8">
				<img src="/favicon.ico" className="relative w-20 h-20" />
				<div className="flex flex-col ml-4">
					<span className="leading-7 md:leading-9 text-3xl font-bold">sparkast</span>
					<p className="mt-2 leading-5 text-base md:text-xl">
						Made with <span className="text-red-500">♥️</span> by
						<a
							className="underline decoration-dotted text-red-500 mx-1"
							href="https://alikia2x.com"
						>
							alikia2x
						</a>
						from Luminara Studio
					</p>
				</div>
			</div>

			<Version
				title={t("about.backend-api-version")}
				version={"/api/v" + apiVersion}
				versionClass="bg-purple-500"
			/>

			<Version
				title={t("about.client-version")}
				version={clientVersion}
				versionClass="bg-orange-500"
			/>

			<License />

			<p className="relative font-bold text-2xl mt-12">{t("about.presented-by")}</p>
			{!darkMode && (
				<img src="/assets/img/LuminaraStudio.png" className="relative md:h-64 mt-6" />
			)}
			{darkMode && (
				<img src="/assets/img/LuminaraStudioDark.png" className="relative md:h-64 mt-6" />
			)}
		</AboutLayout>
	);
}

function Version(props: { title: string; version: string; versionClass?: string }) {
	const { t } = useTranslation();
	return (
		<p className="flex items-center my-4">
			<span className="font-medium text-2xl md:text-2xl mr-4 w-[36rem]">
				{t(props.title)}
			</span>
			<span
				className={
					"relative px-2 py-1 font-bold rounded-md text-nowrap text-white " +
						props.versionClass || ""
				}
			>
				{props.version}
			</span>
		</p>
	);
}

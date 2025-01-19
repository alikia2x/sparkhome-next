import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./i18n";
import Homepage from "pages";
import AboutPage from "pages/about";
import OSSLicensesPage from "pages/about/license/OSS";
import ThisProjectLicensePage from "../pages/about/license/ThisProject.tsx";
import { HeroUIProvider } from "@heroui/react";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Homepage />
	},
	{
		path: "/about",
		element: <AboutPage />
	},
	{
		path: "/about/oss-licenses",
		element: <OSSLicensesPage />
	},
	{
		path: "/about/license",
		element: <ThisProjectLicensePage />
	}
]);

export function App() {
	return (
		<div className="relative bg-white dark:bg-black dark:text-white min-h-screen w-screen">
			<HeroUIProvider>
				<RouterProvider router={router} />
			</HeroUIProvider>
		</div>
	);
}

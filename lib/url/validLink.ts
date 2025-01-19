import { toASCII } from "tr46";
import { getTLD } from "./tldList";

export default function validLink(link: string) {
	let finalURL;
	try {
		new URL(link);
		return true;
	} catch (error) {
		// if the URL is invalid, try to add the protocol
		try {
			finalURL = new URL("http://" + link);
		} catch (error) {
			return false;
		}
	}
	if (finalURL.host.endsWith(".")) return false;
	return validTLD(finalURL.host) ||
		isValidIPv6(link.slice(1, finalURL.host.length - 1)) ||
		isValidIPv4(link);

}

export function validTLD(domain: string): boolean {
	if (!domain.includes(".")) return false;
	const tld = toASCII(domain.split(".").reverse()[0]);
	const tldList = getTLD();
	return !!tldList.includes(tld.toUpperCase());
}

export function isValidIPv6(ip: string): boolean {
	const length = ip.length;
	let groups = 1;
	let groupDigits = 0;
	let doubleColonCount = 0;
	for (let i = 0; i < length; i++) {
		const char = ip[i];
		if ("0" <= char && char <= "9") {
			groupDigits++;
		} else if ("a" <= char && char <= "f") {
			groupDigits++;
		} else if ("A" <= char && char <= "F") {
			groupDigits++;
		} else if (char === ":" && i + 1 < length && ip[i + 1] !== ":") {
			groups++;
			groupDigits = 0;
		} else if (char === ":" && i + 1 < length && ip[i + 1] === ":") {
			doubleColonCount++;
			i++;
			groupDigits = 0;
		} else {
			return false;
		}
		if (groups > 8) {
			return false;
		} else if (groupDigits > 4) {
			return false;
		} else if (doubleColonCount > 1) {
			return false;
		}
	}
	return !(doubleColonCount === 0 && groups !== 8);

}

export function isValidIPv4(ip: string): boolean {
	const parts = ip.split(".");
	if (parts.length !== 4) {
		return false;
	}
	for (const part of parts) {
		const num = Number(part);
		if (isNaN(num) || num < 0 || num > 255 || !part.match(/^\d+$/)) {
			return false;
		}
	}
	return true;
}

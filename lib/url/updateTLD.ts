const response = await fetch("https://data.iana.org/TLD/tlds-alpha-by-domain.txt");
const TLDtxt = await response.text();
const TLDdata = TLDtxt.split("\n").filter((line) => line[0] !== "#");

await Bun.write("./lib/url/tlds.json", JSON.stringify({"data": TLDdata}));

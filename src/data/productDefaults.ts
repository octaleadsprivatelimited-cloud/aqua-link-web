export const categorySkuPrefix: Record<string, string> = {
  "ro-purifiers": "ASW-RO",
  "uv-purifiers": "ASW-UV",
  "gravity-purifiers": "ASW-GRV",
  "filters-cartridges": "ASW-FLT",
  commercial: "ASW-COM",
  accessories: "ASW-ACC",
};

export const defaultFeatureOptions = [
  "RO + UV + UF Purification",
  "TDS Controller",
  "Smart LED Indicators",
  "Auto Shut-off",
  "Filter Change Alert",
  "Food-grade ABS Body",
  "High Storage Capacity",
  "Wall Mount Design",
];

export const defaultSolutionOptions = [
  "Home Water Solution",
  "Commercial Water Solution",
  "High TDS Water",
  "Municipal Water",
  "Borewell Water",
  "Hot and Cold Dispensing",
];

export const defaultSpecificationOptions: Array<{ key: string; value: string }> = [
  { key: "Purification Technology", value: "RO + UV + UF" },
  { key: "Storage Capacity", value: "10 Litres" },
  { key: "Purification Rate", value: "15 L/hr" },
  { key: "Input TDS Range", value: "Up to 2000 ppm" },
  { key: "Power Consumption", value: "40W" },
  { key: "Dimensions", value: "400 x 250 x 500 mm" },
  { key: "Weight", value: "10 kg" },
  { key: "Warranty", value: "1 Year Comprehensive" },
];

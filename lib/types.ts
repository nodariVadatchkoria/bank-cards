export type CardItem = {
  id: string;
  name: string;              // e.g., "Midnight Gradient"
  issuerNetwork: "Visa" | "MasterCard";
  cardType: "Debit" | "Credit";
  image: string;             // path under /public/cards/...
  printConfig: {
    name: string;            // e.g., "CMYK 300DPI w/ 3mm bleed"
    dpi: number;             // 300
    colorProfile: "CMYK" | "RGB";
    bleedMm: number;         // 3
    safeMarginMm?: number;   // optional
    finish?: "Matte" | "Glossy" | "Satin";
    special?: string[];      // ["Embossing", "Foil Silver"]
  };
  tags?: string[];           // free-text for search
  description?: string;      // optional detailed description
  features?: string[];       // key features for the card
  fees?: {
    annual?: string;
    transaction?: string;
    foreign?: string;
  };
};

export type FilterState = {
  query: string;
  cardTypes: string[];
  networks: string[];
};

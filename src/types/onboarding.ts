export type BuyerIntent =
  | "flip"
  | "rental"
  | "wholesale"
  | "first-home"
  | "new-home"
  | "syndication"
  | "other";

export type ChannelPreference = "email" | "whatsapp" | "imessage";

export type PropertyTypeOption =
  | "Single Family"
  | "Multi-Family"
  | "Condo/Townhouse"
  | "Land";

export interface ProfileData {
  fullName: string;
  companyName: string;
  phone: string;
  buyerIntent: BuyerIntent[];
}

export interface SearchFormData {
  id: string;
  label: string;
  state: string;
  areas: string[];
  zipCodes: string[];
  propertyTypes: PropertyTypeOption[];
  priceMin: string;
  priceMax: string;
  bedroomsMin: string;
  bathroomsMin: string;
  sqftMin: string;
  sqftMax: string;
  yearBuiltMin: string;
  maxRenoBudget: string;
  includeDistressed: boolean;
  includeVacant: boolean;
}

export interface OnboardingData {
  profile: ProfileData;
  searches: SearchFormData[];
  channel: ChannelPreference;
}

export const BUYER_INTENT_OPTIONS: { value: BuyerIntent; label: string }[] = [
  { value: "flip", label: "Flip" },
  { value: "rental", label: "Buy & Hold" },
  { value: "wholesale", label: "Wholesale" },
  { value: "first-home", label: "First Home" },
  { value: "new-home", label: "New Home" },
  { value: "syndication", label: "Syndication" },
  { value: "other", label: "Other" },
];

export const PROPERTY_TYPE_OPTIONS: PropertyTypeOption[] = [
  "Single Family",
  "Multi-Family",
  "Condo/Townhouse",
  "Land",
];

export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

export function createEmptySearch(): SearchFormData {
  return {
    id: `search-${Date.now()}`,
    label: "",
    state: "",
    areas: [],
    zipCodes: [],
    propertyTypes: [],
    priceMin: "",
    priceMax: "",
    bedroomsMin: "Any",
    bathroomsMin: "Any",
    sqftMin: "",
    sqftMax: "",
    yearBuiltMin: "",
    maxRenoBudget: "",
    includeDistressed: false,
    includeVacant: false,
  };
}

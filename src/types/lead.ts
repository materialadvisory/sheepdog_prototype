export type PropertyType = "SFR" | "Multi-Family" | "Condo" | "Townhouse";

export type DistressIndicator =
  | "Pre-Foreclosure"
  | "Tax Delinquent"
  | "Vacant"
  | "Liens"
  | "Code Violations";

export type OwnerType =
  | "Individual"
  | "Corporate"
  | "Absentee Owner"
  | "Trust";

export type LeadStatus = "new" | "interested" | "dismissed";

export type DismissReason =
  | "Price too high"
  | "Wrong area"
  | "Wrong type"
  | "Bad condition"
  | "Other";

export interface MatchFactor {
  label: string;
  matched: boolean;
}

export interface PropertyLead {
  id: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  imageUrl: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  estimatedValue: number;
  lastSalePrice: number;
  lastSaleDate: string;
  taxAssessedValue: number;
  matchScore: number;
  matchFactors: MatchFactor[];
  distressIndicators: DistressIndicator[];
  ownerType: OwnerType;
  ownerName: string;
  status: LeadStatus;
  dismissReason?: DismissReason;
  dateSourced: string;
  lotSize?: string;
  neighborhood?: string;
}

export interface Search {
  id: string;
  label: string;
}

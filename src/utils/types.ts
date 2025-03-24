import { UserDetails } from "@/components/user-details-form";

export type PortfolioStyle = {
  id: string;
  name: string;
  description: string;
  features: string[];
};

export type ColorCombination = {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  preview: string;
};

export type Step = 1 | 2 | 3 | 4;

export type PortfolioConfig = {
  style: string;
  colorCombo: string;
  userDetails: UserDetails;
};
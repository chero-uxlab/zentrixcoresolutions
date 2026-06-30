export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string;
  imageUrl: string;
  badge?: string;
  features: string[];
}

export interface HVACCalculatorState {
  facilityType: string;
  areaSize: number;
  goal: string;
  extraZones: number;
  maintenanceMonths: number;
}

export interface DiagnosticQuestion {
  id: string;
  text: string;
  options: { value: string; label: string; score: number }[];
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  image: string;
  features: string[];
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

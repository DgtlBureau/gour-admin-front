import { Product } from './Product';
import { TranslatableString } from './TranslatableString';

export interface Order {
  id: string;
  firstName: string;
  lastName?: string;
  phone: string;
  email: string;
  comment?: string;
  totalSum: number;
  invoiceUuid: string;
  crmInfo: OrderCrmInfo;
  leadId: number;
  orderProfile: OrderProfile;
  promotions: OrderPromotion[];
  orderProducts: OrderProduct[];

  createdAt: string;
}

export interface OrderCrmInfo {
  id: number;
  status: Record<string, string>;
}

interface OrderPromotion {
  title: string;
  value: number;
  currency: string;
}

interface OrderProduct {
  product: Product;
  amount: number;
  gram: number;
  totalSum: number;
  totalSumWithoutAmount: number;
}

interface OrderProfile {
  title: string;
  city: { name: TranslatableString };
  street: string;
  house: string;
  apartment: string;
  entrance: string;
  floor: string;
  comment: string;
}

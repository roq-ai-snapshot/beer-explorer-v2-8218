import { LocationInterface } from 'interfaces/location';
import { AccountInterface } from 'interfaces/account';
import { GetQueryInterface } from 'interfaces';

export interface BeerInterface {
  id?: string;
  name: string;
  type: string;
  brewery: string;
  alcohol_content: number;
  description: string;
  interesting_facts?: string;
  hero_image?: string;
  account_id: string;
  created_at?: any;
  updated_at?: any;
  location?: LocationInterface[];
  account?: AccountInterface;
  _count?: {
    location?: number;
  };
}

export interface BeerGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  type?: string;
  brewery?: string;
  description?: string;
  interesting_facts?: string;
  hero_image?: string;
  account_id?: string;
}

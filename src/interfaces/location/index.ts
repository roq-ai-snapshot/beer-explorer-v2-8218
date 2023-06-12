import { BeerInterface } from 'interfaces/beer';
import { GetQueryInterface } from 'interfaces';

export interface LocationInterface {
  id?: string;
  name: string;
  address: string;
  beer_id: string;
  created_at?: any;
  updated_at?: any;

  beer?: BeerInterface;
  _count?: {};
}

export interface LocationGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  address?: string;
  beer_id?: string;
}

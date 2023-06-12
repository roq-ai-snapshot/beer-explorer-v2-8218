import axios from 'axios';
import queryString from 'query-string';
import { BeerInterface, BeerGetQueryInterface } from 'interfaces/beer';
import { GetQueryInterface } from '../../interfaces';

export const getBeers = async (query?: BeerGetQueryInterface) => {
  const response = await axios.get(`/api/beers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBeer = async (beer: BeerInterface) => {
  const response = await axios.post('/api/beers', beer);
  return response.data;
};

export const updateBeerById = async (id: string, beer: BeerInterface) => {
  const response = await axios.put(`/api/beers/${id}`, beer);
  return response.data;
};

export const getBeerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/beers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBeerById = async (id: string) => {
  const response = await axios.delete(`/api/beers/${id}`);
  return response.data;
};

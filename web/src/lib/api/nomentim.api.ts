import axios from 'axios';
import { env } from '@/env';

export type NomentemApiParams = {
  longitude: number;
  latitude: number;
};

export type NomentimApiResponse = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  address: NomantimAddress;
  display_name: string;
  boundingbox: string[];
};

export type NomantimAddress = {
  city: string;
  state: string;
  country: string;
  country_code: string;
  postcode: string;
};

export const nomentiApi = async ({
  longitude,
  latitude,
}: NomentemApiParams) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

  const response = await axios.get<NomentimApiResponse>(url, {
    headers: {
      'User-Agent': env.VITE_PUBLIC_NOMANTIM_USER_AGENT,
    },
  });

  return response.data;
};

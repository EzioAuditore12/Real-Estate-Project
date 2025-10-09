export type Category = "electronics" | "clothing" | "books" | "toys"

export type ItemFilters = {
    query: string
    hasDiscount: boolean
    categories: Category[]
}

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
}

export type NomantimAddress = {
  city: string;
  state: string;
  country: string;
  country_code: string;
  postcode: string;
};
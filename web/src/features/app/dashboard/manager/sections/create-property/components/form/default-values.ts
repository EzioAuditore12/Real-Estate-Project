import type { PropertyParams } from '../../schemas/property-param.schema';

export const defaultPropertyParamValues: PropertyParams = {
  address: '',
  amenities: [],
  baths: '0',
  beds: '0',
  city: '',
  state: '',
  country: '',
  description: '',
  highlights: [],
  latitude: '',
  longitude: '',
  name: '',
  parkingIncluded: false,
  petAllowed: false,
  photos: [],
  postalCode: '',
  pricePerMonth: '0',
  propertyType: 'APARTMENT',
  securityDeposit: '0',
  squareFeet: '0',
};

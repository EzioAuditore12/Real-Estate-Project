import type { ComponentProps } from 'react';

import { useAppForm } from '@/lib/use-app-form';
import { cn } from '@/lib/utils';
import { useGetGeoLocation } from '@/hooks/use-get-location';

import { Button } from '@/components/ui/button';

import {
  PropertyParamSchema,
  type PropertyParams,
} from '../../schemas/property-param.schema';
import { defaultPropertyParamValues } from './default-values';
import { AmenityTypeEnum } from '@/features/app/-enums/amenity.enum';
import { HighlightTypeEnum } from '@/features/app/-enums/highlights.enum';
import { PropertyTypeEnum } from '@/features/app/-enums/property-type.enum';

interface CreatePropertyFormProps extends ComponentProps<'form'> {
  handleSubmit: (data: PropertyParams) => void;
  isRequestPending: boolean;
}

export const CreatePropertyForm = ({
  className,
  handleSubmit,
  isRequestPending,
  ...props
}: CreatePropertyFormProps) => {
  const { coords, state, city, country, postalCode } = useGetGeoLocation();

  const appForm = useAppForm({
    validators: { onChange: PropertyParamSchema },
    defaultValues: defaultPropertyParamValues,
    onSubmit: ({ value }) => {
      console.log(value);
      handleSubmit(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        appForm.handleSubmit();
      }}
      className={cn(className)}
      {...props}
    >
      {/* Basic Info */}
      <h2 className="mb-2 text-lg font-semibold">Basic Info</h2>
      <appForm.AppField name="name">
        {(field) => <field.InputField />}
      </appForm.AppField>
      <appForm.AppField name="description">
        {(field) => <field.InputField />}
      </appForm.AppField>
      <appForm.AppField name="propertyType">
        {(field) => <field.ToggleField options={PropertyTypeEnum.options} />}
      </appForm.AppField>
      <appForm.AppField name="pricePerMonth">
        {(field) => <field.InputField />}
      </appForm.AppField>
      <appForm.AppField name="securityDeposit">
        {(field) => <field.InputField />}
      </appForm.AppField>
      <appForm.AppField name="squareFeet">
        {(field) => <field.InputField />}
      </appForm.AppField>

      {/* Details */}
      <h2 className="mt-6 mb-2 text-lg font-semibold">Details</h2>
      <appForm.AppField name="beds">
        {(field) => <field.InputField type="number" />}
      </appForm.AppField>
      <appForm.AppField name="baths">
        {(field) => <field.InputField type="number" />}
      </appForm.AppField>
      <appForm.AppField name="photos">
        {(field) => <field.ImageUploadField />}
      </appForm.AppField>

      {/* Amenities & Highlights */}
      <h2 className="mt-6 mb-2 text-lg font-semibold">
        Amenities & Highlights
      </h2>
      <appForm.AppField name="amenities">
        {(field) => (
          <field.ToggleGroupField
            labelName="Amenities"
            options={AmenityTypeEnum.options}
          />
        )}
      </appForm.AppField>
      <appForm.AppField name="highlights">
        {(field) => (
          <field.ToggleGroupField
            labelName="Highlights"
            options={HighlightTypeEnum.options}
          />
        )}
      </appForm.AppField>

      {/* Location */}
      <div className="relative">
        <Button
          className="absolute right-0"
          onClick={() => {
            // Fix: use coords.lat and coords.lng (not latitude/longitude)
            appForm.setFieldValue(
              'latitude',
              coords?.lat != null ? String(coords.lat) : '',
            );
            appForm.setFieldValue(
              'longitude',
              coords?.lng != null ? String(coords.lng) : '',
            );
            appForm.setFieldValue('city', city ?? '');
            appForm.setFieldValue('state', state ?? '');
            appForm.setFieldValue('country', country ?? '');
            appForm.setFieldValue('postalCode', postalCode ?? '');
          }}
        >
          Use My Location
        </Button>
        <h2 className="mt-6 mb-2 text-lg font-semibold">Location</h2>
        <appForm.AppField name="address">
          {(field) => <field.InputField />}
        </appForm.AppField>
        <appForm.AppField name="city">
          {(field) => <field.InputField />}
        </appForm.AppField>
        <appForm.AppField name="state">
          {(field) => <field.InputField />}
        </appForm.AppField>
        <appForm.AppField name="country">
          {(field) => <field.InputField />}
        </appForm.AppField>
        <appForm.AppField name="latitude">
          {(field) => <field.InputField />}
        </appForm.AppField>
        <appForm.AppField name="longitude">
          {(field) => <field.InputField />}
        </appForm.AppField>
        <appForm.AppField name="postalCode">
          {(field) => <field.InputField />}
        </appForm.AppField>
      </div>

      {/* Other */}
      <h2 className="mt-6 mb-2 text-lg font-semibold">Other</h2>
      <appForm.AppField name="parkingIncluded">
        {(field) => <field.CheckboxField label="Parking Included" />}
      </appForm.AppField>
      <appForm.AppField name="petAllowed">
        {(field) => <field.CheckboxField label="Pet Allowed" />}
      </appForm.AppField>

      <Button type="submit" className="mt-6" disabled={isRequestPending}>
        {isRequestPending ? 'Submitting' : 'Submit'}
      </Button>
    </form>
  );
};

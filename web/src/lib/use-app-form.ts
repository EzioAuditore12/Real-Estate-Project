import { createFormHook } from '@tanstack/react-form';

import { fieldContext, formContext } from './form-context';

import { TextField } from '@/components/form/text-field';
import { SubmitButton } from '@/components/form/submit-button';
import { InputField } from '@/components/form/input-field';
import { CheckboxField } from '@/components/form/checkbox-field';
import { ToggleField } from '@/components/form/toggle-field';
import { ToggleGroupField } from '@/components/form/toggle-group-field';
import { ImageUploadField } from '@/components/form/image-upload-field';

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    InputField,
    CheckboxField,
    ToggleField,
    ToggleGroupField,
    ImageUploadField
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { aiLocationDataParamSchema } from '@/features/app/non-dashboard/search/schemas/ai-location-data/param.schema';
import { useGetAiLocationData } from '@/features/app/non-dashboard/-mutations/use-get-ai-location-data';

import { useAppForm } from '@/lib/use-app-form';

export function HeroSearchBar() {
  const { mutate, isPending } = useGetAiLocationData();

  const searchForm = useAppForm({
    defaultValues: {
      prompt: '',
    },
    validators: { onChange: aiLocationDataParamSchema },
    onSubmit: ({ value }) => {
      console.log(value);
      mutate(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchForm.handleSubmit();
      }}
      className="flex justify-center"
    >
      <searchForm.Field name="prompt">
        {(field) => (
          <Input
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            type="text"
            placeholder="Search by city, neighborhood or address"
            className="h-12 w-full max-w-lg rounded-none rounded-l-xl border-none bg-white"
          />
        )}
      </searchForm.Field>
      <Button
        type="submit"
        disabled={isPending}
        className="h-12 rounded-none rounded-r-xl border-none bg-red-500 text-white hover:bg-red-600"
      >
        Search
      </Button>
    </form>
  );
}

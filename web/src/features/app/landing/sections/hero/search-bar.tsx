import { useEffect } from 'react';
import { useJoyride } from 'react-joyride';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { aiLocationDataParamSchema } from '@/features/app/non-dashboard/search/schemas/ai-location-data/param.schema';
import { useGetAiLocationData } from '@/features/app/non-dashboard/-mutations/use-get-ai-location-data';

import { useAppForm } from '@/lib/use-app-form';

const steps = [
  {
    target: '.tour-search-bar',
    content:
      'This search is powered by Spring AI and understands natural language queries.',
  },
  {
    target: '.tour-example-query',
    content:
      'Try this example query. Spring AI automatically extracts the location and search radius.',
  },
  {
    target: '.tour-submit-button',
    content:
      'Submit the query and the platform converts it into structured geospatial filters before searching indexed properties.',
  },
];

const EXAMPLE_QUERY = 'I want residences in Mumbai, Maharashtra within 10 km';

export function HeroSearchBar() {
  const { mutate, isPending } = useGetAiLocationData();

  const { controls, on, Tour } = useJoyride({
    continuous: true,
    options: {
      showProgress: true,
      skipScroll: true,
      skipBeacon: true,
    },
    steps,
  });

  const searchForm = useAppForm({
    defaultValues: {
      prompt: EXAMPLE_QUERY,
    },
    validators: { onChange: aiLocationDataParamSchema },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hero-search-tour-completed');

    if (!hasSeenTour) {
      controls.start();
    }

    return on('tour:end', () => {
      localStorage.setItem('hero-search-tour-completed', 'true');
    });
  }, [controls, on]);

  return (
    <>
      {Tour}

      <div className="tour-search-bar">
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
            className="tour-submit-button h-12 rounded-none rounded-r-xl"
          >
            {isPending ? 'Searching...' : 'Search'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            className="tour-example-query text-muted-foreground mt-3 text-sm underline"
            onClick={() => searchForm.setFieldValue('prompt', EXAMPLE_QUERY)}
          >
            Example: {EXAMPLE_QUERY}
          </button>
        </div>
      </div>
    </>
  );
}

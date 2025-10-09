import type { QueryOptions } from "@tanstack/react-query";

import { nomentiApi, type NomentemApiParams, type NomentimApiResponse } from "../-api/nomentim.api";

export const userLocationQuery = (params: NomentemApiParams): QueryOptions<NomentimApiResponse> => ({
    queryKey: ["user-location", params.latitude, params.longitude],
    queryFn: () => nomentiApi(params),
});
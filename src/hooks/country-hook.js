import { getAllCountriesRequest, createCountryRequest, getCountryById, updateCountryRequest, getPaginatedCountriesRequest } from "@/service/dataRequests/countryService";
import { useQuery, useQueryClient, useMutation } from "react-query";


const useAllCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: getAllCountriesRequest
  });
};

const usePaginatedCountries = (searchParams, initialData = undefined) => {
  const urlSearchParams = new URLSearchParams(searchParams.toString())

  const page = urlSearchParams.get('page');

  if (page) {
    urlSearchParams.set("page", parseInt(page) - 1)
  }

  return useQuery({
    queryKey: ["countries", urlSearchParams.toString()],
    queryFn: async () => {
      const response = await getPaginatedCountriesRequest(urlSearchParams);
      return response.data
    },
    initialData: initialData
  })
}


const useCountryById = (countryId) => {
  return useQuery(
    ["countries", { countryId }],
    async () => await getCountryById(countryId),
    { refetchOnWindowFocus: false, enabled: !!countryId }
  );
};



const useCreateCountry = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return createCountryRequest(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("countries");
      },
    }
  );
}


const useUpdateCountry = (countryId) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return updateCountryRequest(data, countryId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["countries"]);
        queryClient.invalidateQueries(["countries", { countryId }]);
      },
    }
  );
}


export {
  useAllCountries,
  usePaginatedCountries,
  useCreateCountry,
  useCountryById,
  useUpdateCountry
};
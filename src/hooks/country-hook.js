import {getAllCountriesRequest, createCountryRequest, getCountryById, updateCountryRequest} from "@/service/dataRequests/countryService";
import { useQuery, useQueryClient, useMutation } from "react-query";


const useAllCountries = () => {
    return useQuery(["countries"],  getAllCountriesRequest);
};

const useCountryById = (countryId) => {
  return useQuery(["countries", {countryId}], getCountryById);
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
        queryClient.invalidateQueries("countries");
      },
    }
  );
}


export {
    useAllCountries,
    useCreateCountry,
    useCountryById,
    useUpdateCountry
  };
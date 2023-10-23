import { Inter } from 'next/font/google'
import Link from "next/link";
import { useQueryClient } from 'react-query'
import Pagination from "@/components/Pagination";
import { usePaginatedCountries } from "@/hooks/country-hook";
import { useSearchParams } from "next/navigation";
import Loading from '@/components/Loading';

import { getPaginatedCountriesRequest } from "@/service/dataRequests/countryService";
const inter = Inter({ subsets: ['latin'] })


export default function CountriesWithSSR2({ countries }) {
    const searchParams = useSearchParams();
    const { data, isLoading } = usePaginatedCountries(searchParams, countries);

    if (isLoading) {
        return <Loading />
    }

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <Link href="/country/add" className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'><h2>Add new Country</h2></Link>

            <h2 className='my-5 text-lg'>Total count: {data?.content?.length}</h2>
            <table className='text-white'>
                <tbody>
                    {
                        data?.content?.map(country => (
                            <tr key={country.id}>
                                <td className='w-[50px]'>{country.id}</td>
                                <td className='w-[50px]'>{country.isoCode}</td>
                                <td>{country.nameAr}</td>
                                <td>{country.nameEn}</td>
                                <td>{country.nameFr}</td>
                                <td>{country.topCountry.toString()}</td>
                                <td><Link className="font-bold pl-5" href={`/country/${country.id}/edit`}>Edit</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Pagination totalPages={data?.totalPages} />

        </main>
    )
}

export const getServerSideProps = async (ctx) => {
    const { query } = ctx;
    const params = new URLSearchParams(query);
    const page = params.get('page');

    if (page) {
        params.set("page", parseInt(page) - 1)
    }

    const response = await getPaginatedCountriesRequest(params);
    const countries = response.data;

    return {
        props: {
            countries
        },
    }
}
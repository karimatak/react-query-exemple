import { Inter } from 'next/font/google'
import { usePaginatedCountries } from '@/hooks/country-hook'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  const searchParams = useSearchParams();
  const { data, isLoading, } = usePaginatedCountries(searchParams);


  if (isLoading) {
    return <Loading />
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className='flex'>
        <Link href="/country/add" className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'><h2>Add new Country</h2></Link>
        <Link href="/countries-with-ssr" className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'><h2>Countries SSR</h2></Link>
      </div>
      <h2 className='my-5 text-lg'>Total count: {data?.data?.content?.length}</h2>
      {console.log("rendered")}
      <table className='text-white'>
        <tbody>
          {
            data?.data?.content?.map(country => (
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

      <Pagination totalPages={data?.data?.totalPages} />

    </main>
  )
}
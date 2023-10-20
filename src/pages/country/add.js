import { useCreateCountry } from "@/hooks/country-hook";
import CountryForm from "@/components/CountryForm";
import { Inter } from 'next/font/google'
import { useRouter } from "next/router";
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })


const Add = () => {


    const { mutate: addMutate, isError } = useCreateCountry();
    const router = useRouter();


    const handleSubmit = (country) => {
        addMutate(
            country,
            {
                onSuccess: (response) => {
                    console.log("SUCCESS --> ", response)
                    router.push('/');
                },
            }
        );
    }


    return (
        <main
            className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
        >
            <Link href="/" className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-5'>
                <h2>Back to home</h2>
            </Link>
            <CountryForm onSubmit={handleSubmit} />
        </main>
    )
}

export default Add;
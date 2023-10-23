import CountryForm from "@/components/CountryForm";
import { useCountryById, useUpdateCountry } from "@/hooks/country-hook";
import Link from 'next/link'
import { useRouter } from "next/router";

const EditCountry = ({ countryId }) => {

    const { mutate: updateCountry } = useUpdateCountry(countryId);

    const { data, isFetched } = useCountryById(countryId);

    const router = useRouter();

    const handleSubmit = (country) => {
        updateCountry(
            country,
            {
                onSuccess: () => {
                    router.push("/");
                },
            }
        );
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <Link href="/"><h2>Go to home</h2></Link>
            {/* <CountryForm onSubmit={() => {}} updateCountry={data?.data} /> */}
            {isFetched && <CountryForm onSubmit={handleSubmit} updateCountry={data?.data} />}
        </main>
    )
}



export async function getStaticProps({ params }) {
    const countryId = params?.countryId;
    return {
        props: {
            countryId
        },
    }
}


export const getStaticPaths = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}


export default EditCountry
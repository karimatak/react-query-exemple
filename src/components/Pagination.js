import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";



const Pagination = ({ totalPages }) => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const page = parseInt(searchParams.get("page") ?? 1);

    const handlePageChange = (page) => {
        if (window !== undefined) {
            if (page <= totalPages && page > 0) {
                const { pathname, searchParams } = new URL(window.location);
                searchParams.set('page', page);

                const search = searchParams.toString();
                router.push(`${pathname}?${search}`, null, { shallow: true }); // shalow prevent execution of getServerSideProps
            }
        }
    }


    return (
        <nav className='mt-5'>
            <ul className="inline-flex -space-x-px text-sm cursor-pointer">
                <li>
                    <button className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 
            bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 
            dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page == 1}
                    >
                        Previous
                    </button>
                </li>

                {
                    Array.from(Array(totalPages), (e, index) => (
                        <li key={index}>
                            <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 
            bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 
            dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))

                }

                <li>
                    <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 
            bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 
            dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={totalPages == page}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;
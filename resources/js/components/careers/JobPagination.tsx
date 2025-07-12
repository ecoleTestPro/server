import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const JobPagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="mt-10 flex justify-center space-x-2">
            <button disabled={currentPage === 1} className="rounded px-3 py-1 bg-gray-200" onClick={() => onPageChange(1)}>
                &laquo;
            </button>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded px-3 py-1 bg-gray-200 disabled:opacity-50"
                aria-label="Page précédente"
            >
                <FaAngleLeft className="h-4 w-4" />
            </button>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`cursor-pointer rounded px-3 py-1 ${number === currentPage ? 'bg-primary text-white' : 'bg-gray-200'}`}
                >
                    {number}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded px-3 py-1 bg-gray-200 disabled:opacity-50"
                aria-label="Page suivante"
            >
                <FaAngleRight className="h-4 w-4" />
            </button>
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(totalPages)}
                className="rounded px-3 py-1 bg-gray-200"
                aria-label="Dernière page"
            >
                &raquo;
            </button>
        </nav>
    );
};

export default JobPagination;

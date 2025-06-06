interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="mt-10 flex justify-center space-x-2">
            {/* Flèche précédente */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded px-3 py-1 bg-gray-200 disabled:opacity-50"
                aria-label="Page précédente"
            >
                &laquo;
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
            {/* Flèche suivante */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded px-3 py-1 bg-gray-200 disabled:opacity-50"
                aria-label="Page suivante"
            >
                &raquo;
            </button>
        </nav>
    );
};

export default Pagination;

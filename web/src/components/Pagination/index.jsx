import ReactPaginate from 'react-paginate';
import './styles.scss';

export default function Pagination({ onChangePage, paginator }) {
    return (
        <div className="pagination">
            <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                pageRangeDisplayed={1}
                previousLabel="<<"
                pageCount={paginator.totalPages || 1}
                initialPage={paginator.page === 0 ? 0 : paginator.page - 1}
                onPageChange={({ selected }) => onChangePage(selected + 1)}
                disableInitialCallback={true}
            />
        </div>
    );
}

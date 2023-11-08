const Pagination = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination'>
      {pageNumbers.map((number) => (
        <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
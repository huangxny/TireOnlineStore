const SortButtons = ({setSortOption, setSortDirection, sortDirection}) => {
  return (
    <div className='sortButtons'>
      <button onClick={() => setSortOption('diameter')}>Sort by Diameter</button>
      <button onClick={() => setSortOption('width')}>Sort by Width</button>
      <button onClick={() => setSortOption('name')}>Sort by Name</button>
      <button onClick={() => setSortOption('price')}>Sort by Price</button>
      <button onClick={() => setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'))}>
        {sortDirection === 'asc' ? 'Descending Order' : 'Ascending Order'}
      </button>
    </div>
  );
};

export default SortButtons;

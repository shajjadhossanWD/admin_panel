import React from 'react';
import { useParams } from 'react-router-dom';
import Shop from '../Shop';

const SearchPath = () => {
  const { keyword, page, query } = useParams()
  return (
    <div>
      <Shop keyword={keyword} page={page} query={query} />
    </div>
  );
};

export default SearchPath;
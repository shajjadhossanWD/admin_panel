import React from 'react';
import { useParams } from 'react-router-dom';
import Shop from '../Shop';

const CatPath = () => {
  const { keyword, page } = useParams()
  return (
    <div>
      <Shop keyword={keyword} page={page} />
    </div>
  );
};

export default CatPath;
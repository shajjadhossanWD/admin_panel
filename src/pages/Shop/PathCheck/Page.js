import React from 'react';
import { useParams } from 'react-router-dom';
import Shop from '../Shop';

const Page = () => {
  const { page } = useParams()

  return (
    <div>
      <Shop page={page} />
    </div>
  );
};

export default Page;
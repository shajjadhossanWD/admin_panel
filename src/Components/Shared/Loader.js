import React from 'react';
import { GridLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className='container mx-auto text-center d-flex justify-content-center align-items-center' style={{ height: "30vh" }}>
            <GridLoader color="#36d7b7" />
        </div>
    );
};

export default Loader;
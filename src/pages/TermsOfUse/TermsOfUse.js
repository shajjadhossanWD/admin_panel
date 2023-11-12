import React, { useEffect, useState } from 'react';
import PageTitle from '../../Components/Common/PageTitle';
import parse from 'html-react-parser';
import axios from 'axios';
const TermsOfUse = () => {
    const [data, setData] = useState('');


    useEffect(() => {
        const getData = async () => {
            await axios.get('https://backend.dsl.sg/api/v1/page/termsofuse')
                .then(res => {
                    console.log(res.data)
                    setData(res.data.page.content);
                })
        };
        getData();
    }, []);
    return (
        <div className='container'>
            <PageTitle title="Terms Of Use" />
            <p className='px-2'>{parse(data)}</p>
        </div>
    );
};

export default TermsOfUse;
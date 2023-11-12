import PersonIcon from '@mui/icons-material/Person';
import { Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import swal from "sweetalert";

import axios from 'axios';
import { Link } from 'react-router-dom';
import './News.css';
import PageTitle from '../../Components/Common/PageTitle';

function News() {
   const [loading, setLoading] = useState(false);
   const [allNews, setAllNews] = useState([]);
   const [news, setNews] = useState({});

   const search = window.location.search;
   const params = new URLSearchParams(search);
   const title = params.get('news');



   useEffect(() => {
      setNews(allNews.find(news => news.title === title));
   }, [title])

   console.log(title)

   useEffect(() => {
      axios.get("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@dslsingapore")
         .then(res => {
            const allNewsObj = res.data.items;
            const allNews = [];
            for (const item in allNewsObj) {
               allNews.push(allNewsObj[item]);
            }
            setAllNews(allNews);
            setNews(allNews[0]);
         })
   }, []);

   useEffect(() => {
      if (allNews.length <= 0) {
         setLoading(true);
      }
   }, [allNews.length])

   return (
      <div className="news-wrapper" >
         <PageTitle title="News" />
         <div>
            <Container className='section-pading2'>
               <div className='row'>
                  <div className="col-12 col-lg-8">
                     <img src={news?.thumbnail} alt="" className=' w-100 mx-auto' />

                     <div className="d-flex justify-content-between mt-2">
                        <Link className='d-flex footerLink' to='# '>
                           <PersonIcon className='personIcon' />
                           <div>
                              <p className="byAdmin ">
                                 By Admin
                              </p>
                           </div>
                        </Link>
                        {/* {loading && <LoaderTop></LoaderTop>}
                        <p className="local_text">
                           {news?.publication_date}
                        </p> */}
                     </div>
                     <div className="text-start pb-3">
                        <Link to={`/news?news=${news?.title}`} className="news-title py-4">
                           {news?.title}
                        </Link>
                     </div>
                     <div className='news-description text-start ' dangerouslySetInnerHTML={{ __html: news?.description }}></div>
                  </div>
                  <div className="col-12 col-lg-4 text-start mt-4">
                     <h4>RECENT NEWS</h4>
                     {
                        allNews.map((news, index) => <Link className="d-flex mt-4 align-items-center text-decoration-none text-dark" to={`/news?news=${news?.title}`} key={index}>
                           {/* <div style={{ width: "80px", height: "auto" }}>
                              <img src={news?.thumbnail} style={{ width: "80px", height: "100%" }} />
                           </div> */}
                           <div className="text-start text-decoration-none">
                              <p className='mb-2 ' style={{ fontSize: 14 }}>{news?.title}</p>
                              <p className="mb-0 " style={{ fontSize: 12, fontWeight: 500 }}>{news?.publication_date}</p>
                           </div>
                        </Link>
                        )
                     }

                  </div>

               </div>

            </Container>
         </div>
      </div>
   );
}

export default News;
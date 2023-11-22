import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import Table from "react-bootstrap/Table";
import swal from "sweetalert";
import axios from "axios";
import "./AllBookings.css";
import { Link } from "react-router-dom";
import Pagination from "../../../../Components/Pagination/Pagination";
import { Card, Col, Row } from "react-bootstrap";
import { CSVLink } from "react-csv";


const TodayBookings = () => {
const [categories, setCategories] = useState([]);



  //****************************** Pagination Start ******************************/
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [sliceCategories, setSliceCategories] = useState([]);






  useEffect(() => {
    const lastPage = Math.ceil(categories?.length / show);
    setLastPage(lastPage);
  }, [categories, show]);


  const pageHandle = (jump) => {
    setPage(parseInt(jump));
  };


  useEffect(() => {
    if (getPage) {
      const page = parseInt(getPage);
      const getSlicingCategory = categories?.slice(
        (page - 1) * show,
        page * show
      );
      setSliceCategories([...getSlicingCategory]);
      setPage(parseInt(page));
    } else {
      const getSlicingProduct = categories?.slice(0, show);
      setSliceCategories([...getSlicingProduct]);
    }
  }, [categories, show, getPage]);

 

  //****************************** Pagination End ******************************/

  const getCategory = () => {
    fetch(`https://kccb.kvillagebd.com/api/v1/booking/get/today-bookings`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);

        console.log("data : -------------------- " , data)
        if (data)
          data.forEach((data) => {
            // console.log(data._id);
          });
      });
  };


  useEffect(() => {
    getCategory();
  }, []);
  

  const deleteWarning = (category) => {
    swal({
      title: "Are you sure to delete " + category.roomSelect + " room Booking ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDelete(category._id);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };


  const handleDelete = async (id) => {
    console.log("handleDelete");
    console.log(id);
    try {
      const response = await axios.delete(
        "https://kccb.kvillagebd.com/api/v1/booking/delete/" + id
      );
      if (response.status === 200) {
        swal({
          text: response.data.message,
          icon: "success",
          button: "OK!",
          className: "modal_class_success",
        });
      }
      console.log(response);
      getCategory();
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };



  const handleSearch = async (e) => {
    e.preventDefault();

    const { name, value } = e.target;
  
    if ( name === 'room') {

      const currentTime = new Date();
      currentTime.setUTCHours(0, 0, 0, 0); 
      const currentDay = currentTime.getUTCDate().toString().padStart(2, '0');    
      const currentMonth = (currentTime.getUTCMonth() + 1).toString().padStart(2, '0'); 
      const currentYear = currentTime.getUTCFullYear();
      const currentDate = `${currentDay}-${currentMonth}-${currentYear}`;


      const currentRooms = document.querySelector('select[name="room"]').value;
      
      if (currentDate && currentRooms){
        const currentRoom = document.querySelector('select[name="room"]').value;
        try {
          const response = await fetch(`https://kccb.kvillagebd.com/api/v1/booking/search-by-room-date?date=${currentDate}&room=${currentRoom}`);
          const data = await response.json();
          setCategories(data.results);

        } catch (error) {
          console.error('Error fetching data:', error);
        }

        if(currentRoom === "default"){
          getCategory();
        }
      }  
    }
  };




  const formatDataForCSV = (data) => {
    const formattedData = data.map(item => ({
      'Email': item.email ? item.email : 'No email address',
      'Name': item.name,
      'Designation': item.designation,
      'User ID': item.userId,
      'Booking Date': item.bookingDate,
      'Booking Time': item.showingTime.join(', '),
      'Booking Category': item.bookingCategory,
      'Guest': item.guest,
      'Room Select': item.roomSelect,
    }));
  
    return formattedData;
  };

  
  const csvData = formatDataForCSV(categories);



  return (
    <>
      <h5 className="text-white text-start text-uppercase pt-1">TODAYS ALL BOOKINGS</h5>

        <Row className="g-5">
          <Col className="py-2">
            <Card className="customerCard">
              <Card.Body>
                <Card.Text className="dashboardTxt">
                  <div className="d-flex flex-column flex-lg-row justify-content-evenly gap-3">
                    <select
                      onChange={(e) => handleSearch(e)}
                      name="room"
                      className="py-2 pl-2 border border-white rounded w-100 w-lg-25"
                      style={{ cursor: "pointer", borderRadius: "5px" }}
                    >
                      <option value="default">Select Room</option>
                      <option value="Billiard-1">Billiard-1</option>
                      <option value="Billiard-2">Billiard-2</option>
                      <option value="Billiard-3">Billiard-3</option>
                      <option value="Billiard-4">Billiard-4</option>
                      <option value="Meeting">Meeting</option>
                    </select>

                    <button className="w-100 w-lg-25 rounded btn btn-success fs-5">

                      <CSVLink data={csvData} filename={'bookings.csv'} style={{ color: "white" }}>
                        Download All Bookings
                      </CSVLink>

                    </button>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      <div className="productCard pb-2">
        
        <Table style={{ color: "white" }}>
          <thead>
            <tr>
              <th>User Id</th>
              <th>Booking Time</th>
              <th>Date</th>
              <th>Room</th>
              <th className="text-end">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {
              sliceCategories.map((category) => (
                <tr key={category._id}>
                  <td>{category.userId}</td>
                  <td>{category.bookingTime[0]}</td>
                  <td>{category.bookingDate}</td>
                  <td>{category.roomSelect}</td>

                  <td>
                    <div className="text-end">
                      <Tooltip title="Update category." placement="top">

                      <Link to={`/admin/all-bookings/${category?._id}`}>
                        <button
                          type="button"
                          className="editBtn"
                         >
                          <i className="fas fa-eye"></i>
                        </button>
                      </Link>
                      
                      </Tooltip>
                      <Tooltip title="Delete category." placement="top">
                        <button
                          className="deleteBtn"

                          onClick={() => {
                            deleteWarning(category);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        {/* Pagination  */}
        <div className="">
          {sliceCategories?.length ? (
            <Pagination
              lastPage={lastPage}
              page={getPage}
              pageHandle={pageHandle}
            />
          ) : (
            <></>
          )}
        </div>
      </div>

   
    </>
  );
};

export default TodayBookings;

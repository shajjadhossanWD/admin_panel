import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import Table from "react-bootstrap/Table";
import swal from "sweetalert";
import axios from "axios";
import "./AllBookings.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pagination from "../../../../Components/Pagination/Pagination";
import { Card, Col, Row } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { useRef } from "react";
import AdBookingsModel from "./AdBookingsModel";



const RoomBookings = () => {
  const [categories, setCategories] = useState([]);
  const {date, room} = useParams();
  //****************************** Pagination Start ******************************/
  const navigate = useNavigate();
  const [getPage, setPage] = useState(1);
  const [show, setShow] = useState(12);
  const [lastPage, setLastPage] = useState(0);
  const [sliceCategories, setSliceCategories] = useState([]);

  const [modalShowNewAdmin, setModalShowNewAdmin] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const inputRef = useRef(null);

  



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
    
    fetch(`https://kccb.kvillagebd.com/api/v1/booking/get/bookings-date-room?bookingDate=${date}&roomSelect=${room}`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
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
        handleDelete(category.bookedId);
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


  const handleSearch = async () => {
    const currentDateInput = document.querySelector('input[name="date"]');
    const currentDate = currentDateInput.value;
  
    const currentRoomSelect = document.querySelector('select[name="room"]');
    const currentRoom = currentRoomSelect.value;
  
    if (currentDate && currentRoom && currentDate !== 'Invalid Date') {
      const parts = currentDate.split('-');
      const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  
      try {
        const response = await fetch(`https://kccb.kvillagebd.com/api/v1/booking/get/bookings-date-room?bookingDate=${formattedDate}&roomSelect=${currentRoom}`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };





  const handleSearchByDate = async (e) => {
    e.preventDefault();

    const { name, value } = e.target;
  
    if (name === 'date') {
      const currentDateInput = document.querySelector('input[name="date"]');

      const currentDate = currentDateInput.value;

        const parts = currentDate.split('-');
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        try {
          const response = await fetch(`https://kccb.kvillagebd.com/api/v1/booking/get/all-room-bookings?bookingDate=${formattedDate}`);
          const data = await response.json();
          setCategories(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
      
  }
  
  
  // const formatDataForCSV = (data) => {
  //   const formattedData = data.map(item => ({
  //     'Email': item.email ? item.email : 'No email address',
  //     'Name': item.name,
  //     'Designation': item.designation,
  //     'User ID': item.userId,
  //     'Booking Date': item.bookingDate,
  //     'Booking Time': item.showingTime.join(', '),
  //     'Booking Category': item.bookingCategory,
  //     'Guest': item.guest,
  //     'Room Select': item.roomSelect,
  //   }));
  
  //   return formattedData;
  // };

  
  // const csvData = formatDataForCSV(categories);





  const lang = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Dhaka',
    hourCycle: 'h23',
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
  const [datePart, timePart] = lang.split(', ');
   
  const dateObject = new Date(lang);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

  function parseCustomDateString(dateString) {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  const date1 = parseCustomDateString(formattedDate);





  function compareTimes(time1, time2) {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);
  
    const date1 = new Date(0, 0, 0, hours1, minutes1);
    const date2 = new Date(0, 0, 0, hours2, minutes2);
  
    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    } else {
      return 0; 
    }
  }
  const time1 = timePart;

  



  return (
    <>
      <h5 className="text-white text-start text-uppercase pt-1">ALL BOOKINGS</h5>
    
      <Row className="g-5">
        <Col className="py-2">
          <Card className="customerCard">
            <Card.Body>
              <Card.Text className="dashboardTxt">
              <div className="d-flex flex-column flex-lg-row justify-content-evenly gap-3">
                    <input
                    type="Date"
                    name="date"
                    className="py-3 pl-2 w-100 w-lg-25 rounded"
                    style={{ lineHeight: "normal" }}
                    onClick={() => inputRef.current.focus()}
                    onFocus={() => inputRef.current.blur()}
                    ref={inputRef}
                    />
                    <select
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
                    <button className="w-100 w-lg-25 rounded btn btn-success fs-5" onClick={() => handleSearch()}>
                    Search
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
              <th>Date</th>
              <th>Room</th>
              <th>Time-slot</th>
              <th>Status</th>
              {/* <th>Room</th> */}
              <th className="text-end">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {
              sliceCategories.map((category) => (
                <tr key={category.slot_time}>
                  <td>{category.date}</td>
                  <td>{category.room}</td>
                  <td>{category.slot_time}</td>

                  
                 <td>{(category.slot_booking == true) ? "Booked" : 
                   <>

                        {(parseCustomDateString(category?.date) < date1 || (parseCustomDateString(category?.date) <= date1 && compareTimes(time1, category?.exact_time) > 0) ) ? 
                            <Tooltip title="Booking Time Expired" placement="top">
                            <button 
                            className="btn btn-danger"
                            // disabled={(parseCustomDateString(category?.date) < date1 || (parseCustomDateString(category?.date) <= date1 && compareTimes(time1, category?.exact_time) > 0) ) ? true : false}
                            >

                            <i class="fas fa-times-circle"></i> 
                            </button>
                            </Tooltip>
                            :
                          <Tooltip title="Add Booking now" placement="top">
                            <button 
                            className="btn btn-info"
                            onClick={() => setModalShowNewAdmin(true)}
                            disabled={(parseCustomDateString(category?.date) < date1 || (parseCustomDateString(category?.date) <= date1 && compareTimes(time1, category?.exact_time) > 0) ) ? true : false}
                            >

                            <i class="fas fa-plus"></i> 
                            </button>
                            </Tooltip>
                        
                        }             
                    </>
                  
                  }</td>
                   
                  

                  <td>
                  <div className="text-end">
                      <Tooltip title="Update category." placement="top">
                      <Link to={`/admin/all-bookings/${category?.bookedId}`}>
                        <button
                          type="button"
                          className="editBtn"
                          disabled={category?.bookedId == null ? true: false}
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Delete category." placement="top">
                        <button
                          className="deleteBtn"
                          disabled={category?.bookedId == null ? true: false}
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

      <AdBookingsModel
          show={modalShowNewAdmin}
          refetch={refetch}
          setRefetch={setRefetch}
          setModalShowNewAdmin={setModalShowNewAdmin}
          onHide={() => setModalShowNewAdmin(false)}
        />
    </>
  );
};

export default RoomBookings;

import React, { forwardRef, useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import Table from "react-bootstrap/Table";
import swal from "sweetalert";
import "./AllBookings.css";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../../../Components/Pagination/Pagination";
import { Card, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AllBookings = () => {
  const [categories, setCategories] = useState([]);
  //****************************** Pagination Start ******************************/
  const navigate = useNavigate();
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

  const [startDate, setStartDate] = useState(new Date());

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="datepickerCls" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const getCategory = () => {
    const currentDate = startDate;
     console.log("currentDate " , currentDate)

     // Assuming inputDate is the date string you provided
     var inputDate = new Date(currentDate);

     // Extracting day, month, and year
     var day = ("0" + inputDate.getDate()).slice(-2);
     var month = ("0" + (inputDate.getMonth() + 1)).slice(-2);
     var year = inputDate.getFullYear();

     // Creating the formatted date string
     var formattedDate = day + '-' + month + '-' + year;
    
    fetch(`https://kccb.kvillagebd.com/api/v1/booking/get/all-room-bookings?bookingDate=${formattedDate}`)
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
  }, [startDate]);

 



  // const deleteWarning = (category) => {
  //   swal({
  //     title: "Are you sure to delete " + category.roomSelect + " room Booking ?",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       handleDelete(category._id);
  //     } else {
  //       swal("Your imaginary file is safe!");
  //     }
  //   });
  // };


  // const handleDelete = async (id) => {
  //   console.log("handleDelete");
  //   console.log(id);
  //   try {
  //     const response = await axios.delete(
  //       "https://kccb.kvillagebd.com/api/v1/booking/delete/" + id
  //     );
  //     if (response.status === 200) {
  //       swal({
  //         text: response.data.message,
  //         icon: "success",
  //         button: "OK!",
  //         className: "modal_class_success",
  //       });
  //     }
  //     console.log(response);
  //     getCategory();
  //   } catch (error) {
  //     console.log("error");
  //     console.log(error);
  //   }
  // };


  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   inputRef.current.focus();

  //   const { name, value } = e.target;
  
  //   if (name === 'date' || name === 'room') {
  //     const currentDateInput = document.querySelector('input[name="date"]');

  //     const currentDate = currentDateInput.value;
  //     const currentRooms = document.querySelector('select[name="room"]').value;

  //     if(currentDate && currentRooms === 'default'){

  //       const parts = currentDate.split('-');
  //       const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  //       try {
  //         const response = await fetch(`https://kccb.kvillagebd.com/api/v1/booking/search-by-room-date?date=${formattedDate}`);
  //         const data = await response.json();
  //         setCategories(data.results);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }

  //     } 
      
  //     else if (currentDate && currentRooms !== 'default'){

  //       const parts = currentDate.split('-');
  //       const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  //       const currentRoom = document.querySelector('select[name="room"]').value;
  //       try {
  //         const response = await fetch(`https://kccb.kvillagebd.com/api/v1/booking/search-by-room-date?date=${formattedDate}&room=${currentRoom}`);
  //         const data = await response.json();
  //         setCategories(data.results);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }

  //     }
     
  //     else if (!currentDate && currentRooms){

  //       const currentRoom = document.querySelector('select[name="room"]').value;
  //       try {
  //         const response = await fetch(`https://kccb.kvillagebd.com/api/v1/booking/search-by-room-date?room=${currentRoom}`);
  //         const data = await response.json();
  //         setCategories(data.results);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //       if(currentRoom === "default"){
  //         getCategory();
  //       }
  //     } 
  //   }
  // };






  
  
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


 



//   const handleSearchByDate = async (date) => {
//     setStartDate(date)
//     date.preventDefault();

//      const currentDate = date;
//      console.log("currentDate " , currentDate)

//      // Assuming inputDate is the date string you provided
//      var inputDate = new Date(currentDate);

//      // Extracting day, month, and year
//      var day = ("0" + inputDate.getDate()).slice(-2);
//      var month = ("0" + (inputDate.getMonth() + 1)).slice(-2);
//      var year = inputDate.getFullYear();

//      // Creating the formatted date string
//      var formattedDate = day + '-' + month + '-' + year;


//      try {
//        const response = await fetch(`https://kccb.kvillagebd.com/api/v1/booking/get/all-room-bookings?bookingDate=${formattedDate}`);
//        const data = await response.json();
//        setCategories(data);
//      } catch (error) {
//        console.error('Error fetching data:', error);
//      }
 
 
// }


  return (
    <>
      <h5 className="text-white text-start text-uppercase pt-1">ALL BOOKINGS</h5>
    
      <Row className="g-5">
        <Col className="py-2">
          <Card className="customerCard">
            <Card.Body>
              <Card.Text className="dashboardTxt">
                <div className="d-flex flex-column flex-lg-row justify-content-evenly gap-3">


                  {/* <input
                    type="Date"
                    name="date"
                    onChange={(e) => handleSearchByDate(e)}
                    className="py-3 pl-2 w-100 w-100 w-lg-25  rounded"
                    style={{lineHeight: "normal"}}
                    onClick={() => inputRef.current.focus()}
                    onFocus={() => inputRef.current.blur()}
                    ref={inputRef}
                  /> */}

                  <span className="w-100 w-lg-25">
                    <DatePicker 
                      selected={startDate} 
                      onChange={(date) => setStartDate(date)}
                      dateFormat="dd-MM-yyyy" 
                      name="date"
                      customInput={<ExampleCustomInput />}
                      className="py-3 pl-2 pr-5 rounded"
                    />
                    </span>
                          

                  
                  {/* <select
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
                  </select> */}

                  {/* <button className="w-100 w-lg-25 rounded btn btn-success fs-5">

                     <CSVLink data={csvData} filename={'bookings.csv'} style={{ color: "white" }}>
                      Download All Bookings
                    </CSVLink>

                  </button> */}
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
              <th>Bookings</th>
              {/* <th>Room</th> */}
              <th className="text-end">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {
              sliceCategories.map((category) => (
                <tr key={category.room}>
                  <td>{category.selectedDate}</td>
                  {/* <td>{category.bookingTime[0]}</td> */}
                  <td>{category.room}</td>
                  <td>{category.totalBooked}</td>

                  <td>
                    <div className="text-end">
                      <Tooltip title="See all booking history and booking details" placement="top">
                      <Link to={`/admin/bookings-details/${category.selectedDate}/${category?.room}`}>
                        <button
                          type="button"
                          className="btn btn-success"
                          
                        >
                          DETAILS
                          {/* <i className="fas fa-eye"></i> */}
                        </button>
                        </Link>
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

export default AllBookings;

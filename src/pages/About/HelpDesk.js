import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import PageTitle from '../../Components/Common/PageTitle'

const HelpDesk = () => {
  return (
    <div className="container">
      <PageTitle title="Help desk" />

      <div className='text-center mt-3'>
        <h4>Top Questions</h4>
        <ListGroup>
          <ListGroup.Item>What are the 'Delivery Timelines'?</ListGroup.Item>
          <ListGroup.Item>What are the Refund Timelines?</ListGroup.Item>
          <ListGroup.Item>How do I cancel my order?</ListGroup.Item>
          <ListGroup.Item>How do I return my item?</ListGroup.Item>
          <ListGroup.Item>Why am I seeing an Error while placing the order?</ListGroup.Item>
        </ListGroup>

      </div>

    </div>
  )
}

export default HelpDesk
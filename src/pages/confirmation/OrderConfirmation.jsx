import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOrderDetails } from '../../contexts/OrderDetails';
import AlertBanner from '../common/AlertBanner';
import Button from 'react-bootstrap/Button';

const OrderConfirmation = ({ setOrderPhase }) => {

  const [ error, setError ] = useState(false);
  const [ orderNumber, setOrderNumber ] = useState(null);
  const [ orderDetails, updateItemCount ] = useOrderDetails();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.post('http://localhost:3030/order');
        setOrderNumber(res.data.orderNumber);

      } catch (err) {
        setError(true);
      }
    };

    fetchOrder();
  }, []);

  const onClickCreateNewOrder = () => {
    [ ...orderDetails.scoops.keys() ].map(name => updateItemCount(name, 0, 'scoops'));
    [ ...orderDetails.toppings.keys() ].map(name => updateItemCount(name, 0, 'toppings'));
    setOrderPhase('inProgress');
  };

  if (error) return <AlertBanner />;

  if (orderNumber === null) return <p>Loading...</p>;

  return (
    <>
      <h2>Thank you!</h2>
      <p>Your order number is {orderNumber}</p>
      <p>As per our terms and conditions, nothing will happen now.</p>
      <Button onClick={() => onClickCreateNewOrder()}>
        Create New Order
      </Button>
    </>
  );
};

export default OrderConfirmation;

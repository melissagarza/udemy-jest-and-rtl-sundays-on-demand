import React from 'react';
import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';
import Button from 'react-bootstrap/Button';

const OrderEntry = ({ setOrderPhase }) => {

  const [ orderDetails ] = useOrderDetails();

  const hasScoops = () => {
    let result = false;

    orderDetails.scoops.forEach(count => {
      if (count > 0) result = true;
    });

    return result;
  };

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
      <Button
        onClick={() => setOrderPhase('review')}
        disabled={!hasScoops()}
      >
        Order Sundae!
      </Button>
    </div>
  );
};

export default OrderEntry;

import React from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';
import SummaryForm from './SummaryForm';

const OrderSummary = ({ setOrderPhase }) => {

  const [ orderDetails ] = useOrderDetails();

  return (
    <div>
      <h1>Order Summary</h1>

      <h2>Scoops</h2>
      {[ ...orderDetails.scoops.keys() ].map(name => (
        <p key={name}>{name} x{orderDetails.scoops.get(name)}</p>
      ))}

      {orderDetails.toppings.size > 0 && (
        <>
          <h2>Toppings</h2>
          {[ ...orderDetails.toppings.keys() ].map(name => (
            <p key={name}>{name} x{orderDetails.toppings.get(name)}</p>
          ))}
        </>
      )}

      <h2>Total: {orderDetails.totals.grandTotal}</h2>

      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

export default OrderSummary;

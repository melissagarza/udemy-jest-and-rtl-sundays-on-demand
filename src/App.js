import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';

const App = () => {

  const [ orderPhase, setOrderPhase ] = useState('inProgress');
  const phases = {
    inProgress: OrderEntry,
    review: OrderSummary,
    completed: OrderConfirmation
  };
  let Component = phases[orderPhase];

  return (
    <OrderDetailsProvider>
      <Container>
        <Component setOrderPhase={setOrderPhase} />
      </Container>
    </OrderDetailsProvider>
  );
}

export default App;

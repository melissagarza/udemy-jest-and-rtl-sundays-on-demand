import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order phases for happy path', async () => {
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  userEvent.click(cherriesCheckbox);

  // find and click order button
  const orderButton = screen.getByRole('button', { name: /order sundae/i });

  userEvent.click(orderButton);

  // check summary information based on order
  const orderSummaryHeading = screen.getByRole('heading', { name: /order summary/i });
  const grandTotal = screen.getByRole('heading', { name: /total/i });

  expect(orderSummaryHeading).toBeInTheDocument();
  expect(screen.getByText('Vanilla x1')).toBeInTheDocument();
  expect(screen.getByText('Cherries x1')).toBeInTheDocument();
  expect(grandTotal).toHaveTextContent('3.50');

  // accept terms and conditions and click button to confirm order
  const termsAndConditions = screen.getByRole('checkbox', { label: /terms and conditions/i });
  const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i });

  userEvent.click(termsAndConditions);
  userEvent.click(confirmOrderButton);

  // confirm order number on confirmation page
  const loading = screen.getByText(/loading/i);

  expect(loading).toBeInTheDocument();

  const orderNumber = await screen.findByText(/your order number is/i);
  const newOrderButton = screen.getByRole('button', { name: /create new order/i });

  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  expect(orderNumber).toHaveTextContent('1234567890');

  // click "new order" button on confirmation page
  userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsSubtotal = await screen.findByText(/scoops total/i);
  const toppingsSubtotal = await screen.findByText(/toppings total/i);
  const newGrandTotal = await screen.findByRole('heading', { name: /total/i });

  expect(scoopsSubtotal).toHaveTextContent('0.00');
  expect(toppingsSubtotal).toHaveTextContent('0.00');
  expect(newGrandTotal).toHaveTextContent('0.00');
});

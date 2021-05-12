import { render, screen, waitFor } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import OrderEntry from '../OrderEntry';

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers([
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => (
      res(ctx.status(500))
    )),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => (
      res(ctx.status(500))
    ))
  ]);

  render(<OrderEntry setOrderPhase={jest.fn()} />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');

    expect(alerts).toHaveLength(2);
  });
});

test('disable order button for no scoops', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const orderButton = await screen.findByRole('button', { name: /order sundae/i });

  expect(orderButton).toBeDisabled();

  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(orderButton).toBeEnabled();

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '0');
  expect(orderButton).toBeDisabled();
});

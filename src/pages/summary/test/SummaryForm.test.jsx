import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('checkbox enables and disables button', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByTestId('checkbox-disable-button');
  const button = screen.getByRole('button', { name: /confirm order/i });

  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);

  expect(button).toBeEnabled();

  fireEvent.click(checkbox);

  expect(button).toBeDisabled();
});

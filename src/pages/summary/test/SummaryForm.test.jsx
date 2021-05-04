import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

test('checkbox enables and disables button', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', { label: /terms and conditions/i });
  const button = screen.getByRole('button', { name: /confirm order/i });

  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();

  userEvent.click(checkbox);

  expect(button).toBeEnabled();

  userEvent.click(checkbox);

  expect(button).toBeDisabled();
});

test('popover responds to hover', async () => {
  render(<SummaryForm />);

  const popoverText = /no ice cream will actually be delievered/i;
  const nullPopover = screen.queryByText(popoverText);

  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);

  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(popoverText);

  expect(popover).toBeInTheDocument();

  userEvent.unhover(termsAndConditions);

  await waitForElementToBeRemoved(() => screen.queryByText(popoverText));
});

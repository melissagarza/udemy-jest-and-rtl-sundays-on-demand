import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const SummaryForm = () => {

  const [ isChecked, setIsChecked ] = useState(false);

  const checkboxLabel = (
    <span>
      I agree to the
      <OverlayTrigger
        placement="right"
        overlay={
          <Popover>
            <Popover.Content>
              No ice cream will actually be delievered
            </Popover.Content>
          </Popover>
        }
      >
        <span style={{ color: 'blue' }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group>
        <Form.Check
          type="checkbox"
          label={checkboxLabel}
          checked={isChecked}
          onChange={e => setIsChecked(e.target.checked)}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={!isChecked}
      >Confirm order</Button>
    </Form>
  );
};

export default SummaryForm;

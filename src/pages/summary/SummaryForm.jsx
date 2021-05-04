import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SummaryForm = () => {

  const [ isChecked, setIsChecked ] = useState(false);

  return (
    <Form>
      <Form.Group>
        <Form.Check
          data-testid="checkbox-disable-button"
          type="checkbox"
          label="I agree to the Terms and Conditions"
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

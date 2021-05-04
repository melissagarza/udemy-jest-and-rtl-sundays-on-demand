import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import Row from 'react-bootstrap/Row';
import _ from 'lodash';

const Options = ({ optionType }) => {

  const [ items, setItems ] = useState([]);
  // TODO: replace null with ToppingOption when available
  const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`http://localhost:3030/${optionType}`);

        setItems(res.data);
      } catch (err) {
        // TODO: handle error response
      }
    };

    fetchItems();
  }, [ optionType ]);
  
  return (
    <Row>
      {!_.isEmpty(items) && items.map(item => (
        <ItemComponent
          key={item.name}
          name={item.name}
          imagePath={item.imagePath}
        />
      ))}
    </Row>
  );
};

export default Options;

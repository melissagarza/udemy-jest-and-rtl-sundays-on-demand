import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import Row from 'react-bootstrap/Row';
import AlertBanner from '../common/AlertBanner';
import _ from 'lodash';

const Options = ({ optionType }) => {

  const [ items, setItems ] = useState([]);
  const [ error, setError ] = useState(false);
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`http://localhost:3030/${optionType}`);

        setItems(res.data);
      } catch (err) {
        setError(true);
      }
    };

    fetchItems();
  }, [ optionType ]);
  
  return error ? (
    <AlertBanner />
  ) : (
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

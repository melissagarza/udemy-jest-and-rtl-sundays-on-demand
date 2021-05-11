import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import Row from 'react-bootstrap/Row';
import AlertBanner from '../common/AlertBanner';
import { pricePerItem } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetails';
import _ from 'lodash';

const Options = ({ optionType }) => {

  const [ items, setItems ] = useState([]);
  const [ error, setError ] = useState(false);
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  const [ orderDetails, updateItemCount ] = useOrderDetails();

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
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>{title} total: {orderDetails.totals[optionType]}</p>
      <Row>
        {!_.isEmpty(items) && items.map(item => (
          <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, optionType)}
          />
        ))}
      </Row>
    </>
  );
};

export default Options;

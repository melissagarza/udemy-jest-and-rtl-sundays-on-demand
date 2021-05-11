import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { pricePerItem } from '../constants';
import { formatCurrency } from '../utilities';

const OrderDetailsContext = createContext();

export const useOrderDetails = () => {
  const context = useContext(OrderDetailsContext);

  if (!context) throw new Error('useOrderDetails must be used within an OrderDetailsProvider');

  return context;
};

const calculateSubtotal = (optionType, optionCounts) => {
  let optionCount = 0;

  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
};

export const OrderDetailsProvider = props => {

  const [ optionCounts, setOptionCounts ] = useState({
    scoops: new Map(),
    toppings: new Map()
  });
  const zeroCurrency = formatCurrency(0);
  const [ totals, setTotals ] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency
  });

  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionCounts = { ...optionCounts };
      const optionCountMap = optionCounts[optionType];

      optionCountMap.set(itemName, parseInt(newItemCount));
      setOptionCounts(newOptionCounts);
    };
    
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [ optionCounts, totals ]);

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal)
    });
  }, [ optionCounts ]);

  return (
    <OrderDetailsContext.Provider value={value} {...props} />
  );
};

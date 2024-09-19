import { useEffect, useState } from 'react';

// Кастомный хук для подсчета суммы товаров в корзине
function useTotalSum(list) {
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const totalSum = list.reduce((acc, item) => acc + item.price * (item.count || 1), 0);
    setSum(totalSum);
  }, [list]);

  return sum;
}

export default useTotalSum;

import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Button } from './components/Button';
import { calculateTotalToPay, currencyFormat } from './helpers';

function App() {
  const [quantity, setQuantity] = useState(10000);
  const [months, setMonths] = useState(6);
  const [total, setTotal] = useState(0);
  const [pay, setPay] = useState(0);

  useEffect(() => {
    const resultTotalToPay = calculateTotalToPay(quantity, months);
    setTotal(resultTotalToPay);
  }, [quantity, months]);

  useEffect(() => {
    setPay(total / months);
  }, [months, total]);

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  function handleChange(e) {
    setQuantity(+e.target.value);
  }

  function handleClickDecrement() {
    if (quantity <= MIN) {
      return;
    }

    setQuantity((prev) => prev - STEP);
  }

  function handleClickIncrement() {
    if (quantity >= MAX) {
      return;
    }

    setQuantity((prev) => prev + STEP);
  }

  function handleSelectChange(e) {
    setMonths(+e.target.value);
  }

  return (
    <div className='my-20 max-w-lg mx-auto bg-white shadow p-10'>
      <Header />

      <div className='flex justify-between my-6'>
        <Button operator='-' fn={handleClickDecrement} />

        <Button operator='+' fn={handleClickIncrement} />
      </div>

      <input
        type='range'
        className='w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600'
        onChange={handleChange}
        min={MIN}
        max={MAX}
        step={STEP}
        value={quantity}
      />

      <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>
        {currencyFormat(quantity)}
      </p>

      <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
        Elige un <span className='text-indigo-600'>Plazo</span> a pagar
      </h2>

      <select
        className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500'
        value={months}
        onChange={handleSelectChange}
      >
        <option value='6'>6 Meses</option>
        <option value='12'>12 Meses</option>
        <option value='24'>24 Meses</option>
      </select>

      <div className='my-5 space-y-3 bg-gray-50 p-5'>
        <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
          Resumen <span className='text-indigo-600'>de pagos</span>
        </h2>

        <p className='text-xl text-gray-500 text-center font-bold'>
          {months} Meses
        </p>
        <p className='text-xl text-gray-500 text-center font-bold'>
          {currencyFormat(total)} Total a Pagar
        </p>
        <p className='text-xl text-gray-500 text-center font-bold'>
          {currencyFormat(pay)} Mensuales
        </p>
      </div>
    </div>
  );
}

export default App;

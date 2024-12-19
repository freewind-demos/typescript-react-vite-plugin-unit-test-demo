import React, { useEffect } from 'react';
import './Hello.pcss';

export default function Hello() {
  function testCalculation() {
    let sum = 0;
    for (let i = 0; i < 1000; i++) {
      sum += i;
    }
    return sum;
  }

  useEffect(() => {
    testCalculation();
  }, []);

  return <div className={'Hello'}>
    <h1>Hello React</h1>
    <button onClick={testCalculation}>Run Test Calculation</button>
  </div>;
}

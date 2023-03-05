import React, { useState } from 'react';
import axios from 'axios';

const Dryruns=()=> {
  const [cppCode, setCppCode] = useState('');
  const [input, setInput] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');
  const [testResult, setTestResult] = useState('');

  const runTest = () => {
    axios.post('/api/test', { cppCode, input, expectedOutput })
      .then(response => {
        if (response.data === 'Test passed') {
          setTestResult('Test passed');
        } else {
          setTestResult('Test failed');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      {/* <textarea value={cppCode} onChange={event => setCppCode(event.target.value)} /> */}
      <textarea value={input} onChange={event => setInput(event.target.value)} />
      {/* <textarea value={expectedOutput} onChange={event => setExpectedOutput(event.target.value)} /> */}
      <button onClick={runTest}>Run test</button>
      <p>{testResult}</p>
    </div>
  );
}

export default Dryruns;
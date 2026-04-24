import React, { useState } from 'react';
import { processHierarchy } from './utils/api';

const App = () => {
  const [input, setInput] = useState('{\n  "data": ["A->B", "B->C", "X->Y"]\n}');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProcess = async () => {
    setLoading(true);
    setError(null);
    try {
      let parsed;
      try {
        parsed = JSON.parse(input);
      } catch (err) {
        throw new Error('invalid json format');
      }

      if (!parsed.data || !Array.isArray(parsed.data)) {
        throw new Error('input must have a "data" array');
      }

      const result = await processHierarchy(parsed.data);
      setOutput(result);
    } catch (err) {
      setError(err.message);
      setOutput(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>hierarchy.processor</h1>
      </header>

      <div className="main-layout">
        {/* Input Box */}
        <div className="box">
          <div className="box-header">
            <span>input_json</span>
            <button 
              className="process-btn" 
              onClick={handleProcess}
              disabled={loading}
            >
              {loading ? 'processing...' : 'process'}
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{ "data": ["A->B"] }'
          />
          {error && <div className="error-msg">{error}</div>}
        </div>

        {/* Output Box */}
        <div className="box">
          <div className="box-header">
            <span>output_result</span>
          </div>
          <div className="output-container">
            {output ? (
              JSON.stringify(output, null, 2)
            ) : (
              <span style={{ color: '#8d6e63', opacity: 0.5 }}>
                results will appear here...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

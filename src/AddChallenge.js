import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file

const AddChallenge = () => {
  const [title, setTitle] = useState('Click to edit title');
  const [description, setDescription] = useState('Click to edit description');
  const [indexSettings, setIndexSettings] = useState('');
  const [idealRequest, setIdealRequest] = useState('');
  const [tests, setTests] = useState([]);
  const [activeTab, setActiveTab] = useState('indexSettings');

  const handleTestChange = (index, event) => {
    const newTests = tests.map((test, i) => {
      if (i !== index) return test;
      return { ...test, [event.target.name]: event.target.value };
    });
    setTests(newTests);
  };

  const addTest = () => {
    setTests([...tests, { test: '', hidden: false }]);
  };

  const deleteTest = (index) => {
    const newTests = tests.filter((_, i) => i !== index);
    setTests(newTests);
  };

  const toggleHideTest = (index) => {
    const newTests = tests.map((test, i) => {
      if (i !== index) return test;
      return { ...test, hidden: !test.hidden };
    });
    setTests(newTests);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      title,
      description,
      indexSettings: JSON.parse(indexSettings),
      idealRequest: JSON.parse(idealRequest),
      tests: tests.map(test => JSON.parse(test.test)),
    };

    axios.post('/api/challenges', data)
      .then(response => {
        console.log('Challenge added:', response.data);
        // Optionally reset form
      })
      .catch(error => {
        console.error('There was an error adding the challenge!', error);
      });
  };

  return (
    <div>
      <h1>Add New Challenge</h1>
      <div className="container">
        <div className="left">
          <div
            className="editable"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setTitle(e.target.innerText)}
          >
            {title}
          </div>
          <div
            className="editable"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setDescription(e.target.innerText)}
          >
            {description}
          </div>
          <div>
            <label>Tests:</label>
            {tests.map((test, index) => (
              <div key={index} className="test-item">
                {!test.hidden && (
                  <textarea
                    name="test"
                    value={test.test}
                    onChange={(event) => handleTestChange(index, event)}
                    required
                  />
                )}
                <button type="button" className="icon-button" onClick={() => toggleHideTest(index)}>
                  {test.hidden ? '👁️' : '🙈'}
                </button>
                <button type="button" className="icon-button" onClick={() => deleteTest(index)}>🗑️</button>
              </div>
            ))}
            <button type="button" className="icon-button" onClick={addTest}>➕</button>
          </div>
        </div>
        <div className="right">
          <div className="tabs">
            <div
              className={`tab ${activeTab === 'indexSettings' ? 'active' : ''}`}
              onClick={() => setActiveTab('indexSettings')}
            >
              Index Settings
            </div>
            <div
              className={`tab ${activeTab === 'idealRequest' ? 'active' : ''}`}
              onClick={() => setActiveTab('idealRequest')}
            >
              Ideal Request
            </div>
          </div>
          <div className="tab-content">
            {activeTab === 'indexSettings' && (
              <div>
                <label>Index Settings (JSON):</label>
                <textarea
                  value={indexSettings}
                  onChange={(e) => setIndexSettings(e.target.value)}
                  required
                />
              </div>
            )}
            {activeTab === 'idealRequest' && (
              <div>
                <label>Ideal Request (JSON):</label>
                <textarea
                  value={idealRequest}
                  onChange={(e) => setIdealRequest(e.target.value)}
                  required
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddChallenge;

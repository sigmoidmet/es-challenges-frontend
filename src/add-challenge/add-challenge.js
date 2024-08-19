import React, { useState } from 'react';
import TitleDescription from './title-description';
import Tests from './tests';
import Tabs from './tabs';
import MainLayout from '../main-layout';
import PlayButton from '../buttons/play-button.js';
import '../App.css'; // Use App.css instead of add-challenge.css

const AddChallenge = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [activeTab, setActiveTab] = useState('idealRequest'); // Default to Ideal Request
  const [indexSettings, setIndexSettings] = useState('{\n    \n}');
  const [idealRequest, setIdealRequest] = useState('{\n    \n}');
  const [tests, setTests] = useState([]);
  const [examples, setExamples] = useState([]); // New state for examples
  const [dividerPosition, setDividerPosition] = useState(50);

  const addTest = () => {
    const newTest = {
      id: tests.length,
      json: '[\n    {\n        \n    }\n]',
      hidden: false, // test is not hidden initially
    };

    setTests([...tests, newTest]);
  };

  const convertToExample = (id) => {
    setTests(tests.map(test =>
      test.id === id
      ? {
          ...test,
          isExample: true,
          expectedResult: '[\n    {\n        \n    }\n]',
          explanation: ''
        }
      : test
    ));
  };

  const updateTest = (id, json) => {
    setTests(tests.map(test => (test.id === id ? { ...test, json } : test)));
  };

  const updateExpectedResult = (id, expectedResult) => {
    setTests(tests.map(test => (test.id === id ? { ...test, expectedResult } : test)));
  };

  const updateExplanation = (id, explanation) => {
    setTests(tests.map(test => (test.id === id ? { ...test, explanation } : test)));
  };

  const removeTest = id => {
    setTests(tests.filter(test => test.id !== id));
  };

  const handleDrag = (e) => {
    const minWidth = 20; // Minimum width percentage for each panel
    const newPosition = Math.max(minWidth, Math.min(100 - minWidth, (e.clientX / window.innerWidth) * 100));
    setDividerPosition(newPosition);
  };

  const onSendButtonClick = () => {
    const data = {
      title: title,
      description: description,
      jsonIndexSettings: indexSettings,
      idealRequest: idealRequest,
      jsonChallengeTestArrays: tests.map(test => test.json),
      examples: examples.map(example => ({
        json: example.json,
        expectedResult: example.expectedResult,
        explanation: example.explanation,
      })),
    };

    fetch('http://localhost:8080/challenges', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const headerButtons = (
      <>
          <button onClick={onSendButtonClick}>
            <PlayButton />
          </button>
      </>
  );

  return (
    <MainLayout headerButtons={headerButtons}>
      <div className="panel" style={{ flex: dividerPosition }}>
        <TitleDescription title={title} setTitle={setTitle} description={description} setDescription={setDescription} />
        <Tests
          tests={tests}
          examples={examples}
          addTest={addTest}
          convertToExample={convertToExample}
          updateTest={updateTest}
          updateExpectedResult={updateExpectedResult}
          updateExplanation={updateExplanation}
          removeTest={removeTest}
        />
      </div>
      <div className="resizer" onMouseDown={(e) => {
        e.preventDefault();
        window.addEventListener('mousemove', handleDrag);
        window.addEventListener('mouseup', () => {
          window.removeEventListener('mousemove', handleDrag);
        }, { once: true });
      }} />
      <div className="panel" style={{ flex: 100 - dividerPosition }}>
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          indexSettings={indexSettings}
          setIndexSettings={setIndexSettings}
          idealRequest={idealRequest}
          setIdealRequest={setIdealRequest}
        />
      </div>
    </MainLayout>
  );
};

export default AddChallenge;

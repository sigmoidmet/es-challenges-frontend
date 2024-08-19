import React, { useState } from 'react';
import JsonEditor from './json-editor';

const Tests = ({ tests, addTest, convertToExample, updateTest, updateExpectedResult, updateExplanation, hideTest, removeTest }) => {
    return (
        <div className="tests-container">
            <div className="test-header">
                <h2>Tests</h2>
                <span className="add-icon" onClick={addTest}>➕</span>
            </div>
            {tests.map(test => (
                <div key={test.id} className="test-entry">
                    <div className="test-box">
                        <TestTabs
                            test={test}
                            updateTest={updateTest}
                            updateExpectedResult={updateExpectedResult}
                            updateExplanation={updateExplanation}
                        />
                    </div>
                    <div className="test-icons">
                        <span className="icon remove-icon" onClick={() => removeTest(test.id)}>❌</span>
                        <span className="icon hide-icon" onClick={() => hideTest(test.id)}>{test.hidden ? '👁️' : '👁️'}</span>
                        {!test.isExample && (
                            <span className="icon example-icon" onClick={() => convertToExample(test.id)}>⭐</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

const TestTabs = ({ test, updateTest, updateExpectedResult, updateExplanation }) => {
    const [activeTab, setActiveTab] = useState('test'); // Default to 'test' tab

    return (
        <div className="test-tabs">
            <div className="tab-buttons">
                <button className={activeTab === 'test' ? 'active' : ''} onClick={() => setActiveTab('test')}>Test</button>
                {test.isExample && (
                    <>
                        <button className={activeTab === 'expectedResult' ? 'active' : ''} onClick={() => setActiveTab('expectedResult')}>Expected Result</button>
                        <button className={activeTab === 'explanation' ? 'active' : ''} onClick={() => setActiveTab('explanation')}>Explanation</button>
                    </>
                )}
            </div>
            <div className="tab-content">
                {activeTab === 'test' && (
                    <JsonEditor value={test.json} onChange={(value) => updateTest(test.id, value)} />
                )}
                {test.isExample && activeTab === 'expectedResult' && (
                    <JsonEditor value={test.expectedResult} onChange={(value) => updateExpectedResult(test.id, value)} />
                )}
                {test.isExample && activeTab === 'explanation' && (
                    <textarea
                        value={test.explanation || ''}
                        onChange={(e) => updateExplanation(test.id, e.target.value)}
                        placeholder="Enter explanation here..."
                    />
                )}
            </div>
        </div>
    );
}

export default Tests;

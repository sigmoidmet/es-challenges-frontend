import React from 'react';
import JsonEditor from './json-editor';

const Tabs = ({ activeTab, setActiveTab, indexSettings, setIndexSettings, idealRequest, setIdealRequest }) => {
  return (
    <div className="tabs-container">
      <div className="tabs">
        <div className={`tab ${activeTab === 'indexSettings' ? 'active' : ''}`} onClick={() => setActiveTab('indexSettings')}>Index Settings</div>
        <div className={`tab ${activeTab === 'idealRequest' ? 'active' : ''}`} onClick={() => setActiveTab('idealRequest')}>Ideal Request</div>
      </div>
      <div className="tab-content">
        {activeTab === 'indexSettings' && (
          <JsonEditor
            value={indexSettings}
            onChange={setIndexSettings}
          />
        )}
        {activeTab === 'idealRequest' && (
          <JsonEditor
            value={idealRequest}
            onChange={setIdealRequest}
          />
        )}
      </div>
    </div>
  );
};

export default Tabs;

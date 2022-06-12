import { useState } from 'react';
import TabTable from './TabTable/TabTable';
import TabChart from './TabChart/TabChart';
import './tabs.css';

const tabs = [
  { id: 'table', name: 'Таблица' },
  { id: 'chart', name: 'График'},
  { id: 'tab3', name: 'Таб 3'},
  { id: 'tab4', name: 'Таб 4'},
  { id: 'tabN', name: 'Таб N'},
];

function showTabsContent(tabID) {
  const tabsContent = {
    table: <TabTable />,
    chart: <TabChart />,
  }
  return tabsContent[tabID];
}

export default function Tabs() {
  const [curTabID, setCurTabID] = useState(tabs[0].id);

  const setActiveTab = (tabID) => {
    if (tabID === curTabID) return ' tabs__btn_active';
    return '';
  };

  const handleOnTabClick = (tabID) => setCurTabID(tabID);

  return (
    <div className='tabs'>
      <ul className='tabs__list'>
        {
          tabs.map((tab) =>
            <li key={tab.id}>
              <button 
                className={`tabs__btn${setActiveTab(tab.id)}`}
                onClick={() => handleOnTabClick(tab.id)}
                >
                {tab.name}
              </button>
          </li>)
        }
      </ul>

      <div className='tab'>
        { showTabsContent(curTabID) }
      </div>
    </div>
  );
}

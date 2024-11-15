import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Info, Search, Download, Filter } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Detailed tooltips data
const tooltips = {
  'TCe license for PLMXML export': 'Required for exporting PLMXML files from TeamCenter Engineering. Must be active and properly configured.',
  'Vismockup license': 'License for visualization and mockup creation software. Essential for digital buck visualization.',
  'Daily build by 07:00 hrs': 'Automated build process must complete by 7 AM daily to ensure timely availability for all teams.',
  'CAD and OneBom aligned': 'CAD models must perfectly match OneBom specifications to ensure accurate digital representation.',
  '150% virtual representation': 'Includes all possible vehicle variants and configurations (RHD/LHD, engine specs, trim levels, etc.)',
  '.PLMXML extract': 'XML-based file containing complete product structure and metadata for digital buck creation.',
};

const Tooltip = ({ content }) => (
  <div className="absolute z-10 bg-gray-900 text-white p-2 rounded shadow-lg text-sm max-w-xs">
    {content}
  </div>
);

const SIPOCSection = ({ title, items, color, searchTerm, filter }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Filter items based on search term and selected filter
  const filteredItems = items.filter(item => {
    const matchesSearch = item.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filter || item.toLowerCase().includes(filter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const getInfoContent = (title) => {
    const infoContent = {
      'WHAT': 'Prerequisites and licenses needed for Digital Buck Creation',
      'WHO': 'Key personnel and timing requirements',
      'KEY INPUTS': 'Required alignments and validations before process initiation',
      'PROCESS': 'Core steps in Digital Buck Creation',
      'KEY OUTPUTS': 'Deliverables and results',
      'CRITERIA': 'Essential requirements and standards'
    };
    return infoContent[title];
  };

  return (
    <div className={`rounded-lg shadow-lg m-2 ${color}`}>
      <div 
        className="p-4 cursor-pointer flex items-center justify-between hover:bg-opacity-80 transition-all"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          {isExpanded ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
          <h2 className="text-lg font-bold">{title}</h2>
        </div>
        <Info 
          className="cursor-pointer hover:text-blue-600"
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo(!showInfo);
          }}
        />
      </div>
      
      {showInfo && (
        <Alert className="m-2 bg-blue-50">
          <AlertTitle>About {title}</AlertTitle>
          <AlertDescription>{getInfoContent(title)}</AlertDescription>
        </Alert>
      )}

      {isExpanded && (
        <div className="p-4 pt-0">
          <ul className="list-disc ml-6">
            {filteredItems.map((item, index) => (
              <li
                key={index}
                className="py-1 hover:bg-opacity-50 rounded px-2 relative"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item}
                {hoveredItem === item && tooltips[item] && (
                  <Tooltip content={tooltips[item]} />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const InteractiveSIPOC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  const sections = {
    'WHAT': {
      items: [
        'TCe license for PLMXML export',
        'Vismockup license',
        'Access to Program',
        'Correct Role within TCe',
        'Link to TCe License Data'
      ],
      color: 'bg-blue-100'
    },
    'WHO': {
      items: [
        'IT Admin - Pradeep Gadhave',
        'VinFast IT for daily .PLMXML extract',
        'Daily build by 07:00 hrs'
      ],
      color: 'bg-green-100'
    },
    'KEY INPUTS': {
      items: [
        'CAD and OneBom aligned',
        'CAD aligned to programme assumptions',
        'VinFast Working Rule - Latest Working Revision',
        'OneBoM validation report',
        'Engineer save working revision to TCe',
        'Revision Control Gates: Design Freeze & Release for Production'
      ],
      color: 'bg-yellow-100'
    },
    'PROCESS': {
      items: [
        'TCe Data Export',
        'PLMXML Generation',
        'Variant Configuration Processing:',
        '  - RHD/LHD',
        '  - Engine Specifications',
        '  - Trim Levels'
      ],
      color: 'bg-purple-100'
    },
    'KEY OUTPUTS': {
      items: [
        '.PLMXML extract - Digibuck file',
        'Attribute assessments (Mass, HMI, NVH, Aero, Thermal, PED, homologation, service)',
        'Virtual Build event'
      ],
      color: 'bg-indigo-100'
    },
    'CRITERIA': {
      items: [
        'Ensure 150% virtual representation covering all variants/configurations',
        'Daily build completion by 07:00',
        'Complete attribute assessment validation'
      ],
      color: 'bg-red-100'
    }
  };

  const exportToJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sections));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "digital_buck_sipoc.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const predefinedFilters = [
    'License',
    'CAD',
    'PLMXML',
    'Validation',
    'Build'
  ];

  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Digital Buck Creation SIPOC</h1>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search items..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {predefinedFilters.map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => toggleFilter(filterOption)}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeFilters.includes(filterOption)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>

          <button
            onClick={exportToJSON}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(sections).map(([title, { items, color }]) => (
          <SIPOCSection 
            key={title} 
            title={title} 
            items={items} 
            color={color}
            searchTerm={searchTerm}
            filter={activeFilters.length > 0 ? activeFilters.join('|') : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveSIPOC;
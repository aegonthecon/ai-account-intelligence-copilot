import React from 'react';
import ExportButtons from './ExportButtons.jsx';

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-2 text-primary">{title}</h2>
    <div className="bg-gray-700 bg-opacity-50 rounded p-4 glass">
      {children}
    </div>
  </div>
);

const Badge = ({ score, classification }) => {
  const colors = {
    High: 'bg-green-600',
    Medium: 'bg-yellow-500',
    Low: 'bg-red-600',
  };
  return (
    <span className={`inline-block px-3 py-1 rounded ${colors[classification]} text-white font-medium`}>ICP {classification} ({score})</span>
  );
};

const OutputTabs = ({ data }) => {
  const [active, setActive] = React.useState('overview');
  const tabs = [
    { id: 'overview', label: 'Company Overview' },
    { id: 'pain', label: 'Pain Points' },
    { id: 'solution', label: 'Solution Mapping' },
    { id: 'email', label: 'Outreach Email' },
    { id: 'linkedin', label: 'LinkedIn Message' },
    { id: 'meeting', label: 'Meeting Prep' },
    { id: 'next', label: 'Next Action' },
    { id: 'icp', label: 'ICP Score' },
    { id: 'sources', label: 'Sources' },
  ];

  const renderContent = () => {
    switch (active) {
      case 'overview':
        return <Section title="Company Overview"><pre className="whitespace-pre-wrap">{JSON.stringify(data.companyOverview, null, 2)}</pre></Section>;
      case 'pain':
        return <Section title="Pain Points"><pre className="whitespace-pre-wrap">{JSON.stringify(data.painPoints, null, 2)}</pre></Section>;
      case 'solution':
        return <Section title="Solution Mapping"><pre className="whitespace-pre-wrap">{JSON.stringify(data.solutionMapping, null, 2)}</pre></Section>;
      case 'email':
        return <Section title="Outreach Email"><pre className="whitespace-pre-wrap">{data.outreachEmail}</pre></Section>;
      case 'linkedin':
        return <Section title="LinkedIn Message"><pre className="whitespace-pre-wrap">{data.linkedInMessage}</pre></Section>;
      case 'meeting':
        return <Section title="Meeting Preparation"><pre className="whitespace-pre-wrap">{JSON.stringify(data.meetingPrep, null, 2)}</pre></Section>;
      case 'next':
        return <Section title="Next Action"><pre className="whitespace-pre-wrap">{JSON.stringify(data.nextAction, null, 2)}</pre></Section>;
      case 'icp':
        return (
          <Section title="ICP Score">
            <Badge score={data.icpScore?.score ?? 0} classification={data.icpScore?.classification ?? 'Low'} />
            <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(data.icpScore, null, 2)}</pre>
          </Section>
        );
      case 'sources':
        return <Section title="Sources"><pre className="whitespace-pre-wrap">{JSON.stringify(data.sources, null, 2)}</pre></Section>;
      default:
        return null;
    }
  };

  return (
    <div>
      <ExportButtons data={data} />
      <div className="flex border-b border-gray-600 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm focus:outline-none ${active === tab.id ? 'text-primary border-b-2 border-primary' : 'text-gray-300'}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="h-full overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default OutputTabs;

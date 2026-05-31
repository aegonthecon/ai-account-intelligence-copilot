import React from 'react';

const ExportButtons = ({ data }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      alert('Account brief copied to clipboard');
    } catch (e) {
      console.error(e);
      alert('Failed to copy');
    }
  };

  const handlePDF = () => {
    const { jsPDF } = require('jspdf');
    const doc = new jsPDF();
    const title = 'AI Account Intelligence Brief';
    doc.setFontSize(16);
    doc.text(title, 10, 10);
    doc.setFontSize(12);
    const sections = [
      { heading: 'Company Overview', content: JSON.stringify(data.companyOverview, null, 2) },
      { heading: 'Pain Points', content: JSON.stringify(data.painPoints, null, 2) },
      { heading: 'Solution Mapping', content: JSON.stringify(data.solutionMapping, null, 2) },
      { heading: 'Outreach Email', content: data.outreachEmail },
      { heading: 'LinkedIn Message', content: data.linkedInMessage },
      { heading: 'Meeting Prep', content: JSON.stringify(data.meetingPrep, null, 2) },
      { heading: 'Next Action', content: JSON.stringify(data.nextAction, null, 2) },
      { heading: 'ICP Score', content: JSON.stringify(data.icpScore, null, 2) },
      { heading: 'Sources', content: JSON.stringify(data.sources, null, 2) },
    ];
    let y = 20;
    sections.forEach((sec) => {
      doc.setFont(undefined, 'bold');
      doc.text(sec.heading, 10, y);
      y += 6;
      doc.setFont(undefined, 'normal');
      const lines = doc.splitTextToSize(sec.content, 180);
      doc.text(lines, 10, y);
      y += lines.length * 6 + 4;
      if (y > 270) { // new page
        doc.addPage();
        y = 20;
      }
    });
    doc.save('account_brief.pdf');
  };

  return (
    <div className="flex gap-4 mb-4">
      <button onClick={handleCopy} className="px-4 py-2 bg-primary text-black rounded hover:bg-primary/80 transition">
        Copy to Clipboard
      </button>
      <button onClick={handlePDF} className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/80 transition">
        Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;

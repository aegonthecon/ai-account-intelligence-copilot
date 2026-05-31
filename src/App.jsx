import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function App() {
  const [company, setCompany] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!company) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company }),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setReport(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!report) return;
    await navigator.clipboard.writeText(JSON.stringify(report, null, 2));
    alert('Report copied to clipboard');
  };

  const exportPDF = () => {
    if (!report) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Account Intelligence Report – ${company}`, 10, 20);
    doc.setFontSize(12);
    const sections = [
      { title: 'Company Overview', content: report.companyOverview },
      { title: 'Pain Points', content: report.painPoints?.join('\n') },
      { title: 'Solution Mapping', content: report.solutionMapping?.join('\n') },
      { title: 'Outreach Email', content: report.outreachEmail },
      { title: 'LinkedIn Message', content: report.linkedInMessage },
      { title: 'Meeting Preparation Brief', content: report.meetingPreparationBrief },
      { title: 'Recommended Next Action', content: report.recommendedNextAction },
      { title: 'ICP Fit Score', content: `${report.icpFitScore} (${report.icpFitReasoning?.priorityClassification})` },
      { title: 'ICP Reasoning', content: `Positive: ${report.icpFitReasoning?.positiveIndicators?.join(', ')}\nRisks: ${report.icpFitReasoning?.riskFactors?.join(', ')}` },
      { title: 'Sources', content: report.sources?.join('\n') },
    ];
    let y = 30;
    sections.forEach((sec) => {
      doc.setFont(undefined, 'bold');
      doc.text(sec.title, 10, y);
      y += 6;
      doc.setFont(undefined, 'normal');
      const split = doc.splitTextToSize(sec.content || '', 180);
      doc.text(split, 10, y);
      y += split.length * 6 + 4;
      if (y > 260) { doc.addPage(); y = 20; }
    });
    doc.save(`${company}_report.pdf`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-glass backdrop-opacity-70 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">AI Account Intelligence & Outreach Copilot</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>
      {error && <p className="text-red-500">Error: {error}</p>}
      {report && (
        <div className="space-y-4">
          {report.fallback && (
            <p className="bg-yellow-200 text-yellow-900 p-2 rounded">Live AI unavailable. Showing demo data.</p>
          )}
          <pre className="bg-gray-800 p-2 rounded overflow-x-auto text-sm whitespace-pre-wrap">
            {JSON.stringify(report, null, 2)}
          </pre>
          <div className="flex gap-2">
            <button onClick={copyToClipboard} className="px-3 py-1 bg-secondary text-white rounded hover:bg-secondary/80 transition">
              Copy JSON
            </button>
            <button onClick={exportPDF} className="px-3 py-1 bg-accent text-white rounded hover:bg-accent/80 transition">
              Export PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

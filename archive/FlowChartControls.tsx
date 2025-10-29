import { useAnimation } from '../context';
import { LanguageModelSelection } from './LanguageModelSelection';

export const FlowChartControls = () => {

  const {
    description, setDescription, nodeDescription, setNodeDescription, languageModel, setLanguageModel, tableOfContents, setTableOfContents, setSummary,
  } = useAnimation();

  const generateTableOfContents = async (description: string) => {
    const result = await fetch('http://localhost:3009/generate-table-of-contents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: description,
        languageModel,
      }),
    });
    const data = (await result.json()).data;
    setTableOfContents(data.tableOfContents);
  };

  const generateSummary = async () => {
    const result = await fetch('http://localhost:3009/generate-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: tableOfContents,
        languageModel,
      }),
    });
    const data = (await result.json()).data;
    setSummary(data);
  };



  return (
    <div className="flow-chart-controls">
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="text" placeholder="Node Description" value={nodeDescription} onChange={(e) => setNodeDescription(e.target.value)} />
      <LanguageModelSelection />
      <button onClick={() => generateTableOfContents(description)}>Generate Table of Contents</button>
      <button onClick={() => generateSummary()}>Generate Summary</button>
    </div>
  );
};

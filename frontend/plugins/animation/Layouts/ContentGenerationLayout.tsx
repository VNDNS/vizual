import { useAnimation } from '../context';
import { useSetCurrentPlugin } from '../../common/hooks/useSetCurrentPlugin';
import { FlowChartControls } from '../components/arrangement/FlowChartControls';

export const ContentGenerationLayout = () => {
  const {
    tableOfContents,
    summary,
    sections,
    setSections,
    sectionIndex,
    setSectionIndex,
    languageModel
  } = useAnimation();
  
  useSetCurrentPlugin('content-generation');
  
  const currentItem = tableOfContents?.[sectionIndex] as any;
  const i0 = currentItem?.section ?? '';
  const i1 = currentItem?.subSection ?? '';
  const i2 = currentItem?.subSubSection ?? '';

  const generateSection = async (sectionIndex: number) => {
    const result = await fetch('http://localhost:3009/generate-section', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tableOfContents,
        sectionIndex,
        summary,
        languageModel,
      }),
    })
    const data = (await result.json()).data
    setSections(sections.map((section, index) => index === sectionIndex ? data : section))
  }

  return (
    <div className="animation plugin">
      <div className="configuration">
      <FlowChartControls />
      </div>
      <div className="main flow-chart-generation">
        <div className="table-of-contents-container">
          {tableOfContents.length > 0 && (
          <div className="table-of-contents">
            {tableOfContents?.map((item: any, index: number) => {
              const level = item?.subSubSection > 0 ? 3 : item?.subSection > 0 ? 2 : 1;
              const number = `${item.section}.${item.subSection}.${item.subSubSection}`;
              const filled = !!sections[index]?.trim();
              return (
                <div  className={`toc-item level-${level} ${filled ? 'filled' : ''}`} key={number} onClick={() => {
                  setSectionIndex(index)
                }}>
                  <span className="toc-number">{number}</span>
                  <span className="toc-title">{item.title}</span>
                  <button onClick={() => {
                    setSectionIndex(index)
                    generateSection(index)
                  }}>Generate Section</button>
                </div>
              )
            })}
          </div>
          )}  
          <div className="section">
            <h2>{i0}.{i1}.{i2} - {currentItem?.title ?? ''}</h2>
            <p>{sections[sectionIndex]}</p>
          </div>
        </div>
        {summary && (
          <div className="summary">
            <h2>Summary</h2>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

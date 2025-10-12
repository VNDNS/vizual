import { useAnimation } from '../context';


export const LanguageModelSelection = () => {
  const { languageModel, setLanguageModel } = useAnimation();
  return (
    <select className="language-model-selection" value={languageModel} onChange={(e) => setLanguageModel(e.target.value)}>
      <option value="gpt-5">GPT-5</option>
      <option value="gpt-5-mini">GPT-5 Mini</option>
      <option value="gpt-5-nano">GPT-5 Nano</option>
    </select>
  );
};

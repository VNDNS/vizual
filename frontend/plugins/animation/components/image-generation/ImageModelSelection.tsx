import { useAnimation } from '../context';

export const ImageModelSelection = () => {
  const { imageModel, setImageModel } = useAnimation();
  return (
    <select className="image-model-selection" value={imageModel} onChange={(e) => setImageModel(e.target.value)}>
      <option value="gpt-5">GPT-5</option>
      <option value="gpt-5-mini">GPT-5 Mini</option>
      <option value="gpt-5-nano">GPT-5 Nano</option>
    </select>
  );
};

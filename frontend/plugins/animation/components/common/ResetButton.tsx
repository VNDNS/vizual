import { useAnimation } from '../../context';

export const ResetButton = () => {
  const { resetState } = useAnimation();

  return (
    <button className="reset-button" onClick={resetState}> reset </button>
  );
};

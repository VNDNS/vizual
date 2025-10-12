import { ExportToCurrentDataButton } from '../../common/components/ExportToCurrentDataButton';
import { useSetCurrentPlugin } from '../../common/hooks/useSetCurrentPlugin';
import { MethodConfiguration } from '../components/animation/MethodConfiguration';
import { MethodSelection } from '../components/animation/MethodSelection';
import { TimelineList } from '../components/animation/TimelineList';
import { ResetButton } from '../components/common/ResetButton';
import { ComponentSelection } from '../components/animation/ComponentSelection';
import { Components } from '../components/common/Components';
import { useAnimation } from '@context/context';

export const AnimationLayout = () => {

  useSetCurrentPlugin('animation');

  const { selectedMethod } = useAnimation()

  return (
    <div className="animation plugin">
      <div className="configuration">
        <ResetButton />
        <ComponentSelection />
        <Components />
        <ExportToCurrentDataButton />
      </div>
      <div className="main">
        <div className="animation-controls">
          <TimelineList />
          <div className="method-controls">
            <MethodSelection />
            {selectedMethod && <MethodConfiguration />}
          </div>
        </div>
      </div>
    </div>
  );
};

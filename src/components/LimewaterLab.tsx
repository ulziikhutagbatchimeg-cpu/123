import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LabFrame, type LabNext } from './LabFrame';

// The teacher's limewater lab (public/labs/limewater-test.html), shown whole in a frame: heat a carbonate (CuCO₃, ZnCO₃,
// NaHCO₃, CaCO₃ or Na₂CO₃) in a boiling tube and bubble the gas through limewater; it turns milky with carbon dioxide, and
// lifting the delivery tube out before the burner goes off prevents suck-back. It opens in the lesson's language, and the frame
// takes the lab's own height (it stacks into one column on a narrow screen). Under it the student submits the lab for a score
// (LabFrame); in a lesson, "Next step" then moves the lesson on.
export const LimewaterLab: React.FC<{ height?: string } & LabNext> = ({ height = 'h-[1500px]', onDone, nextHint }) => {
  const { mode } = useLanguage();
  const mn = mode === 'mn';
  const hash = mn ? 'mn' : 'en';
  return (
    <div className="space-y-2">
      <div className="text-xs font-black text-slate-700">
        {mn ? 'Симуляци: хатуу бодисыг халааж, хийг шохойн усаар таних' : 'Simulation: heating a solid and testing the gas with limewater'}
      </div>
      <LabFrame
        frameKey={hash}
        src={`labs/limewater-test.html#${hash}`}
        title={{ mn: 'Шохойн усны тест', en: 'The limewater test' }}
        height={height}
        check="limewater"
        fit
        mn={mn}
        onDone={onDone}
        nextHint={nextHint}
      />
    </div>
  );
};

// A lesson widget that opens the limewater lab
export const limewaterWidget: React.FC<LabNext> = props => <LimewaterLab {...props} />;
limewaterWidget.displayName = 'LimewaterLab';

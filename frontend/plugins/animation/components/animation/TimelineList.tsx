import { Timeline } from "./Timeline"
import { useAnimation } from "../../context"

export const TimelineList = () => {
  const { numTimelines, setNumTimelines } = useAnimation()

  const handleNumTimelinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(e.target.value) || 1;
    setNumTimelines(newCount);
  }

  return (
    <div className="timeline-list-container">
      <div className="timeline-controls">
        {/* <div className="timeline-settings">
          <input 
            id="numTimelines" 
            type="number" 
            min="1" 
            value={numTimelines} 
            onChange={handleNumTimelinesChange} 
          />
        </div> */}
      </div>
      <div className="timeline-list">
        <Timeline />
      </div>
      
    </div>
  )
} 
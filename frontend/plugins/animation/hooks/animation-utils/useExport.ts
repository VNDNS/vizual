import { saveJson } from "../../../common/requests/save-json"
import { useAnimation } from "../../context"

export const useExport = () => {
  const { currentDataFile, currentData } = useAnimation()

  const exportToCurrentData = () => {
    const fullPath = 'server/data/' + 'flowChart' + '/' + currentDataFile
    saveJson(currentData, fullPath);
  };

  return { exportToCurrentData }
}


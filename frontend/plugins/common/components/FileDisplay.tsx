import { useDirectory } from "../hooks/useDirectory"

// allows to select a file from a directory and assign the file-name to some state.
// for the directoryKey a route needs to be implemented in the get-directory.ts endpoint.

export const FileDisplay = ({ directoryKey, state, setState }: { directoryKey: string, state: string | null, setState: (state: string) => void }) => {

  // hooks
  const { files } = useDirectory(directoryKey)

  return (
    <>
      <div className="file-display">
        <select className="file-display-select" value={state || ''} onChange={(e) => setState(e.currentTarget.value)}>
          <option value="" disabled>Select a file</option>
          {files.map((file, index) => (
            <option key={index} value={file}>{file}</option>
          ))}
        </select>
      </div>
    </>
  )
}
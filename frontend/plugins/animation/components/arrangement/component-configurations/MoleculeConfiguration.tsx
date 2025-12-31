import { ComponentAnimation } from "../../animation/ComponentAnimation"

export const MoleculeConfiguration = () => {
  return (
    <div className="molecule-configuration">
      <div className="animations">
        <ComponentAnimation label="fadeIn" type="molecule" method="fadeIn" />
        <ComponentAnimation label="fadeOut" type="molecule" method="fadeOut" />
      </div>
    </div>
  )
}


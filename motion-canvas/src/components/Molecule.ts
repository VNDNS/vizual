import { Node, Rect } from "@motion-canvas/2d"
import { AnimationClip } from "./types/AnimationClip"
import { MoleculeProps } from "./types/MoleculeProps"

export class Molecule extends Node {

  private moleculeRect: Rect

  public constructor(props: MoleculeProps) {
    super({...props})
    this.initializeMolecule()
  }

  private initializeMolecule() {
    this.moleculeRect = new Rect({
      width: 200,
      height: 100,
      fill: 'red',
      opacity: 0
    })
    this.add(this.moleculeRect)
  }

  public fadeIn(duration: number): AnimationClip {
    return {
      animation: this.moleculeRect.opacity(1, duration),
      duration: duration
    }
  }

  public fadeOut(duration: number): AnimationClip {
    return {
      animation: this.moleculeRect.opacity(0, duration),
      duration: duration
    }
  }
}


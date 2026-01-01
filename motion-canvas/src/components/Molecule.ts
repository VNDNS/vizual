import { Node, Circle, Line } from "@motion-canvas/2d"
import { AnimationClip } from "./types/AnimationClip"
import { MoleculeProps } from "./types/MoleculeProps"
import { all } from "./functions/all";

const elementColors: Record<number, string> = {
  1: '#ffffff', // H
  6: '#333333', // C
  7: '#3050f8', // N
  8: '#ff0d0d', // O
  9: '#90e050', // F
  15: '#ff8000', // P
  16: '#ffff30', // S
  17: '#1ff01f', // Cl
};

export class Molecule extends Node {

  private atoms: Circle[] = []
  private bonds: Line[] = []
  private data: any

  public constructor(props: MoleculeProps) {
    super({...props, opacity: 0})
    this.data = props.data
    this.initializeMolecule()
  }

  private initializeMolecule() {
    const data = this.data.PC_Compounds?.[0]
    if (!data) {
      console.error('No data found for molecule')
      return;
    }

    const atomMap = new Map<number, { x: number, y: number, element: number }>()
    const coords = data.coords[0].conformers[0]
    const aids = data.coords[0].aid

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
    
    aids.forEach((aid: number, i: number) => {
      const x = coords.x[i]
      const y = -coords.y[i] // Invert Y for screen coordinates
      const element = data.atoms.element[data.atoms.aid.indexOf(aid)]
      atomMap.set(aid, { x, y, element })
      
      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x)
      minY = Math.min(minY, y)
      maxY = Math.max(maxY, y)
    })

    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2
    const scale = 120

    // Initialize Bonds
    if (data.bonds) {
      data.bonds.aid1.forEach((aid1: number, i: number) => {
        const aid2 = data.bonds!.aid2[i]
        const atom1 = atomMap.get(aid1)
        const atom2 = atomMap.get(aid2)

        if (atom1 && atom2) {
          const line = new Line({
            points: [
              { x: (atom1.x - centerX) * scale, y: (atom1.y - centerY) * scale },
              { x: (atom2.x - centerX) * scale, y: (atom2.y - centerY) * scale },
            ],
            stroke: '#888888',
            lineWidth: 8,
            lineCap: 'round',
            opacity: 1,
            zIndex: -1,
          })
          this.add(line)
          this.bonds.push(line)
        }
      })
    }

    // Initialize Atoms
    atomMap.forEach((atom, aid) => {
      const circle = new Circle({
        x: (atom.x - centerX) * scale,
        y: (atom.y - centerY) * scale,
        width: atom.element === 1 ? 40 : 80,
        height: atom.element === 1 ? 40 : 80,
        fill: elementColors[atom.element] || '#888888',
        stroke: '#333333',
        lineWidth: 4,
        opacity: 1,
      })
      this.add(circle)
      this.atoms.push(circle)
    })
  }

  public fadeIn(duration: number): AnimationClip {
    return {
      animation: this.opacity(1, duration),
      duration: duration
    }
  }

  public fadeOut(duration: number): AnimationClip {
    return {
      animation: this.opacity(0, duration),
      duration: duration
    }
  }
}


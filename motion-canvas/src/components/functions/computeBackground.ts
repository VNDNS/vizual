import { convexHull } from "./convexHull"
import { hullify } from "./hullify"
import { offsetPoints } from "./offsetPoints"
import { pixelate } from "./pixelate"
import { Point } from "./Point"

export const computeBackground = (points: Point[]) => {

  const convexHullPoints     = convexHull(points)
  const offsetedPoints       = offsetPoints(convexHullPoints, 600)
  //const pixelatedPoints      = pixelate(offsetedPoints, 60)
  //const nextBackgroundPoints = hullify(pixelatedPoints)

  return offsetedPoints
}
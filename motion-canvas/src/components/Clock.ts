import { Circle, Line, Node, Txt } from "@motion-canvas/2d"
import { all, sequence } from "@motion-canvas/core"
import { ClockProps } from "./types/ClockProps"

export class Clock extends Node {

  private config: ClockProps['data']
  private clockFace: Circle
  private hourHand: Line
  private minuteHand: Line
  private secondHand: Line
  private centerDot: Circle
  private hourMarkers: Line[] = []
  private hourDigits: Txt[] = []

  public constructor(props: ClockProps) {
    super({...props, key: props.data.name})

    this.config = props.data

    this.initializeClockFace()
    this.initializeHourMarkers()
    this.initializeHourDigits()
    this.initializeHands()
    this.initializeCenterDot()
  }

  private initializeClockFace() {
    const radius = 200

    this.clockFace = new Circle({
      size: radius * 2,
      stroke: 'white',
      lineWidth: 4,
      opacity: 0,
    })
    this.add(this.clockFace)
  }

  private initializeHourMarkers() {
    const radius = 200
    const markerLength = 15

    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180)
      const startX = Math.cos(angle) * (radius - markerLength)
      const startY = Math.sin(angle) * (radius - markerLength)
      const endX = Math.cos(angle) * radius
      const endY = Math.sin(angle) * radius

      const marker = new Line({
        points: [
          [startX, startY],
          [endX, endY]
        ],
        stroke: 'white',
        lineWidth: 3,
        opacity: 0,
      })

      this.clockFace.add(marker)
      this.hourMarkers.push(marker)
    }
  }

  private initializeHourDigits() {
    const radius = 200
    const digitRadius = radius - 40

    for (let i = 0; i < 12; i++) {
      const hour = i === 0 ? 12 : i
      const angle = (i * 30 - 90) * (Math.PI / 180)
      const x = Math.cos(angle) * digitRadius
      const y = Math.sin(angle) * digitRadius

      const digit = new Txt({
        text: hour.toString(),
        x,
        y,
        fontSize: 32,
        fill: 'white',
        fontFamily: 'Rubik',
        fontWeight: 500,
        opacity: 0,
      })

      this.clockFace.add(digit)
      this.hourDigits.push(digit)
    }
  }

  private initializeHands() {
    const hourHandLength = 100
    const minuteHandLength = 140
    const secondHandLength = 160

    this.hourHand = new Line({
      points: [
        [0, 0],
        [0, -hourHandLength]
      ],
      stroke: 'white',
      lineWidth: 8,
      lineCap: 'round',
      opacity: 0,
    })

    this.minuteHand = new Line({
      points: [
        [0, 0],
        [0, -minuteHandLength]
      ],
      stroke: '#555555',
      lineWidth: 5,
      lineCap: 'round',
      opacity: 0,
    })

    this.secondHand = new Line({
      points: [
        [0, 0],
        [0, -secondHandLength]
      ],
      stroke: '#e74c3c',
      lineWidth: 2,
      lineCap: 'round',
      opacity: 0,
    })

    this.clockFace.add(this.hourHand)
    this.clockFace.add(this.minuteHand)
    this.clockFace.add(this.secondHand)
  }

  private initializeCenterDot() {
    this.centerDot = new Circle({
      size: 16,
      fill: 'white',
      opacity: 0,
    })
    this.clockFace.add(this.centerDot)
  }

  public *fadeIn(duration: number) {
    const markerFadeIns = []
    for (let i = 0; i < this.hourMarkers.length; i++) {
      markerFadeIns.push(this.hourMarkers[i].opacity(1, duration))
    }

    const digitFadeIns = []
    for (let i = 0; i < this.hourDigits.length; i++) {
      digitFadeIns.push(this.hourDigits[i].opacity(1, duration))
    }

    yield* all(
      this.clockFace.opacity(1, duration),
      ...markerFadeIns,
      ...digitFadeIns,
      this.hourHand.opacity(1, duration),
      this.minuteHand.opacity(1, duration),
      this.secondHand.opacity(1, duration),
      this.centerDot.opacity(1, duration)
    )
  }

  public *animateHands(duration: number) {
    const times = this.config.times || []
    if (times.length === 0) return

    const durationPerTime = duration / times.length

    for (let i = 0; i < times.length; i++) {
      yield* this.animateToTime(times[i].hours, times[i].minutes, times[i].seconds, durationPerTime)
    }
  }

  private *animateToTime(hours: number, minutes: number, seconds: number, duration: number) {
    const hourAngle = (hours % 12) * 30 + minutes * 0.5
    const minuteAngle = minutes * 6 + seconds * 0.1
    const secondAngle = seconds * 6

    yield* all(
      this.hourHand.rotation(hourAngle, duration),
      this.minuteHand.rotation(minuteAngle, duration),
      this.secondHand.rotation(secondAngle, duration)
    )
  }
}


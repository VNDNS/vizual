import { initial, signal, Txt, Node, NodeProps, Rect } from "@motion-canvas/2d";
import { all, sequence, SimpleSignal, waitFor } from "@motion-canvas/core";
import { isThisTypeNode } from "typescript";

export interface LargeNumberProps extends NodeProps {
  value: number;
  size: number;
}

export const addCommas = (numStr: string): string =>
  numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',')


export class LargeNumber extends Node {
  @initial(0)
  @signal()
  private declare readonly currentValue: SimpleSignal<number, this>;

  @initial("")
  @signal()
  public declare readonly label: SimpleSignal<string, this>;

  private items: Rect[] = []
  private itemsNode: Node
  private n: number = 10
  private size: number
  private gap: number = 10
  private side: number
  private value: number
  private rounds: number
  private remainder: number

  public constructor(props: LargeNumberProps) {
    super({ ...props });

    this.value = props.value;
    this.size = props.size;
    this.side = (this.size - (this.n - 1) * this.gap) / this.n
    this.itemsNode = new Node({})
    this.add(this.itemsNode)
    this.initializeItems()
    this.initializeValueDisplay()
    this.rounds = Math.floor(Math.log(this.value) / Math.log(100))
    this.remainder = Math.floor(this.value / Math.pow(100, this.rounds))
  }

  public initializeItems() {
    
    const background = new Rect({
      width: this.size,
      height: this.size,
      fill: "black",
      opacity: 0.5,
    })
    
    //this.add(background)
    
    for(let i = 0; i < this.n; i++) {
      for(let j = 0; j < this.n; j++) {
        this.initializeItem(j, i)
      }
    }
  }

  public initializeItem(i: number, j: number) {

    const x = -this.size/2 + this.side/2 + i * (this.side + this.gap)
    const y = -this.size/2 + this.side/2 + j * (this.side + this.gap)

    const item = new Rect({
      width: 0,
      height: 0,
      fill: "cyan", 
      position: { x, y },
      radius: 5,
    })
    this.itemsNode.add(item)
    this.items.push(item)
  }

  public initializeValueDisplay() {
    const valueDisplay = new Txt({
      text: () => addCommas(this.currentValue().toFixed()),
      fontSize: 80,
      fill: "white",
      offset: [0,1],
      position: { x: 0, y: -this.size/2-10 },
    })
    this.add(valueDisplay)
  }

  public *activateAllItems() {
    yield* sequence(.01, ...this.items.map(item => item.size([this.side, this.side], .4)))
  }

  public *activateItems(amount: number) {
    yield* sequence(.01, ...this.items.slice(0, amount).map(item => item.size([this.side, this.side], .4)))
  }

  public *zoomOut(n: number = 1) {
    const x = -this.size/2 + this.side/2
    const y = -this.size/2 + this.side/2
    const item = new Rect({
      width: this.side,
      height: this.side,
      fill: "cyan",
      position: { x, y },
      radius: 5,
      opacity: 0,
    })
    this.add(item)
    const duration = 1
    yield* all(
      this.itemsNode.scale(this.side/this.size, duration),
      this.itemsNode.position({ x: -this.size/2 + this.side/2, y: -this.size/2 + this.side/2 }, duration)
    )
    yield* item.opacity(1, .3)
    this.items.forEach((item, index) => {
      if(index === 0) { return }
      item.size([0, 0])
    })
    this.itemsNode.scale(1)
    this.itemsNode.position({ x: 0, y: 0 })
    item.remove()
  }

  public *runOnce() {
    yield* all(
      this.activateAllItems(),
      this.updateCurrentValue(99*.01 + .4)
    )
  }
  
  public *run() {
    let i = 0
    while(100*this.currentValue() < this.value) {
      yield* this.runOnce()
      if(i === this.rounds - 1) {
        yield* this.zoomOut(this.remainder)
      } else {
        yield* this.zoomOut()
      }
      i++
    }
    yield* this.updateLastRound(this.remainder*.01 + .4)
  }

  public *updateCurrentValue(duration: number) {
    if(this.value > 100 * this.currentValue()) {
      yield* this.currentValue(100*(this.currentValue() || 1), duration)
    } else {
      yield* this.currentValue(this.value, duration)
    }
  }

  public *updateLastRound(duration: number) {
    yield* all(
      this.currentValue(this.remainder * Math.pow(100, this.rounds), duration),
      this.activateItems(this.remainder)
    )
  }
}


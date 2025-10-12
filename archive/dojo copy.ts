import fs from 'fs'
import { interpolate } from '../motion-canvas/src/scenes/interpolate'
import { smoothArray } from "../server/functions/smoothArray";
import { generateData } from '../motion-canvas/src/scenes/generateData'
import { dateToNumber } from '../server/functions/dateToNumber';

const frames = 600+1

// import data from '../data.json'
const names = ['Germany', 'USA', 'Russia', 'China', 'Japan',  'India', 'Brazil', 'Mexico', 'Argentina', 'Australia', 'Canada', 'France', 'Italy', 'Spain', 'Germany', 'USA', 'Russia', 'China', 'Japan',  'India', 'Brazil', 'Mexico', 'Argentina', 'Australia', 'Canada', 'France', 'Italy', 'Spain']
const data: any = generateData(names.length, 2, names);
fs.writeFileSync('data.json', JSON.stringify(data, null, 2))

const firstDate = Math.max(...Object.values(data).map((item: any) => dateToNumber(item.values[0].t)))
const lastDate = Math.min(...Object.values(data).map((item: any) => dateToNumber(item.values[item.values.length - 1].t)))

const newData: any = {...data}

const maxValues: number[] = []


Object.keys(data).forEach(key => {
  const dataArray: number[] = []

  const dt = (lastDate - firstDate) / frames

  for (let i = 0; i < frames; i++) {
    dataArray.push(interpolate(newData[key].values, firstDate + i * dt))
  }
  newData[key].interpolated = dataArray
  
})

for (let i = 0; i < frames; i++) {
  const maxValue = Object.values(newData).map((item: any) => item.interpolated[i]).sort((a, b) => b - a)[0]
  maxValues.push(maxValue)
}

for (let i = 0; i < frames; i++) {
  const frameValues = Object.keys(newData).map(key => ({
    key,
    value: newData[key].interpolated[i]
  }))
  
  frameValues.sort((a, b) => b.value - a.value)
  
  frameValues.forEach((item, index) => {
    if (!newData[item.key].order) {
      newData[item.key].order = []
    }
    newData[item.key].order[i] = index
  })
}

Object.keys(newData).forEach(key => {
  newData[key].order = smoothArray(newData[key].order, 50)
})

const newData2 = {data: newData, firstDate, lastDate, maxValues}

fs.writeFileSync('interpolated_data.json', JSON.stringify(newData2, null, 2))
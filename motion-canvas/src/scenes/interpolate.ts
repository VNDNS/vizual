import { dateToNumber } from '../../../server/functions/dateToNumber';

type DataPoint = {
  t: string;
  value: number;
}

export function interpolate(data: DataPoint[], t: number): number {
    if (!data || data.length === 0) {
        return NaN;
    }

    if (t <= dateToNumber(data[0].t)) {
        return data[0].value;
    }

    const lastPoint = data[data.length - 1];
    if (t >= dateToNumber(lastPoint.t)) {
        return lastPoint.value;
    }

    const index = data.findIndex(p => dateToNumber(p.t) >= t);
    
    if (index === -1) {
        // This case should ideally not be reached due to the boundary checks above,
        // but as a fallback.
        return NaN;
    }

    // if t is exactly on a point, return that point's value
    if (dateToNumber(data[index].t) === t) {
        return data[index].value;
    }

    // if index is 0, t must be < data[0].t, which is handled by the first check.
    // So, we can assume index > 0 here.
    if (index === 0) {
        return data[0].value;
    }

    const p2 = data[index];
    const p1 = data[index - 1];

    const t1 = dateToNumber(p1.t);
    const v1 = p1.value;
    const t2 = dateToNumber(p2.t);
    const v2 = p2.value;

    if (t1 === t2) {
        return v1;
    }

    const factor = (t - t1) / (t2 - t1);
    return v1 + (v2 - v1) * factor;
} 
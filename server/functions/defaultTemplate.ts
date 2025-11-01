export const defaultTemplate = (animations: any, i: number) => {
  const animation  = animations[i];
  const inputs     = Object.values(animation.inputs);
  const inputesFormatted = inputs.map((input: any) => {
    if(typeof input === 'number') {
      return input
    } else if(Array.isArray(input)) {
      return `[${input.map((item: any) => `'${item}'`).join(',')}]`
    }
    else {
      return `'${input}'`
    }
  })
  const args       = `${inputesFormatted.join(',')}${inputesFormatted.length > 0 ? ',' : ''}${animation.duration}`;
  const component  = animation.component;
  const methodName = animation.method;

  return `  clips.push(${component}.${methodName}(${args}))`;
};

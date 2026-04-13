type FlatObject = { [key: string]: string | number | boolean | null | string[] | object; };

export const flattenObject = ( obj: FlatObject, parent: string = "", res: FlatObject = {}, ): FlatObject => {
  for (const key in obj) {
    const propName = parent ? `${parent}.${key}` : key;

    if (Array.isArray(obj[key])) {
      if (typeof obj[key][0] === "object") {
        obj[key].forEach((item: FlatObject, index: number) => {
          flattenObject(item, `${propName}[${index}]`, res);
        });
      } else {
        res[propName] = obj[key].join(", ");
      }
      // res[propName] = obj[key].map((item: any) =>
      //     typeof item === 'object' ? JSON.stringify(item) : item
      // ).join(', ');
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      flattenObject(obj[key] as FlatObject, propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};
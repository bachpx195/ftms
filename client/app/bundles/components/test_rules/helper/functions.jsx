export const FunctionsHelper =
  {
    deepClone: (obj, hash = new WeakMap()) => {
      if (Object(obj) !== obj) return obj;
      if (hash.has(obj)) return hash.get(obj);
      var result = Array.isArray(obj) ? []
        : obj.constructor ? new obj.constructor() : Object.create(null);
      hash.set(obj, result);
      if (obj instanceof Map)
        Array.from(obj, ([key, val]) => result.set(key, deepClone(val, hash)) );
      return Object.assign(result, ...Object.keys(obj).map (
        key => ({ [key]: FunctionsHelper.deepClone(obj[key], hash) }) ));
    },
    
    resetActive: (data) => {
      for(var value of data) {
        value['active'] = false;
      }
      return data;
    },

    findNodeActive: (nodes) => {
      for(var node of nodes) {
        if(node.active) return node;
      }
      for(var node of nodes) {
        if(!node._destroy || node._destroy == 0) {
          node['active'] = true;
          return node;
        }
      }
      return [];
    },
  }

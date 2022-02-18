const { transform, keys, startsWith } = require('lodash');

class Storage {
  engine: globalThis.Storage;
  prefix: string;

  constructor(engine: globalThis.Storage, prefix: string) {
    this.engine = engine;
    this.prefix = prefix;
  }

  encode(val: any) {
    return JSON.stringify(val);
  }

  decode(val: string | null) {
    if (typeof val === 'string') {
      return JSON.parse(val);
    }
  }

  encodeKey(key: any) {
    return `${this.prefix}${key}`;
  }

  decodeKey(key: string | any[]) {
    if (startsWith(key, this.prefix)) {
      return `${key.slice(this.prefix.length)}`;
    }
  }

  set(key: any, val: any) {
    this.engine.setItem(this.encodeKey(key), this.encode(val));
    return val;
  }

  has(key: any) {
    return this.engine.getItem(this.encodeKey(key)) != null;
  }

  get(key: any, _default: any) {
    if (this.has(key)) {
      return this.decode(this.engine.getItem(this.encodeKey(key)));
    } else {
      return _default;
    }
  }

  delete(key: any) {
    return this.engine.removeItem(this.encodeKey(key));
  }

  keys() {
    return transform(keys(this.engine), (ours: string[], key: string | any[]) => {
      const ourKey = this.decodeKey(key);
      if (ourKey != null) ours.push(ourKey);
    });
  }
}

const instance = new Storage(sessionStorage, 'analyzeui:');

export default instance;

import LinkedList from "./linked-list.js";

class Hashmap {
  constructor(capacity = 16, loadFactor = 0.8) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.data = [];
  }

  keys() {
    let arr = [];
    this.data.forEach((list) => {
      const listSize = list.size();
      for (let i = 0; i < listSize; i++) {
        arr.push(list.at(i).value[0]);
      }
    });
    return arr;
  }

  values() {
    let arr = [];
    this.data.forEach((list) => {
      const listSize = list.size();
      for (let i = 0; i < listSize; i++) {
        arr.push(list.at(i).value[1]);
      }
    });
    return arr;
  }

  entries() {
    let arr = [];
    this.data.forEach((list) => {
      const listSize = list.size();
      for (let i = 0; i < listSize; i++) {
        arr.push(list.at(i).value);
      }
    });
    return arr;
  }

  length() {
    let count = 0;
    this.data.forEach((value) => {
      count += value.size();
    });
    return count;
  }

  clear() {
    this.data = [];
  }

  remove(key) {
    const hashIndex = this.hash(key);
    const listIndex = this.data[hashIndex].find((value) => value[0] === key);
    if (listIndex == null) {
      console.log("Failed");
      return;
    }

    this.data[hashIndex].removeAt(listIndex);
    console.log("Success");
  }

  has(key) {
    const hashIndex = this.hash(key);
    if (this.data[hashIndex].find((value) => value[0] === key) !== null) {
      return true;
    } else return false;
  }

  set(key, value) {
    const hashIndex = this.hash(key);
    if (this.data[hashIndex] == null) {
      this.data[hashIndex] = new LinkedList();
    }
    const listIndex = this.data[hashIndex].find((value) => value[0] === key);
    if (listIndex !== null)
      this.data[hashIndex].at(listIndex).value = [key, value];
    else {
      this.data[hashIndex].append([key, value]);
    }
  }

  get(key) {
    const hashIndex = this.hash(key);
    const listIndex = this.data[hashIndex].find((value) => value[0] === key);
    if (listIndex !== null) {
      return this.data[hashIndex].at(listIndex).value[1];
    } else {
      return null;
    }
  }

  hash(key) {
    return Math.floor(this.capacity * this.stringToFraction(key));
  }

  stringToFraction(string) {
    let fraction = 0;
    const fractionalConstant = (Math.sqrt(5) - 1) / 2;
    for (let i = 0; i < string.length; i++) {
      fraction =
        (Math.abs(string.charCodeAt(i) + fraction) * fractionalConstant) % 1;
    }
    return fraction;
  }
}

export default Hashmap;

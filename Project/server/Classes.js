class Model {
  #id;
  constructor(id=0) {
    this.#id = id;
  } 
  getID() {return this.#id;}
  setID(id) {
    try {this.#id = parseInt(id,10); return true;}
    catch(err) {return false;}
  }
}

module.exports = {Model};
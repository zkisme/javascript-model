/**
 *  - 
 */
class Model {
  constructor(options) {
    this.options = options;
    let res = initModel(options)
    res.__proto__ = Model.prototype
    return res
  }
  init(data){
    return initModel(this, data)
  }
}

function initModel(model, data){
  
  if(!data) {
    let object = {}
    if(type(model) === 'object') {
      for (let key in model) {
        const value = model[key]
        if(typeof value === 'function') {
          object[key] = value()
          continue
        }
        object[key] = value
      }
    }

    return object
  }

  if(type(model) === 'object') {
    for (let key in model) {
      if(data[key] === undefined || data[key] === model[key] || data[key].constructor !== model[key].constructor) continue
      model[key] = data[key]
      
    }
  }

  
}

function type (obj) {
  let type = typeof obj
  if(type !== 'object') return type
  const match = Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)
  return match && match.length && match[1] && match[1].toLowerCase() || null
}

const Person = new Model({
  name: String,
  age: Number,
  cloths: {
    type: Array,
    default: [],
    item: {
      type: Object,
      default: {
        color: String,
        size: Number
      }
    }
  },
  action: {
    type: Object,
    default: {
      eat: Function,
      sleep: Function,
      name: String
    }
  }
});

const data = {
  name: 'kay',
  age: 25,
  methods: {},
  actions: {
    eat() { console.log('eat'); },
    walk() { console.log('walk'); }
  }
};

Person.init(data);
console.log(Person);
// Person.action.eat()

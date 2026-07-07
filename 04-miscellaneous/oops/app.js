// prototype - in js, when we make an array object, it stores local data for each array object. 
// but for shared functions it does not make copies for each object, it has a single reference to prototype object that contains all the method. 
// when we call for a method the oject cals it through prototype object by passing a reference to itself. imitating java's static meathods. 
// (Why is differentiates from java? -> java has a meathod area which loads each meathod only once and passes referance. 
// in js we do it a bit differently because js is dynamic and object data and properties change as it is running)


// factory functions -
// drawback - each function has it's own copy of functions not data effecient
function personMaker(name, age) {
    const person = {
        name : name,
        age : age,
        talk : () => {
            console.log(`hello, i am ${name} and i am ${age} years old`);
        }
    }
    return person;
};

let p1 = personMaker("yashik", 19);
let p2 = personMaker("dhruv", 13);
p1.talk();
p2.talk();
console.log((p1.talk === p2.talk));

// Constructors - does not return anything and starts with capital and does not make a copy of meathods
function Person (name, age) {
    this.name = name;
    this.age = age; //automatically makes a new key for "this.name" and stores it for this instance of object.

    // this.talk = () => { //still makes duplicates
    //         console.log(`hello, i am ${this.name} and i am ${this.age} years old`);
    // }
}

// no duplicates here
Person.prototype.talk = function () {
    console.log(`hello, i am ${this.name} and i am ${this.age} years old`);
}

let p3 = new Person("saransh", 20); // automatically makes a new object
let p4 = new Person("ishaan", 19);
p3.talk();
p4.talk();
console.log((p3.talk === p4.talk));    


// we chave classes in modern js

class Student {
    constructor(name, roll) {
        this.name = name;
        this.roll = roll;
    }

    talk() {
        console.log(`hello, i am ${this.name} and my roll no is : ${this.roll}`);
    }
}

let s1 = new Student("yashik", 1089);
let s2 = new Student("saransh", 1073);

s1.talk();
s2.talk();
console.log(s1.talk === s2.talk);

//inheritance
class Mammal {
    constructor(name) {
        this.name = name;
        this.type = "warm-blodded";
    }

    eat() {
        console.log("mammal is eating");
    }

    walk() {
        console.log("mammal is walking");
    }
}

class Dog extends Mammal {

    constructor(name, breed) {
        super(name);    //calls parent constructor
        this.breed = breed;
    }

    // overriding
    eat() {
        console.log("dog is eating");
    }
}

let dog1 = new Dog("tommy", "beagle");
dog1.walk();
dog1.eat();
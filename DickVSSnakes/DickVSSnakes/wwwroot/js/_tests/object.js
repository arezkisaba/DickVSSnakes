'use strict';

console.log("=============================");

// Classe abstraite
function myAbstractClass(a, b) {
    this.A = a;
    this.B = b;
}
myAbstractClass.prototype.virtualFunction = function () {
    return "Je suis la méthode virtuelle";
};
myAbstractClass.prototype.commonFunction = function () {
    return "Je suis une méthode commune avec (A:" + this.A + ", B:" + this.B + ")";
};

// Classe héritée SANS surcharge
function myInheritedClass1() {
    myAbstractClass.call(this, 1, 2);

}
myInheritedClass1.prototype = Object.create(myAbstractClass.prototype);

// Classe héritée AVEC surcharge
function myInheritedClass2() {
    myAbstractClass.call(this, 3, 4);
}
myInheritedClass2.prototype = Object.create(myAbstractClass.prototype);
myInheritedClass2.prototype.virtualFunction = function () {
    return "Je suis la méthode surchargée";
};

// Instanciation #1
var myObject1 = new myInheritedClass1();
console.log(myObject1.virtualFunction());
console.log(myObject1.commonFunction());

// Instanciation #2
var myObject2 = new myInheritedClass2();
console.log(myObject2.virtualFunction());
console.log(myObject2.commonFunction());

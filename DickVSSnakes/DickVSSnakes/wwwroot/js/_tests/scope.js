'use strict';

console.log("=============================");

var myGlobalVariable = "Je suis une variable GLOBALE";

function TestScope() {

    var myLocalVariable = "Je suis une variable LOCALE";
    console.log("myLocalVariable : " + myLocalVariable);
}

TestScope();
console.log("myGlobalVariable : " + myGlobalVariable);
console.log("window.myGlobalVariable : " + window.myGlobalVariable);
console.log("myLocalVariable : " + myLocalVariable);

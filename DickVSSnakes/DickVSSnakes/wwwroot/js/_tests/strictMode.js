'use strict';
console.log("=============================");

myUnitializedVariable1 = "Je suis une variable non initialisée sans strict-mode";

function TestScope() {
    'use strict';

    myUnitializedVariable2 = "Je suis une variable non initialisée avec strict-mode";
}

TestScope();

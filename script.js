

(function() {
    "use strict";
  
    // atajo para obtener elementos
    var el = function(element) {
      if (element.charAt(0) === "#") { 
        return document.querySelector(element); //retorna un solo elemento si pasa solo un id
      }
  
      return document.querySelectorAll(element); // sino, devuelve una lista de nodos
    };
  
    // Variables
    var viewer = el("#viewer"), // pantalla de la calculadora donde se muestra el resultado
      equals = el("#equals"), // boton igual
      nums = el(".num"), // Lista de numeros
      ops = el(".ops"), // Lista de operadores
      theNum = "", // numero actual
      oldNum = "", // Primer nmumero
      resultNum, // Resultado
      operator; 
  
    // obtener el numero seleccionado 
    var setNum = function() {
      if (resultNum) { 
        theNum = this.getAttribute("data-num");
        resultNum = "";
      } else { // sino, dejar el numero previo
        theNum += this.getAttribute("data-num");
      }
  
      viewer.innerHTML = theNum; //Mostrar numero actual
  
    };
  
    // cuand ose click en el operador
    var moveNum = function() {
      oldNum = theNum;
      theNum = "";
      operator = this.getAttribute("data-ops");
  
      equals.setAttribute("data-result", ""); //resetea el resultado
    };
  
    // operaciones
    var displayNum = function() {
  
      // convertir los inputs en numeros
      oldNum = parseFloat(oldNum);
      theNum = parseFloat(theNum);
  
      
      switch (operator) {
        case "plus":
          resultNum = oldNum + theNum;
          break;
  
        case "minus":
          resultNum = oldNum - theNum;
          break;
  
        case "times":
          resultNum = oldNum * theNum;
          break;
  
        case "divided by":
          resultNum = oldNum / theNum;
          break;
  
          // Si se presiona sin un operador que continue con el mismo numero
        default:
          resultNum = theNum;
      }
  
      // Si NaN o Infinity returnaron
      if (!isFinite(resultNum)) {
        if (isNaN(resultNum)) { // si el resultado no es un numero
          resultNum = "Operacion Invalida ! ";
        } else { // Si el resultado es infinito o esta dividido por cero
          resultNum = "Te dije que NOO!! ";
          el('#calculator').classList.add("broken"); // se rompe el calculador
          el('#reset').classList.add("show"); //muestra el boton de reset
        }
      }
  
      // Mostrar el resultado
      viewer.innerHTML = resultNum;
      equals.setAttribute("data-result", resultNum);
  
      // ahora resetea el numro
      oldNum = 0;
      theNum = resultNum;
  
    };
  
    // cuando tocan C borre todo
    var clearAll = function() {
      oldNum = "";
      theNum = "";
      viewer.innerHTML = "0";
      equals.setAttribute("data-result", resultNum);
    };
  
    /* Eventos de lclick */
  
    // Evento de click en los numeros
    for (var i = 0, l = nums.length; i < l; i++) {
      nums[i].onclick = setNum;
    }
  
    // Evento de click en los operadores
    for (var i = 0, l = ops.length; i < l; i++) {
      ops[i].onclick = moveNum;
    }
  
    // al signo igual
    equals.onclick = displayNum;
  
    // boton de clear
    el("#clear").onclick = clearAll;
  
    // evento al boton Volver?  
    el("#reset").onclick = function() {
      window.location = window.location;
    };
  
  }());
document.addEventListener("DOMContentLoaded", function () {
  //Fetching all the elements required for my project using js feature
  const num1Input = document.getElementById("num1");
  const num2Input = document.getElementById("num2");
  const expression = document.getElementById("expression");
  const result_field = document.getElementById("result");

  const buttons = document.querySelectorAll(".btn-container button");
  const clearButton = document.getElementById("clear");
  const calculateButton = document.getElementById("calculate");

  let operator = "";
  //this foreach function basically works for all the operators button
  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      operator = button.getAttribute("data-operator");
      updateExpression();
    });
    
  });
  
  num1Input.addEventListener(
    "input",

    updateExpression
  );
  num2Input.addEventListener("input", updateExpression);
//this function below basically for updating expression everytime after input something 
  function updateExpression() {
    const num1Value = num1Input.value;
    const num2Value = num2Input.value;

    expression.value = num1Value + " " + operator + " " + num2Value;
  }

  calculateButton.addEventListener(
    "click",
    function (e) {
      //for prevent default behaviour of this form
      e.preventDefault();
      const num1Value = parseFloat(num1Input.value);
      const num2Value = parseFloat(num2Input.value);
      //if fields are empty
      if (num1Input.value.trim() === "" || num2Input.value.trim() === "") {
        result_field.value = "Empty field, enter to calculate";
        return;
      }
      //if user input is not number
      if (isNaN(num1Value) || isNaN(num2Value)) {
        result_field.value = "Invalid input. Please enter valid numbers.";
        return;
      }
     
      //if no operator is selected
      if (!operator) {
        result_field.value = "Please select an operator.";
        return;
      }

      let result = "";
      //this switch case for handling all the cases of calculation
      switch (operator) {
        case "+":
          result = num1Value + num2Value;
          break;
        case "-":
          result = num1Value - num2Value;
          break;
        case "*":
          result = num1Value * num2Value;
          break;
        case "/":
          if (num2Value !== 0) {
            result = num1Value / num2Value;
          }
          //handling not devided by zero case
          else {
            result_field.value = "Cannot divide by zero.";
            return;
          }
          break;

        default:
          result_field.value = "Invalid operation.";
          return;
      }
      if (!isFinite(result)) {
        result_field.value = "Result is not a finite number";
        return;
      }

      result_field.value = result;
    },
    false
  );
//this eventlistner for clearing all the fields when clicking on clear button
  clearButton.addEventListener("click", (e) => {
    e.preventDefault();
    num1Input.value = "";
    num2Input.value = "";
    expression.value = "";
    operator = "";
    result_field.value = "";
  });
});

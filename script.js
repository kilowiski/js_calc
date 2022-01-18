//input button
function inputs(){
  $(document).ready( function (){
    $("#operate").text("")
    $("#d1").on("click", function(){
        $("#operate").append(document.createTextNode( "1" ))
    })
    $("#d2").on("click", function(){
        $("#operate").append(document.createTextNode( "2" ))
    })
    $("#d3").on("click", function(){
        $("#operate").append(document.createTextNode( "3" ))
    })
    $("#d4").on("click", function(){
        $("#operate").append(document.createTextNode( "4" ))
    })
    $("#d5").on("click", function(){
        $("#operate").append(document.createTextNode( "5" ))
    })
    $("#d6").on("click", function(){
        $("#operate").append(document.createTextNode( "6" ))
    })
    $("#d7").on("click", function(){
        $("#operate").append(document.createTextNode( "7" ))
    })
    $("#d8").on("click", function(){
        $("#operate").append(document.createTextNode( "8" ))
    })
    $("#d9").on("click", function(){
        $("#operate").append(document.createTextNode( "9" ))
    })
    $("#d0").on("click", function(){
        $("#operate").append(document.createTextNode( "0" ))
    })
    $("#add").on("click", function(){
        $("#operate").append(document.createTextNode( "+" ))
    })
    $("#sub").on("click", function(){
        $("#operate").append(document.createTextNode( "-" ))
    })
    $("#mul").on("click", function(){
        $("#operate").append(document.createTextNode( "x" ))
    })
    $("#div").on("click", function(){
        $("#operate").append(document.createTextNode( "/" ))
    })
    $("#clr").on("click", function(){
        $(".display").text("")
    })
  })
}
//thank you person on the internet
//https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript
function splitMulti(str, tokens){
        var tempChar = tokens[0]; // We can use the first token as a temporary join character
        for(var i = 1; i < tokens.length; i++){
            str = str.split(tokens[i]).join(tempChar);
        }
        str = str.split(tempChar);
        return str;
}

function operation(opr1,opr2,operator){

  if(operator==="+"){
    return Number(opr1)+Number(opr2)
  }
  else if(operator==="-"){
    return Number(opr1)-Number(opr2)
  }
  else if(operator==="x"){
    return Number(opr1)*Number(opr2)
  }
  else if(operator==="/"){
    return Number(opr1)/Number(opr2)
  }
  else{
    return Number(opr1)+Number(opr2);
  }
}

//INI PASS BY APA YA?
//use to search for * /
function searchMulDiv(splitted,operators){
  for(var i=0; i<(operators.length); i++){
    var temp =0;

    if(operators[i]==="x"){
      //calc temp
      temp = splitted[i-1]*splitted[i]
      //replace the operator at that index
      operators[i]="+"
      //swap out with result
      splitted[i-1]=0
      splitted[i]=temp
    }
    else if(operators[i]==="/"){
      //calc temp
      if(splitted[i]==="0"){
          return ["ERROR"]
          break
      }
      else{
            temp = splitted[i-1]/splitted[i]
            //replace the operator at that index
            operators[i]="+"
            //swap out with result
            splitted[i-1]=0
            splitted[i]=temp
      }
    }
    console.log("iterasi "+ i +" = "+splitted)
    console.log("new operator list "+operators)
  }
  return splitted
}

$(document).ready( function (){
  $("#operate").text('calculator ready')
  //input the keys
  inputs()
  //check if = has been pressed
  $("#equ").on("click", function(){
      //READ FROM THE DISPLAY BUFFER
      let buffer = $("#operate").text()
      //split using the operators, retrieve the numbers
      let splitted = splitMulti(buffer, ['+', '-', 'x', '/']);
      //retrieve the operators from the original buffer
      //note index 0 of operator is null, hence the first operator is at operators[1]
      let operators = splitMulti(buffer, splitted);
      //console.log(splitted);
      //console.log(operators);
      var sum = 0
      //lets do the logic
      //check if multiplication or division is inside the operation
      //create new array so all operations are reduced to either + or -
      var newSplitted = searchMulDiv(splitted,operators);
      if (newSplitted[0] === "ERROR"){
                $("#operate").text('ERROR')
      }
      else{
        for(let i =0; i<(newSplitted.length); i++){
            sum = operation(sum,newSplitted[i],operators[i])
        }
        //output result
        $("#result").html(sum)
      }
  })
})

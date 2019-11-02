$(document).on("click", "#add-roll", function() {
  event.preventDefault();
  var DiceNum = $("#DiceNum-input")
    .val()
    .trim();
  $("#dice-view").empty();
  for (let i = 0; i < DiceNum; i++) {
    $("#dice-view").append(
      "<i class='fas fa-dice-d20 fa-3x' id='coverdice'></i> "
    );
  }

  let myAnimation = anime({
    targets: "#coverdice",
    rotate: { value: 720 },
    duration: 3000
    /* describe the animation details */
  }); // This line of code will grab the input from the textbox
  myAnimation.restart;
  document.querySelector("#add-roll").onclick = myAnimation.restart;

  $("#rolls-appear-here").text("You actually have to input things you fool");
  $("#modifier-here").empty();
  $("#total").empty();
  var total = 0;

  var DiceValpre = $("#DiceVal-input")
    .val()
    .trim();
  var DiceVal = parseInt(DiceValpre);
  var mod = $("#mod-input")
    .val()
    .trim();
  total = 0 + parseInt(mod);
  $("#rolls-appear-here").empty();
  console.log(DiceVal);
  console.log(DiceValpre);

  // var GifFinder = $(this).attr("data-name");
  var queryURL = "http://roll.diceapi.com/json/" + DiceNum + "d" + DiceVal;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#rolls-view").empty();
    myAnimation.repeat;

    // $("#GIF-view").append("<div>" + response.Title + "</div>");
    // $("#DiceNum-input").val("");
    // $("#DiceVal-input").val("");
    // $("#mod-input").val("");

    var results = response.dice;
    for (var i = 0; i < results.length; i++) {
      var rollDiv = $("<div>");
      var p = $("<p>");
      $(p).text("d" + DiceVal + " #" + (i + 1) + ": " + results[i].value);
      total = total + results[i].value;
      $(rollDiv).append(p);
      $("#rolls-appear-here").append(rollDiv);
      $("#modifier-here").text("Modifier: " + mod);
      $("#total").text("Total: " + total);
    }
  });
});
// The GIF from the textbox is then added to our array

// Calling renderButtons which handles the processing of our GIF array

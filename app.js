//use Greeter object on the click even of the login button
$("#login").click(function() {
  //Crete a new "Greeter" object
  let Greeter = G$("John", "Doe");

  //hide the login on the screen
  $("#logindiv").hide();

  //fire off an HTML greeting, passing the "#greeting" as the selector and the choosen language, and log the welcome as well
  Greeter.setLang($("#lang").val())
    .HTMLgreet("#greeting", true)
    .log();
});

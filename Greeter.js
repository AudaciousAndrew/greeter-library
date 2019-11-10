//IIFE for a separate execution context
;(function(global, $) {
  // 'new' an object
  let Greeter = function(firstName, lastName, language) {
    return new Greeter.init(firstName, lastName, language);
  };

  //hidden within the scope of IIFE and never directly accessible
  const supportedLangs = ["en", "es"];

  //informal greetings
  const greetings = {
    en: "Hello",
    es: "Hola"
  };

  //formal greetins
  const formalGreetings = {
    en: "Greetings",
    es: "Saludos"
  };

  //logger messages
  const logMessages = {
    en: "Logged in",
    es: "inicio sesion"
  };

  //Prototype holds methods to save up memory space
  Greeter.prototype = {
    //'this' refers to the calling object at execution time
    fullName: function() {
      return this.firstname + " " + this.lastname;
    },

    //check if current language can be processed
    validate: function() {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language.";
      }
    },

    //informal greeting using [] syntax
    greeting: function() {
      return greetings[this.language] + " " + this.firstname + "!";
    },

    //formal greeting using [] syntax
    formalGreeting: function() {
      return formalGreetings[this.language] + ", " + this.fullName() + ".";
    },

    greet: function(formal) {
      let msg;

      //if undefine or null will be coerced to false
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      //check if console object exists and log the greeting
      if (console) {
        console.log(msg);
      }

      //make chainable
      return this;
    },

    //logger
    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ": " + this.fullName());
      }

      //make chainable
      return this;
    },

    //set language on fly
    setLang: function(language) {
      this.validate();
      this.language = language;
      //make chainable
      return this;
    },

    //display greeting in h1 tag using jQuery
    HTMLgreet: function(selector, formal) {
      if (!$) throw "jQuery not loaded.";
      if (!selector) throw "Missing jQuery selector.";
      let msg;
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }
      $(selector).html(msg);

      //make chainable
      return this;
    }
  };

  // the actual object that is created here, allowing us to 'new' an object withouth calling new operator
  Greeter.init = function(firstName, lastName, language) {
    this.firstname = firstName || "";
    this.lastname = lastName || "";
    this.language = language || "en";

    this.validate();
  };

  //set our init object prototype
  Greeter.init.prototype = Greeter.prototype;

  //attach our Greeter object to global object and create alias G$
  global.Greeter = global.G$ = Greeter;
})(window, jQuery);

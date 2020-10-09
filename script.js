document.addEventListener('DOMContentLoaded',function() {

  document.getElementsByTagName('form')[0].onsubmit = function(e) {
    e.preventDefault(); 
    checkWord();
    window.scrollTo(0, 150);
  }

  var inputVal = document.getElementsByTagName('input')[0].value.trim();

  var clearInput = function() {
    document.getElementsByTagName('input')[0].value = "";
  }

  var clearTerminal = function() {
    document.getElementById('results').innerHTML = "";
  }

  var getTimeAndDate = function(postTimeDay) {
    var timeAndDate = new Date();
    var hours = timeAndDate.getHours();
    var minutes = timeAndDate.getMinutes();
    var day = timeAndDate.getDate();
    var month = timeAndDate.getMonth() + 1;
    var year = timeAndDate.getFullYear(); 

    if (hours < 10) {
      hours = "0" + hours;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    var currentTime = hours + ":" + minutes;
    var currentDate = month + "/" + day + "/" + year;

    if (postTimeDay == "time") {
      addTextToResults(currentTime);
    }
    if (postTimeDay == "date") {
      addTextToResults(currentDate);
    }
  }

  var scrollToBottomOfResults = function() {
    var terminalResults = document.getElementById('results');
    terminalResults.scrollTop = terminalResults.scrollHeight;
  }

  scrollToBottomOfResults();

  var addTextToResults = function(textToAdd) {
    document.getElementById('results').innerHTML += "<p>" + textToAdd + "</p>";
    scrollToBottomOfResults();
  }

  var list = function() {
    var keywords = [
      "Open + URL to open it in the browser",
      "Google + keyword to search directly in Google.",
      "YouTube + keyword to search directly in YouTube.",
      "'Time' will display the current time.",
      "'Date' will display the current date.",
      "'Clear' to clear the terminal.",
      "'Exit' to close the window.",
      "There are also other keywords which you need to discover yourself, one of them might be 'do a barrel roll'"
    ].join('<br>');
    addTextToResults(keywords);
  }

  // Little script for a secret code
  const pressed = [];
  console.log("Secret code: arrowUp, arrowDown, CTRL & xy");
  const secretCode = ("arrowUp", 'arrowDown', 'Control', 'xy');
  window.addEventListener('keyup', (e) => {
      pressed.push(e.key);
      pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
      if(pressed.join('').includes(secretCode)) {
          var a="-webkit-";
          var b='transform:rotate(360deg);'; 
          var c='transition:3s;';

          document.head.innerHTML += '<style>body{' + a + b + a + c + b + c
          }
      });

  var openLinkInNewWindow = function(link) {
    window.open(link, "_blank");
    clearInput();
  }

  var closeWindow = function() {
    clearInput();
    window.close();
  }

  var textReplies = function() {
    switch(lowercase) {
      case "youtube":
        clearInput();
        break;

      case "google":
        clearInput();
        break;

      case "do a barrel roll":
        clearInput();
        var a="-webkit-";
        var b='transform:rotate(360deg);'; 
        var c='transition:3s;';

        document.head.innerHTML += '<style>body{' + a + b + a + c + b + c
        break;
    
      case "time":
        clearInput();
        getTimeAndDate("time");
        break;

      case "date":
        clearInput();
        getTimeAndDate("date");
        break;

      case "--help":
      case "--h":
      case "h":
      case "?":
        clearInput();
        list();
        break;

      case "clear":
      case "clear()":
        clearInput();
        clearTerminal();
        break;

      case "exit":
      case "exit()":
      case "x":
        closeWindow();
        break;

      default:
        clearInput();
        addTextToResults("<p><i>The command " + inputVal + " was not found. Type <b>--help</b> to see commands.</i></p>");
        break;
    }
  }

  var checkWord = function() {
    inputVal = document.getElementsByTagName('input')[0].value.trim();
    lowercase = inputVal.toLowerCase();

    document.onkeydown = checkKey;
    function checkKey(e) {
      e = e || window.event;
      if (e.keyCode == '38') {
        document.getElementsByTagName('input')[0].value = inputVal;
      }
    }

    if (inputVal != "") {
      addTextToResults("<p class='userText'> geek@pc:<span>~$ " + inputVal + "</span></p>");
      if (lowercase.substr(0,5) == "open ") {
        openLinkInNewWindow('http://' + lowercase.substr(5));
        addTextToResults("<i>The URL " + "<b>" + inputVal.substr(5) + "</b>" + " should be opened now.</i>");
      } else if (lowercase.substr(0,8) == "youtube ") {
        openLinkInNewWindow('https://www.youtube.com/results?search_query=' + lowercase.substr(8));
        addTextToResults("<i>Searching YouTube for " + "<b>" + inputVal.substr(8) + "</b>" + " it should be opened now.</i>");
      } else if (lowercase.substr(0,7) == "google ") {
        openLinkInNewWindow('https://www.google.com/search?q=' + lowercase.substr(7));
        addTextToResults("<i>Searching Google for " + "<b>" + inputVal.substr(7) + "</b>" + ". It should be opened now.</i>");
      } else{
        textReplies();
      }
    }
  };
});

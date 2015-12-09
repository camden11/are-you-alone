// Array of all scenes
var scenes = beach;
var endScenes = beachEnd;

var currentScene = 0;

function main() {
  $(".inner").typed({
    strings: [intro],
    typeSpeed: 30,
    loop: false,
    contentType: 'html',
    showCursor: false,
    callback: function() {
      setTimeout(function() {
        $(".outer").remove();
        type();
      }, 4500);
    }
  });
}

// Types the scene at the given index in scenes
function type() {
  $("#scene").typed({
    strings: [scenes[currentScene]],
    typeSpeed: 30,
    loop: false,
    contentType: 'html',
    showCursor: false,
    callback: prompt
  });
}

// Types the unrecognized answer scene
function typeUnrecognized() {
  $("#scene").typed({
    strings: [unrecognizedText],
    typeSpeed: 30,
    loop: false,
    contentType: 'html',
    showCursor: false,
    callback: prompt
  })
}

// Types the "are you sure?" scene
function typeAreYouSure() {
  $("#scene").typed({
    strings: [areYouSureText],
    typeSpeed: 200,
    loop: false,
    contentType: 'html',
    showCursor: false,
    callback: areYouSurePrompt
  })
}

// Types the end scene
function typeEnd() {
  $("#scene").typed({
    strings: [endScenes[currentScene]],
    typeSpeed: 30,
    loop: false,
    contentType: 'html',
    showCursor: false,
    callback: final
  })
}

// Displays the cursor
function showCursor() {
  $('#input').typed({
    strings: [""],
    showCursor: true
  });
}

// Allows user to type in their response
function prompt() {
  if (currentScene == scenes.length - 1) {
    return;
  }
  
  showCursor();
  
  // Check for enter, run next scene if pressed
  $(document).on("keypress", function(key) {
    if (key.keyCode == 13) {
      var response = $('#input').html().toLowerCase();
      if (knownResponses[response] == 1) {
        next();
      }
      else if (knownResponses[response] == 0) {
        areYouSure();
      }
      else {
        unrecognizedAnswer();
      }
    }
    // Otherwise, append the character
    else {
      $('#input').append(String.fromCharCode(key.keyCode));
    }
  });
}

function areYouSurePrompt() {
  
  showCursor();
  
  // Check for enter, run next scene if pressed
  $(document).on("keypress", function(key) {
    if (key.keyCode == 13) {
      var response = $('#input').html().toLowerCase();
      if (knownSureResponses[response] == 1) {
        end();
      }
      else {
        unrecognizedAnswer();
      }
    }
    // Otherwise, append the character
    else {
      $('#input').append(String.fromCharCode(key.keyCode));
    }
  });
}

// Prevent the backspace key from navigating back, deletes text
function handleBackSpace() {
  $(document).keydown(function(key) {
    if (key.keyCode == 8) {
      key.preventDefault();
      var contents = $('#input').html();
      if (contents.length > 0) {
        $('#input').html(contents.substring(0, contents.length - 1));
      }
    }
  });
}

// Destroys the current scene and turns off text input
function reset() {
  $(document).off("keypress");
  $('#scene').remove();
  $('#break').remove();
  $('#input').remove();
  $('.typed-cursor').remove();
}

// Creates new scene HTML elements
function newScene() {
   $('#top').append("<span id='scene'></span><br id='break'/><span id='input'></span>");
}
// Moves on to the next scene
function next() {
  reset();
  currentScene++;
  newScene();
  type();
}

// Moves on to the unrecognized answer scene
function unrecognizedAnswer() {
  reset();
  newScene();
  typeUnrecognized();
}

// Moves on to the "are you sure" scene
function areYouSure() {
  reset();
  newScene();
  typeAreYouSure();
}

// Moves on to the end scene
function end() {
  reset();
  newScene();
  typeEnd();
}

function final() {
  $('#topmid').css("opacity", 0);
  $('#bottommid').css("opacity", 0);
  setTimeout(function() {
    reset();
    $("#top").append("<div class='outer'><div class='inner' id='endtext'></div></div>");
    $(".inner").typed({
      strings: [finalText],
      typeSpeed: 200,
      loop: false,
      contentType: 'html',
      showCursor: false
    });
  }, 10000);
}


// Run
handleBackSpace();
main();
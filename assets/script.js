// Listener for click events on the save button
$(".saveBtn").on("click", function() {
  // Get the user input from the textarea
  var userInput = $(this).siblings(".description").val().trim();
  
  // Get the id of the containing time-block
  var timeBlockId = $(this).parent().attr("id");
  
  // Save the user input in local storage using the time block id as the key
  localStorage.setItem(timeBlockId, userInput);
});

// Apply the past, present, or future class to each time block
function applyTimeBlockStyles() {
  // Get the current hour using Day.js
  var currentHour = dayjs().format("H");

  // Loop through each time block
  $(".time-block").each(function() {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

    // Remove any previous class and add the appropriate class based on the comparison
    $(this).removeClass("past present future");
    if (timeBlockHour < currentHour) {
      $(this).addClass("past");
    } else if (timeBlockHour == currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
}

// Get user input from localStorage and set the values of corresponding textarea elements
function loadSavedUserInput() {
  $(".time-block").each(function() {
    var timeBlockId = $(this).attr("id");
    var userInput = localStorage.getItem(timeBlockId);

    if (userInput) {
      $(this).find(".description").val(userInput);
    }
  });
}

// Display the current date in the header of the page
function displayCurrentDate() {
  var currentDate = dayjs().format("MMMM DD, YYYY");
  $("#currentDay").text("Today is " + currentDate);
}

// Call the necessary functions to initialize the page
applyTimeBlockStyles();
loadSavedUserInput();
displayCurrentDate();

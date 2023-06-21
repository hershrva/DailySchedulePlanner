// REFERENCES FOR IMPORTANT DOM ELEMENTS
var timeDisplayEl = $('#currentDay');
var timeBlockEl = $('.time-block');
var saveBtn = $('.saveBtn')
var events = [];
var localStorageAlert = $('.local-storage-alert')
// this function waits for the DOM to finish loading before it is called
$(document).ready(function () {
// handles displying the time
function displayTime() {
  var rightNow = dayjs().format('dddd, MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(rightNow);
}
// This function loops through each time block element and checks to see if the block is in the past present or future
function checkTime() {
  timeBlockEl.each(function () {
    // assigns variables for the current hour using dayjs and the timeblock by splitting the ID and changing both to Integers to be compared in if loop
    var currentHour = parseInt(dayjs().format('H'));
    var timeBlock = parseInt($(this).attr('id').split('hour-')[1]);
    console.log(timeBlock);
    // locates the description element in each time block and assigns it as a variable
    var descriptionEl = $(this).find('.description');
    // if loop assigns a class to assign a background color based on when that block is relative to the current time
    if (currentHour < timeBlock) {
      descriptionEl.addClass('future');
      descriptionEl.removeClass('past');
      descriptionEl.removeClass('present');
      console.log('before');
    } else if (currentHour > timeBlock) {
      descriptionEl.addClass('past');
      descriptionEl.removeClass('present');
      descriptionEl.removeClass('future');
      console.log('after');
    } else {
      descriptionEl.addClass('present');
      descriptionEl.removeClass('past');
      descriptionEl.removeClass('future');
      console.log('else');
    }
  });
}
// Allows me to access these variables inside different functions by having them in the global
var timeBlock;
var inputText;
// this event is triggered by the button being clicked. It handles the description being saved to the localStorage
function handleEventSubmit(event) {
  event.preventDefault();
  console.log("handle ", $(this).parent().attr('id'));
  // pulls the ID to assign the variable timeBlock to a unique identity
  timeBlock = $(this).parent().attr('id');
  console.log(timeBlock);
  // trims and saves the description under inputText to be saved to the local storage
  inputText = $(this).siblings(".description").val().trim();
  console.log(inputText);
// each time an event is save this pops a message at the top letting the user know the event was save to local storage
  var checkmark = "\u2713";
  var timeText = $(this).siblings('.hour').text();
  localStorageAlert.text(timeText + ' Apppointment added to localStorage' + checkmark); 
  saveEventsToStorage();
}
// this function uses JSON to save the objects to localStorage in string format then calls the readEventsFromStorage function
function saveEventsToStorage() {
  localStorage.setItem(timeBlock, JSON.stringify(inputText));
  readEventsFromStorage();
}
// This function then reads the events from storage using the unique ID's to assign each ones Unique description
function readEventsFromStorage() {
  var hours = ["hour-9", "hour-10", "hour-11", "hour-12", "hour-13", "hour-14", "hour-15", "hour-16", "hour-17"];
  // goes over each hour finding the unique id for each schedule block and either assigns the object from local storage and leaves it blank
  hours.forEach(function(hour) {
    var readEvent = JSON.parse(localStorage.getItem(hour));
    $('#' + hour).children('.description').val(readEvent || '');
  });
}
// calls the handleEventSubmit function when the save button is clicked
saveBtn.click(handleEventSubmit);

// calls the functions to display the time and check the schedule blocks to assign classes while refreshing every second
displayTime();
checkTime();
setInterval(displayTime, 1000);
// reads events from storage 
readEventsFromStorage();

});
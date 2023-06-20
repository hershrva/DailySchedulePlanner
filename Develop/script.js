var timeDisplayEl = $('#currentDay');
var timeBlockEl = $('.time-block');
var saveBtn = $('.saveBtn')

function displayTime() {
  var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(rightNow);
}
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

function checkTime() {
  timeBlockEl.each(function () {
    var currentHour = parseInt(dayjs().format('H'));
    var timeBlock = parseInt($(this).attr('id').split('hour-')[1]);
    console.log(timeBlock);

    var descriptionEl = $(this).find('.description');

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

function handleEventSubmit(event) {
  event.preventDefault();
  console.log("handle ", event.target.parent.getAttribute('id'));

  var timeBlock =  $(this).parent().getAttribute('id');
  console.log(timeBlock);
  var inputText = $(this).siblings(".description").val();
  console.log(inputText);

  var newEvent = {
      time: timeBlock,
      event: inputText,
  };

  var events = readEventsFromStorage();
  events.push(newEvent);
  console.log('here is events: ', events);
  saveEventsToStorage(events);

  printEventData();
}



saveBtn.addEventListener("click", handleEventSubmit);

displayTime();
checkTime();
setInterval(displayTime, 1000);

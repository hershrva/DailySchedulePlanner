var timeDisplayEl = $('#currentDay');
var timeBlockEl = $('.time-block');
var saveBtn = $('.saveBtn')
var events = [];
var localStorageAlert = $('.local-storage-alert')

$(document).ready(function () {

function displayTime() {
  var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(rightNow);
}

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

var timeBlock;
var inputText;

function handleEventSubmit(event) {
  event.preventDefault();
  console.log("handle ", $(this).parent().attr('id'));

  timeBlock = $(this).parent().attr('id');
  console.log(timeBlock);
  inputText = $(this).siblings(".description").val();
  console.log(inputText);

  var checkmark = "\u2713";
  var timeText = $(this).siblings('.hour').text();
  localStorageAlert.text(timeText + ' Apppointment added to localStorage' + checkmark); 
  saveEventsToStorage();
}

function saveEventsToStorage() {
  localStorage.setItem(timeBlock, JSON.stringify(inputText));
  readEventsFromStorage();
}

function readEventsFromStorage() {
  var hours = ["hour-8", "hour-9", "hour-10", "hour-11", "hour-12", "hour-13", "hour-14", "hour-15", "hour-16", "hour-17"];
  
  hours.forEach(function(hour) {
    var readEvent = JSON.parse(localStorage.getItem(hour));
    $('#' + hour).children('.description').val(readEvent || '');
  });
}

saveBtn.click(handleEventSubmit);

displayTime();
checkTime();
setInterval(displayTime, 1000);

readEventsFromStorage();

});
// display current date 
var CurrentDay = moment().format();

// local storage for text input
function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
}
// function for currentday
$(document).ready(function () {
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
    console.log('current time hour', moment().hours());
    var currentHour = moment().hours();
    for (let i = 9; i < 18; i++) {
        // row
        var row = $(`<div data-time=${i} id='${i}' class="row time-block"></div>`);

        // column
        var c1 = $('<div class="col-sm-2 hour">' + i + 'AM' + '</div>');

        if (i > 12) {
            var newDisplay = i - 12;
            newDisplay += 'PM';
            c1.text(newDisplay);
        }

        row.append(c1);

        // column 2
        var c2 = $(`<textarea id=text${i} class="description col-sm-8" ></textarea>`);
        if (i == currentHour) {
            c2.addClass("present");
        } else if (currentHour > i) {
            c2.addClass("past");
        } else if (currentHour < i) {
            c2.addClass("future")
        }
        row.append(c2);

        // column 3
        var c3 = $(`<button id=${i}  class="saveBtn col-sm-2 fas fa-save"></button>`);

       row.append(c3);

        // last step add rows to container
        $(".container").append(row);

        getLocalStorage(i);
    }

    //create save button
    var saveBtn = $('.saveBtn');
    saveBtn.on('click', function () {
        let eventId = $(this).attr('id');
        let eventText = $(this).siblings('.description').val();
        console.log('Saving ' + eventText + ' to local storage at ' + eventId);
        localStorage.setItem(eventId, eventText);
    });

});
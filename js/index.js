let calendar = null;

var DateTime = luxon.DateTime;
var serverZone = 'Europe/Berlin';

function dataToEvents(data) {
    var events = data.items.map(function(item){
        var start = DateTime.fromISO(item.start.date);
        var end = DateTime.fromISO(item.end.date);
        // End date of all-day events is exclusive, so we need to substract 1 day
        end = end.plus({ days: -1 }).startOf('day');

        var event = {
            id: item.id,
            name: item.summary,
            description: item.description || "",
            startDate: start.toJSDate(),
            endDate: end.toJSDate(),
            link: item.htmlLink,
            background: mainEventBgColor(item.summary),
            textColor: mainEventTextColor(item.summary),
        };
        return event;
    });
    return events
}

function createCalendar(options, data) {
    var minDate = DateTime.now().startOf('month').toJSDate();

    calendar = new Calendar('#calendar', {
        weekStart: 1,
        enableContextMenu: true,
        enableRangeSelection: false,
        minDate: minDate,
        hideOtherMonths: true,
        //style: 'background',
        style: 'custom',
        dataSource: function (year) {
            var calendarURL = `https://www.googleapis.com/calendar/v3/calendars/${options.calendarID}/events?key=${options.apiKey}&singleEvents=true&orderBy=starttime&timeZone=Europe%2FBerlin`;
            // TODO: Only load events for selected year
            return fetch(calendarURL)
                .then(result => result.json())
                .then(result => {
                    if (result.items) {
                        return dataToEvents(result);
                    }
                    return [];
                });
        },
        customDataSourceRenderer: function (elt, currentDate, events) {
            if (!events.length)
                return;
            var mainEvent = events.sort((a, b) => eventOrder(a.name) - eventOrder(b.name))[0];
            var parent = elt.parentElement;
            parent.classList = parent.classList + " event " + eventClass(mainEvent.name);
            if (DateTime.fromJSDate(currentDate).hasSame(DateTime.local(), "day")) {
                $(parent).addClass("today");
            }
        },
        clickDay: function(e) {
            if (e.events.length > 0) {
                window.location = `month.html?m=${e.date.getMonth()}&y=${e.date.getFullYear()}`;
            }
        },
        mouseOnDay: function(e) {
            if (e.element._tippy != null) { 
                return;
            }
            if(e.events.length > 0) {
                var content = '';    
                for(var i in e.events) {
                    content += `<div class="event-tooltip ${eventClass(e.events[i].name)}">` +
                                    `<div class="event-name">${e.events[i].name}</div>` +
                                    `<div class="event-description">${e.events[i].description || ""}</div>` +
                                `</div>`;
                }
                var tip = tippy(e.element, {
                    content: content,
                    allowHTML: true,
                    theme: 'light'
                });
                tip.show();
            }
        }
    });
}

$(function() {
    var options = {
        apiKey: 'AIzaSyBEL8Q9b9yAr1A2NnNGoy8frk8AfKgb1Rc',
        calendarID: 'sfeventcal@gmail.com'
    }
    createCalendar(options, null);
});

let calendar = null;

// parseDateStr expects a date in format "yyyy-mm-dd", in Europe/Berlin timezone (+01:00)
function parseDateStr(dateStr) {
    if (dateStr) {
        dateStr += 'T00:00:00.000';
    }
    if (dateStr) {
        dateStr += '+01:00';
    }
    return new Date(dateStr);
}

function dataToEvents(data) {
    var events = data.items.map(function(item){
        var start = parseDateStr(item.start.date);
        var end = parseDateStr(item.end.date);
        // End date of all-day events is exclusive, so we need to substract 1 day
        end.setDate(end.getDate() - 1);

        var event = {
            id: item.id,
            name: item.summary,
            description: item.description || "",
            startDate: start,
            endDate: end,
            link: item.htmlLink,
            background: mainEventBgColor(item.summary),
            textColor: mainEventTextColor(item.summary),
        };
        return event;
    });
    return events
}

function createCalendar(options, data) {
    calendar = new Calendar('#calendar', {
        weekStart: 1,
        enableContextMenu: true,
        enableRangeSelection: false,
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
            var parent = elt.parentElement;
            events.forEach(ev => {
                if (ev.background) {
                    parent.style.backgroundColor = ev.background;
                    if (ev.textColor) {
                        parent.style.color = ev.textColor;
                    }
                }
            });
        },
        clickDay: function(e) {
            if (e.events.length > 0) {
                window.open(`month.html?m=${e.date.getMonth()}&y=${e.date.getYear()}`, "_self");
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

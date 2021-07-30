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
        displayWeeklySummary: true,
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
        customDataSourceWeeklySummaryRenderer: function (elt, weekStart, weekEnd, events) {
            let orderedEvents = events.sort((a, b) => eventOrder(a.name) - eventOrder(b.name));
            let uniqueEvents = orderedEvents.filter((v,i,a)=>a.findIndex(t=>(eventShortName(t.name) === eventShortName(v.name)))===i);
            uniqueEvents.forEach((e) => {
                let eventEl = document.createElement("div");
                eventEl.className = "event " + eventClass(e.name);
                let textEl = document.createElement("span");
                textEl.textContent = eventShortName(e.name);
                eventEl.appendChild(textEl);
                elt.appendChild(eventEl);
                $(eventEl).data("event", e);
            });
        },
        mouseOnDay: function(e) {
            if ((e.element._tippy != null) || (!e.events.length))
                return;
            let content = '';
            let orderedEvents = e.events.sort((a, b) => eventOrder(a.name) - eventOrder(b.name));
            for(let event of orderedEvents) {
                content +=
                    `<div class="event-tooltip event ${eventClass(event.name)}">` +
                        `<span>${event.name}</span>` +
                    `</div>`;
            }
            let tip = tippy(e.element, {
                content: content,
                allowHTML: true,
                theme: 'dark'
            });
            tip.show();
        },
        renderEnd: function(currentYear) {
            $("div.event").mouseenter(function(e) {
                if (this._mouseDown)
                {
                    return;
                }
                let element = e.currentTarget;
                if (element._tippy != null) {
                    return;
                }
                let event = $(element).data("event");
                if(!event) {
                    return;
                }
                let content =
                    `<div class="event-tooltip event ${eventClass(event.name)}">` +
                        `<span>${event.name}</span>` +
                    `</div>
                    <div>
                        <div class="event-description">${event.description || ""}</div>
                    </div>
                    `;
                var tip = tippy(element, {
                    content: content,
                    allowHTML: true,
                    theme: eventClass(event.name) || "dark"
                });
                tip.show();
            });
            $("div.event").click(function(e) {
                let element = e.currentTarget;
                let event = $(element).data("event");
                if (!(event?.link)) {
                    return;
                }
                window.open(event.link, 'google-calendar-event', 'width=700,height=600');
                e.preventDefault();
            });
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

function initMonthCalendar() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      showNonCurrentDates: true,
      fixedWeekCount: true,
      firstDay: 1,
      contentHeight: "auto",
      handleWindowResize: true,
      stickyHeaderDates: false,
      eventOrder: (e1, e2) => {
          var a = eventOrder(e1.title);
          var b = eventOrder(e2.title);
          return a > b ? 1 : a < b ? -1 : 0;
      },

      customButtons: {
        yearViewButton: {
          text: 'year',
          click: function () {
            location.href = "index.html";
          }
        }
      },

      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'yearViewButton,dayGridMonth,listYear'
      },

      displayEventTime: false,

      googleCalendarApiKey: 'AIzaSyBEL8Q9b9yAr1A2NnNGoy8frk8AfKgb1Rc',
      events: {
        googleCalendarId: 'sfeventcal@gmail.com'
      },

      eventDidMount: function(info) {
        tippy(info.el, {
          content:
            `<div class="event-tooltip ${eventClass(info.event.title)}">` +
              `<div class="event-name">${info.event.title}</div>` +
              `<div class="event-description">${info.event.extendedProps.description || ""}</div>` +
            `</div>`,
          allowHTML: true,
          theme:'light'
        });
      },

      eventClassNames: function (arg) {
        return eventClass(arg.event.title);
      },

      eventClick: function(arg) {
        window.open(arg.event.url, 'google-calendar-event', 'width=700,height=600');

        arg.jsEvent.preventDefault() // don't navigate in main tab
      },

      loading: function(bool) {
        document.getElementById('loading').style.display =
          bool ? 'block' : 'none';
      }

    });

    calendar.render();
}
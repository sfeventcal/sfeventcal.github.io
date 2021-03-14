
function applyFilter(el) {
  var shouldShow = true;
  var clsArr = el.className.split(" ");
  for (var i = 0; i < clsArr.length; i++) {
    var cls = $.trim(clsArr[i]);
    if (!cls || cls.toLowerCase().startsWith("fc-")) {
      continue;
    }
    var filter = $(".st-panel-contents ." + cls);
    if (filter.length == 0) {
      continue;
    }
    if (filter.prop("checked")) {
      shouldShow = true;
    } else {
      shouldShow = false;
      break;
    }
  }
  $(el).parent().css('opacity', (shouldShow) ? '1' : '0');
}

function initMonthCalendar() {
    var calendarEl = document.getElementById('calendar');

    var urlParams = new URLSearchParams(window.location.search);
    var defMonth = urlParams.get('m');
    var defYear = urlParams.get('y');
    var defDate = new Date(defYear, defMonth, 1);
    defDate = (defDate instanceof Date && !isNaN(defDate)) ? defDate : null;

    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      initialDate: defDate,
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
        left: 'prev,title,next',
        right: ''
      },

      displayEventTime: false,

      googleCalendarApiKey: 'AIzaSyBEL8Q9b9yAr1A2NnNGoy8frk8AfKgb1Rc',
      events: {
        googleCalendarId: 'sfeventcal@gmail.com'
      },

      eventDidMount: function(info) {
        applyFilter(info.el);

        var classNames = eventClass(info.event.title);
        tippy(info.el, {
          content:
            `<div class="event-tooltip ${classNames}">` +
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

function initFilter() {
  $('st-actionContainer').launchBtn( { openDuration: 500, closeDuration: 300 } );

  $(".st-panel-contents").on("click", "input[type='checkbox']", function(){

    $("a.fc-event").each(function(){
      applyFilter(this);
    });
  });

  $("#flt-all").click(function() {
    $(".st-panel-contents input[type='checkbox']").each(function(){
      $(this).prop('checked', true);
    });
    $("a.fc-event").each(function(){
      applyFilter(this);
    });
  });
}

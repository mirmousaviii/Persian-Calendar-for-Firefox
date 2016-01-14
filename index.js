//Include APIs
var self = require("sdk/self");
var panels = require("sdk/panel");
var toggleButtons = require('sdk/ui/button/toggle').ToggleButton;
var sidebars = require("sdk/ui/sidebar");
var timers = require("sdk/timers");

//Create panel
var panel = panels.Panel({
    width: 280,
    height: 380,
    contentURL: self.data.url("calendar.html"),
    onHide: panelsHandleHide
});

//Create button
var button = toggleButtons({
    id: "btn-sidebar",
    label: '-',
    icon: {
        "16": "./icon/icon-16.png",
        "32": "./icon/icon-32.png",
        "64": "./icon/icon-64.png"
    },
    badge: 0,
    badgeColor: '#00AAAA',
    onChange: buttonHandleChange
});

//Create sidebar
var sidebar = sidebars.Sidebar({
    id: 'sidebar',
    title: 'Persian Calendar',
    url: './calendar.html'
});


//Button handle change for show calendar in panel
function buttonHandleChange(state) {
    if (state.checked) {
        panel.show({
            position: button
        });
    }
}

//Panels handle hide unchecked button
function panelsHandleHide() {
    button.state('window', {checked: false});
}


//Call refreshButton every 3 minutes
timers.setInterval(refreshButton, 180000);


//Refresh Button with badge and label
function refreshButton() {
    var now = new Date();
    var day = now.toLocaleDateString("fa-IR", {day: 'numeric'});
    var fullDate = now.toLocaleDateString("fa-IR", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
    // Substring 'Hegri' title'
    fullDate = fullDate.substring(0, fullDate.length - 6);

    button.badge = day;
    button.label = fullDate;
}

//Refresh Button after load (First refresh)
refreshButton();




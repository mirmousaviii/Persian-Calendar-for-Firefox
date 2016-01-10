//Include High-Level APIs
var buttons = require('sdk/ui/button/action');
var sidebars = require("sdk/ui/sidebar");
var timers = require("sdk/timers");

//Create button
var button = buttons.ActionButton({
    id: "btn-sidebar",
    label: '-',
    icon: {
        "16": "./icon/icon-16.png",
        "32": "./icon/icon-32.png",
        "64": "./icon/icon-64.png"
    },
    badge: 0,
    badgeColor: '#00AAAA',

    onClick: handleClick
});

//Create sidebar
var sidebar = sidebars.Sidebar({
    id: 'sidebar',
    title: 'Persian Calendar',
    url: './sidebar.html'
});

//Handle click for button
function handleClick(state) {
    sidebar.show();
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
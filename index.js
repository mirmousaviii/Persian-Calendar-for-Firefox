var buttons = require('sdk/ui/button/action');
var now = new Date();


var badgeColor = '#00AAAA';
var day = now.toLocaleDateString("fa-IR", {day: 'numeric'});
var fullDate = now.toLocaleDateString("fa-IR", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
// Substring 'Hegri' title'
fullDate = fullDate.substring(0, fullDate.length - 6).toString();


var button = buttons.ActionButton({
    id: "mozilla-link",
    label: fullDate,
    icon: {
        "16": "./icon/icon-16.png",
        "32": "./icon/icon-32.png",
        "64": "./icon/icon-64.png"
    },
    badge: day,
    badgeColor: badgeColor,

    onClick: handleClick
});

function handleClick(state) {
    //TODO: Coming soon...
}
# Persian-Calendar-for-Firefox
Firefox Extension for Shows Persian date (Jalali Caledar)

## Installation
The addon is available on the [Mozilla Addons library](https://addons.mozilla.org/en-US/firefox/addon/persian-calendar/).

## How to contribute
In order to work on this project, you're going to need a few things:
 - [jpm](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Getting_Started_%28jpm%29), the build system for Firefox extensions
 - [Extension Auto-Installer](https://palant.de/2012/01/13/extension-auto-installer). Not neccecary, but highly reccomended

Once these formalities are in order, you can start developing.

If you use the Extension Auto-Installer, clone this project and run `jpm watchpost --post-url http://localhost:8888` in the root folder.
The extension will then be reinstalled every time you save a file, without you having to do a thing.

If you don't use Extension Auto-Installer, you need to do what the extension does for you manually every time you save.
That is, `jpm run -b <Path to your firefox binary> -p <Path to your firefox profile>`.

Please develop on the next branch.
This makes it easier for me to merge and prepare releases in the future.
Thanks for the interest!

## Acknowledgment
Reza Babakhani: https://github.com/babakhani/pwt.datepicker

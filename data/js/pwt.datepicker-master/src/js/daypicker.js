'use strict';
/**
 * @desc Instantiate in {@link ClassDatepicker}
 * @class ClassDayPicker
 * @type {{next: next, prev: prev, updateView: updateView, _updateView: _updateView, selectDay: selectDay, _updateNavigator: _updateNavigator, hide: hide, show: show, _updateSelectedDay: _updateSelectedDay, _render: _render, init: init}}
 */
var ClassDayPicker = {
    /**
     * @desc next
     * @desc Go to next Month-day view
     * @public
     * @returns {ClassDaypicker}
     */
    next: function () {
        var self = this;
        if (self.datepicker.state.view.month === 12) {
            self.datepicker.state.setView('month', 1);
            self.datepicker.state.setView('year', parseInt(self.datepicker.state.view.year) + 1);
        } else {
            self.datepicker.state.setView('month', parseInt(self.datepicker.state.view.month) + 1);
        }
        self._updateView();
        return this;
    },


    /**
     * @desc prev
     * @desc Go to previews Month-day view
     * @public
     * @returns {ClassDaypicker}
     */
    prev: function () {
        var self = this;
        if (self.datepicker.state.view.month === 1) {
            self.datepicker.state.setView('month', 12);
            self.datepicker.state.setView('year', parseInt(self.datepicker.state.view.year) - 1);
        } else {
            self.datepicker.state.setView('month', parseInt(self.datepicker.state.view.month) - 1);
        }
        self._updateView();
        return this;
    },


    /**
     * @desc updateView
     * @public
     * @returns {ClassDaypicker}
     */
    updateView: function () {
        this._updateView();
        return this;
    },


    /**
     * @desc _updateView
     * @returns {ClassDaypicker}
     * @private
     */
    _updateView: function () {
        var self = this;
        self.mGrid.updateAs(self.datepicker.state.view.year, self.datepicker.state.view.month);
        self._updateNavigator(self.datepicker.state.view.year, self.datepicker.state.view.month);
        this._updateSelectedDay(self.datepicker.state.selected.unixDate);
        return this;
    },


    /**
     * @desc selectDay
     * @public
     * @returns {ClassDaypicker}
     */
    selectDay: function () {
        var self = this;
        self.mGrid.updateAs(self.datepicker.state.selected.year, self.datepicker.state.selected.month);
        self._updateNavigator(self.datepicker.state.selected.year, self.datepicker.state.selected.month);
        this._updateSelectedDay(self.datepicker.state.selected.unixDate);
        this._updateView();
        return this;
    },


    /**
     * @desc _updateNavigator
     * @param year
     * @param month
     * @private
     */
    _updateNavigator: function (year, month) {
        var self = this;
        var pdateStr = this.titleFormatter(year, month);

        self.datepicker.updateNavigator(pdateStr);
        return this;
    },


    /**
     * @desc hide
     * @public
     * @returns {ClassDaypicker}
     */
    hide: function () {
        this.container.hide();
        return this;
    },


    /**
     * @desc show
     * @public
     * @returns {ClassDaypicker}
     */
    show: function () {
        this.container.show();
        this._updateView();
        return this;
    },


    /**
     * @desc _updateSelectedDay
     * @param unix
     * @returns {ClassDaypicker}
     * @private
     */
    _updateSelectedDay: function (unix) {
        this.mGrid.markSelectedDate(unix);
        return this;
    },

    /**
     * @desc _attachEvents
     * @private
     */
    _attachEvents: function () {
        var self = this;
        if (this.scrollEnabled) {
            $(this.container).mousewheel(function (event) {

                if (event.deltaY > 0) {
                    self.next();
                } else {
                    self.prev();
                }

            });
            $(this.container).bind('mousewheel DOMMouseScroll', function (e) {
                var scrollTo = null;

                if (e.type == 'mousewheel') {
                    scrollTo = (e.originalEvent.wheelDelta * -1);
                }
                else if (e.type == 'DOMMouseScroll') {
                    scrollTo = 40 * e.originalEvent.detail;
                }
                if (scrollTo) {
                    e.preventDefault();
                    $(this).scrollTop(scrollTo + $(this).scrollTop());
                }
            });
        }
        return this;
    },


    /**
     * @desc _render
     * @private
     */
    _render: function () {
        var self = this;
        this.mGrid = new MonthGrid({
            container: self.container,
            persianDigit: self.datepicker.persianDigit,
            month: self.datepicker.state.selected.month,
            year: self.datepicker.state.selected.year,
            minDate: self.datepicker.state.filterDate.start.unixDate,
            maxDate: self.datepicker.state.filterDate.end.unixDate,
            datepicker: self.datepicker
        });
        this.mGrid.attachEvent("selectDay", function (x) {
            self.datepicker.selectDate( x);
            self.onSelect(x);
            self.mGrid.selectDate(self.datepicker.state.selected.unixDate);
        });
        this._updateSelectedDay(self.datepicker.state.selected.unixDate);
    },


    /**
     * @desc init
     * @private
     * @returns {Class_Daypicker}
     */
    init: function () {
        var self = this;
        this._render()
        this._attachEvents();
        this._updateNavigator(self.datepicker.state.selected.year, self.datepicker.state.selected.month);
        return this;
    }
};
var Daypicker = function (options, container) {
    return inherit(this, [ClassSprite, ClassDayPicker, options, {
        container: container
    }]);
};

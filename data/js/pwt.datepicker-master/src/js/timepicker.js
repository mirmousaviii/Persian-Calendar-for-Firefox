'use strict';
/**
 * @desc Instantiate in {@link ClassDatepicker}
 * @class ClassTimePicker
 * @type {{showSeconds: boolean, showMeridian: boolean, minuteStep: number, cssClss: {timepicker: string}, show: show, hide: hide, _render: _render, _currentMeridian: null, convert24hTo12: convert24hTo12, convert12hTo24: convert12hTo24, _updateTime: _updateTime, _updateMeridian: _updateMeridian, _toggleMeridian: _toggleMeridian, _movehour: _movehour, _moveminute: _moveminute, _movesecond: _movesecond, _movemeridian: _movemeridian, _updateState: _updateState, _attachEvent: _attachEvent, _bootstrap: _bootstrap, init: init}}
 */
var ClassTimePicker = {
    /**
     * @property secondStep
     */
    secondStep: 1,


    /**
     * @property minuteStep
     */
    minuteStep: 1,

    /**
     * @property hourStep
     */
    hourStep: 1,

    /**
     * @property cssClass
     */
    cssClss: {
        timepicker: "viewModel"
    },


    /**
     * @property show
     * @returns {Class_Timepicker}
     */
    show: function () {
        'use strict';
        this.container.show();
        return this;
    },


    /**
     * @property hide
     * @returns {Class_Timepicker}
     */
    hide: function () {
        'use strict';
        this.container.hide();
        return this;
    },


    /**
     * @property _render
     * @returns {Class_Timepicker}
     * @private
     */
    _render: function () {
        var self = this;
        var viewModel = {
            css: self.cssClass
        };
        $.tmplMustache(TEMPLATE.timepicker, viewModel).appendTo(this.container);
        return this;
    },


    /**
     *  @property _currentMeridian
     */
    _currentMeridian: null,


    /**
     * @property convert24hTo12
     * @param hour
     */
    convert24hTo12: function (hour) {
        var output = hour, meridian = 'AM';
        if (hour >= 12) {
            output = hour - 12;
            meridian = "PM";
        }
        if (hour === 0) {
            output = 12;
        }
        return [output, meridian];
    },


    /**
     * @property convert12hTo24
     * @param hour
     * @returns {*}
     */
    convert12hTo24: function (hour) {
        var output = hour;
        if (this._currentMeridian === "PM" && hour < 12) {
            output = hour + 12;
        }
        if (this._currentMeridian === "AM" && hour === 12) {
            output = hour - 12;
        }
        return output;
    },


    /**
     * @property _updateTime
     * @param state
     * @returns {Class_Timepicker}
     * @private
     */
    _updateTime: function (state) {
        var timeStateObject = state.selected;
        var hourArray = this.convert24hTo12(timeStateObject['hour']);
        this.hourInput.val(timeStateObject['hour']);
        this.minuteInput.val(timeStateObject['minute']);
        this.secondInput.val(timeStateObject['second']);
        this.meridianInput.val(timeStateObject.dateObj.format('a'))
        this._currentMeridian = hourArray[1];
        this.meridianInput.attr({'data-meridian-mode': this._currentMeridian});
        return this;
    },


    /**
     * @property _updateMeridian
     * @param state
     * @returns {Class_Timepicker}
     * @private
     */
    _updateMeridian: function (state) {
        var timeStateObject = state.selected;
        this.meridianInput.val(timeStateObject.dateObj.format('a'))
        return this;
    },


    /**
     *
     * @returns {Class_Timepicker}
     * @private
     */
    _toggleMeridian: function () {
        if (this._currentMeridian === 'AM') {
            this._currentMeridian = 'PM';
            this.meridianInput.val('PM');
        } else if (this._currentMeridian === 'PM') {
            this._currentMeridian = 'AM';
            this.meridianInput.val('AM');
        }
        return this;
    },


    /**
     *
     * @param mode
     * @returns {Class_Timepicker}
     * @private
     */
    _movehour: function (mode) {
        var currentVal = parseInt(this.hourInput.val());
        if (mode === 'up') {
            if (currentVal >= 12) {
                currentVal = this.hourStep;
            } else {
                currentVal += this.hourStep;
            }
        } else {
            if (currentVal <= 1) {
                currentVal = 12;
            } else {
                currentVal -= this.hourStep;
            }
        }
        this.hourInput.val(currentVal);
        this._updateState('hour', this.convert12hTo24(currentVal));
        return this;
    },


    /**
     *
     * @param mode
     * @returns {Class_Timepicker}
     * @private
     */
    _moveminute: function (mode) {
        var currentVal = parseInt(this.minuteInput.val());
        if (mode === 'up') {
            if (currentVal === 59) {
                currentVal = 0;
            } else {
                currentVal += this.minuteStep;
            }
        } else {
            if (currentVal === 0) {
                currentVal = 59;
            } else {
                currentVal -= this.minuteStep;
            }
        }
        this.minuteInput.val(currentVal);
        this._updateState('minute', currentVal);
        return this;
    },


    /**
     *
     * @param mode
     * @returns {Class_Timepicker}
     * @private
     */
    _movesecond: function (mode) {
        var currentVal = parseInt(this.secondInput.val());
        if (mode === 'up') {
            if (currentVal === 59) {
                currentVal = 0;
            } else {
                currentVal += this.secondStep;
            }
        } else {
            if (currentVal === 0) {
                currentVal = 59;
            } else {
                currentVal -= this.secondStep;
            }
        }
        this.secondInput.val(currentVal);
        this._updateState('second', currentVal);
        return this;
    },


    /**
     *
     * @returns {Class_Timepicker}
     * @private
     */
    _movemeridian: function () {
        this._toggleMeridian();
        this._updateState('hour', this.convert12hTo24(parseInt(this.hourInput.val())));
        return this;
    },


    /**
     *
     * @param key
     * @param val
     * @returns {Class_Timepicker}
     * @private
     */
    _updateState: function (key, val) {
        this.datepicker.selectTime(key, val);
        this._updateMeridian(this.datepicker.state);
        return this;
    },


    /**
     *
     * @returns {Class_Timepicker}
     * @private
     */
    _attachEvent: function () {
        var self = this;
        $('.up-btn', this.container).click(function () {
            self['_move' + $(this).parent().attr('data-time-key')]('up');
            return false;
        });
        $('.down-btn', this.container).click(function () {
            self['_move' + $(this).parent().attr('data-time-key')]('down');
            return false;
        });
        if (this.scrollEnabled) {
            $('> div.time-segment', this.container).mousewheel(function (event) {
                var moveMode = 'down';
                if (event.deltaY > 0) {
                    moveMode = 'up';
                }
                self['_move' + $(this).attr('data-time-key')](moveMode);
            });
            $('> div.time-segment', this.container).bind('mousewheel DOMMouseScroll', function (e) {
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
     *
     * @returns {Class_Timepicker}
     * @private
     */
    _bootstrap: function () {
        if (this.showMeridian === false) {
            $('.meridian', this.container).hide();
            $('.meridian-divider', this.container).hide();
            $('.time-segment', this.container).css({
                width: '31%'
            });

        }
        if (this.showSeconds === false) {
            $('.second', this.container).hide();
            $('.second-divider', this.container).hide();
            $('.time-segment', this.container).css({
                width: '31%'
            });
        }
        if (this.showMeridian === false && this.showSeconds === false) {
            $('.time-segment', this.container).css({
                width: '47%'
            });
        }
        this.hourInput = $('.hour-input', this.container);
        this.minuteInput = $('.minute-input', this.container);
        this.secondInput = $('.second-input', this.container);
        this.meridianInput = $('.meridian-input', this.container);
        this._updateTime(this.datepicker.state);
        return this;
    },

    /**
     *
     * @param unix
     */
    setTime:function(unix){
        var pd = new persianDate(unix);
        this._updateState('hour', pd.hour());
        this._updateState('minute', pd.minute());
        this._updateState('second', pd.second());
        this.minuteInput.val(pd.minute());
        this.secondInput.val(pd.second());
        this.hourInput.val(pd.hour());
    },


    /**
     *
     * @returns {Class_Timepicker}
     */
    init: function () {
        this._render()._bootstrap()._attachEvent();

        return this;
    }
};
var TimePicker = function (options, container) {
    return inherit(this, [ClassSprite, ClassTimePicker, options, {
        container: container
    }]);
};

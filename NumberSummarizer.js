//------------------------
//-- Defining the event --
//------------------------
// Manages EventHandlers of type T
var EventManager = /** @class */ (function () {
    function EventManager() {
        var _this = this;
        // subscribe function
        this.Add = function (fnc) { _this.handlers.push(fnc); };
        // execute functions that had been subscribed
        this.Exec = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            for (var _a = 0, _b = _this.handlers; _a < _b.length; _a++) {
                var fnc = _b[_a];
                fnc.call.apply(fnc, [_this].concat(args));
            }
        };
        this.handlers = new Array();
    }
    return EventManager;
}());
//-----------------------------------
//-- Use the Event in Custom Class --
//-----------------------------------
// NumberSummarizer class will summarize all of the rows 
// in the NumberRows array and call the evenhandlers' functions
var NumberSummarizer = /** @class */ (function () {
    function NumberSummarizer() {
        var _this = this;
        // checks if the row is valid and adds a summarizable row to the NumberRows array if ok
        this.AddNumberRow = function (row) {
            var splitted = row.split('+');
            if (splitted.length !== 2 || isNaN(splitted[0]) || isNaN(splitted[1]))
                return;
            _this.NumberRows.push(row);
        };
        // executes the sum operation in all of the rows
        this.SummarizeRows = function () {
            for (var _i = 0, _a = _this.NumberRows; _i < _a.length; _i++) {
                var numRow = _a[_i];
                var result = Number(eval(numRow));
                // call the event handler if true
                if (result % 2 === 0)
                    _this.EvenHandlers.Exec(result); // this will call all of the functions that has been subscribed
            }
        };
        // inits
        this.NumberRows = new Array();
        this.EvenHandlers = new EventManager();
    }
    return NumberSummarizer;
}());
//-------------------------
//-- Program starts here --
//-------------------------
var NumberAdder = new NumberSummarizer();
// the numbers to summarize
NumberAdder.AddNumberRow('3+5');
NumberAdder.AddNumberRow('5+5');
NumberAdder.AddNumberRow('6+5');
NumberAdder.AddNumberRow('7+5');
// handler functions
var HandleEventConsoleLogChristmas = function (num) {
    console.log("The number(" + num + ") is even! sooooo let it snow let it snow let it snow");
};
var HandleEventConsoleLogNewYear = function (num) {
    console.log("The number(" + num + ") is even! sooooo happy new year!");
};
// subscribe to handler functions
NumberAdder.EvenHandlers.Add(HandleEventConsoleLogChristmas);
NumberAdder.EvenHandlers.Add(HandleEventConsoleLogNewYear);
NumberAdder.SummarizeRows();

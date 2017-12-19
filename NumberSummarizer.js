//------------------------
//-- Defining the event --
//------------------------
var EvenHandler = /** @class */ (function () {
    function EvenHandler() {
        var _this = this;
        // subscribe function
        this.Add = function (fnc) { _this.handlers.push(fnc); };
        // execute functions that had been subscribed
        this.Exec = function (num) {
            for (var _i = 0, _a = _this.handlers; _i < _a.length; _i++) {
                var fnc = _a[_i];
                fnc.call(_this, num);
            }
        };
        this.handlers = new Array();
    }
    return EvenHandler;
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
        this.EvenHandlers = new EvenHandler();
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

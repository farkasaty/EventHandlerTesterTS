//------------------------
//-- Defining the event --
//------------------------

interface EvenResultEvent{ (num: number): void; }
class EvenHandler{
    private handlers: Array<EvenResultEvent>;

    constructor(){ this.handlers = new Array<EvenResultEvent>(); }

    // subscribe function
    Add = (fnc: EvenResultEvent) => { this.handlers.push(fnc) };
    // execute functions that had been subscribed
    Exec = (num: number): void => {
        for (const fnc of this.handlers) {
            fnc.call(this, num);
        }
    }
}

//-----------------------------------
//-- Use the Event in Custom Class --
//-----------------------------------

// NumberSummarizer class will summarize all of the rows 
// in the NumberRows array and call the evenhandlers' functions
class NumberSummarizer{
    private NumberRows: Array<string>;  // numbers to add
    public EvenHandlers: EvenHandler;   // event handlers will be placed here

    constructor(){
        // inits
        this.NumberRows = new Array<string>();
        this.EvenHandlers = new EvenHandler();
    }

    // checks if the row is valid and adds a summarizable row to the NumberRows array if ok
    AddNumberRow = (row: string): void => {
        let splitted = row.split('+');
        
        if(splitted.length !== 2 || isNaN(splitted[0] as any) || isNaN(splitted[1] as any))
            return;
            
        this.NumberRows.push(row);
    }
    
    // executes the sum operation in all of the rows
    SummarizeRows = ():void => {
        for (const numRow of this.NumberRows) {
            
            let result: number = Number(eval(numRow));
            
            // call the event handler if true
            if (result % 2 === 0)  
                this.EvenHandlers.Exec(result); // this will call all of the functions that has been subscribed
        }
    }
}

//-------------------------
//-- Program starts here --
//-------------------------

let NumberAdder = new NumberSummarizer();

// the numbers to summarize
NumberAdder.AddNumberRow('3+5');
NumberAdder.AddNumberRow('5+5');
NumberAdder.AddNumberRow('6+5');
NumberAdder.AddNumberRow('7+5');

// handler functions
let HandleEventConsoleLogChristmas: EvenResultEvent = function(num: number){
    console.log(`The number(${num}) is even! sooooo let it snow let it snow let it snow`);
}
let HandleEventConsoleLogNewYear: EvenResultEvent = function(num: number){
    console.log(`The number(${num}) is even! sooooo happy new year!`);
}

// subscribe to handler functions
NumberAdder.EvenHandlers.Add(HandleEventConsoleLogChristmas);
NumberAdder.EvenHandlers.Add(HandleEventConsoleLogNewYear);

NumberAdder.SummarizeRows();
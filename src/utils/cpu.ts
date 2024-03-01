// Taken from https://peterhigginson.co.uk/lmc/help.html
export enum Opcodes {
    HLT,
    ADD,
    SUB,
    STA,
    STO,
    LDA,
    BRA,
    BRZ,
    BRP,
    INP,
    OUT,
    OTC,
    DAT
}

export interface Command {
    opcode: Opcodes | undefined,
    operand: string[] | undefined
}

export interface Tracker {
    [key: string]: number;
}

export type Program =  {
    program: Command[];     // Program elements
    is_running: boolean,
    var_tracker: Tracker;
    pnt_tracker: Tracker;

    memory: number[];       // Memory and registers
    accumulator: number;
    program_counter: number;
    current_instruction_register: number;
    memory_address_register: number;
    memory_data_register: number;

    control_bus: number;
    data_bus: number;
    address_bus: number;
}

export function newProgram(): Program {
    return {
        program: [],
        is_running: true,
        var_tracker: {},
        pnt_tracker: {},
        memory: Array.from({length: 100}, () => 0),
        accumulator: 0,
        program_counter: 0,
        current_instruction_register: 0,
        memory_address_register: 0,
        memory_data_register: 0,
        control_bus: 0,
        data_bus: 0,
        address_bus: 0
    }
}


// Arithmetic

function add(prog: Program, location: number) {
    const value = prog.memory[location] + prog.accumulator;
    prog.accumulator = value;
}

function sub(prog: Program, location: number) {
    const value = prog.accumulator - prog.memory[location]; // NEWCHANGE
    prog.accumulator = value;
}

function assign(prog: Program, name: string, value: number) {
    prog.var_tracker[name as keyof object] = value;
}

function get(prog: Program, name: string) {
    if (prog.var_tracker[name as keyof object]) 
        return prog.var_tracker[name as keyof object];
}

// User Input and Console Output

function input(prog: Program) {
    let value;
    value = window.prompt("Program is asking for input");

    if (value === "EXIT") {
        let sure = window.confirm("You typed the exit command, the program will terminate");

        if (sure) {
            prog.is_running = false;
        } 
    }

    if (value) {
        prog.accumulator = parseInt(value);
    } else {
        prog.accumulator = 0;
    }
}

function output(prog: Program) { // NEWCHANGE
    const value = prog.accumulator;
    console.log(value)
    
    const inp = window.confirm(value.toString());

    if (!inp) {
        const inp2 = window.confirm("You pressed cancel. Do you want to cancel execution?");

        if (inp2) {
            prog.is_running = false;
        }
    }
}

function output_text(prog: Program) { // NEWCHANGE
    const value = prog.accumulator;
    const output = String.fromCharCode(value);

    const inp = window.confirm(output);

    if (!inp) {
        const inp2 = window.confirm("You pressed cancel. Do you want to cancel execution?");

        if (inp2) {
            prog.is_running = false;
        }
    }
}


// Branches

function branch(prog: Program, name: string) {              // CHANGED
    if (name in prog.pnt_tracker) {
        prog.program_counter = prog.pnt_tracker[name];
    }
}

function branchZero(prog: Program, name: string) {          // CHANGED
    const value = prog.accumulator;
    
    if (value === 0 && name in prog.pnt_tracker) {
        prog.program_counter = prog.pnt_tracker[name];
    }
}

function branchPositive(prog: Program, name: string) {          // CHANGED
    if (prog.accumulator >= 0 && name in prog.pnt_tracker) {
        prog.program_counter = prog.pnt_tracker[name];
    }   
}


// Memory

function store(prog: Program, position: number) {
    prog.memory[position] = prog.accumulator;
}

function load(prog: Program, position: number) {
    prog.accumulator = prog.memory[position]; 
}


// Clock
export function fetch(x: Program): Program {
    const prog = x;

    prog.memory_address_register = prog.program_counter;                // 1. Address of the next instruction is copied from the Program Counter to the MAR.
    prog.memory_data_register = prog.memory_address_register;           // 2. The instruction held at the MAR is copied into the MDR. Then the Program Counter increments.
    prog.program_counter++;
    prog.current_instruction_register = prog.memory_address_register;   // 3. The contents of the MAR is then copied into the CIR.

    return prog;
} 

export function decode(x: Program): Command {
    const prog = x;

    // 4. The instruction in the CIR is decoded.
    // 5. The instruction is split into opcodes and operands.
    // 6. prog is then sent to the ALU for execution.
    const instruction = prog.program[prog.current_instruction_register];

    if (instruction === undefined) {
        prog.is_running = false;
    }

    return instruction;
}

export function execute(x: Program, instruction: Command): Program {
    const prog = x;

    if (!prog.is_running) {
        return prog;
    }

    // Execution
    if (instruction.opcode !== undefined && instruction.operand) {
        switch (instruction.opcode) {
            case Opcodes.HLT:
                prog.is_running = false;
                break;

            case Opcodes.ADD:
                add(prog, checkDAT(prog, instruction.operand[0]));
                break;

            case Opcodes.SUB:
                sub(prog, checkDAT(prog, instruction.operand[0]));
                break;

            case Opcodes.STA || Opcodes.STO:
                store(prog, checkDAT(prog, instruction.operand[0]));
                break;
            
            case Opcodes.LDA:
                load(prog, checkDAT(prog, instruction.operand[0]));
                break;

            case Opcodes.BRA:
                branch(prog, instruction.operand[0]);
                break;

            case Opcodes.BRZ:
                branchZero(prog, instruction.operand[0]);
                break;

            case Opcodes.BRP:
                branchPositive(prog, instruction.operand[0]);
                break;

            case Opcodes.INP:
                input(prog);
                break;

            case Opcodes.OUT:
                output(prog);
                break;

            case Opcodes.OTC:   // Not yet implemented
                output_text(prog);
                break;

            case Opcodes.DAT:   // Not yet implemented
                break;
        } 
    } else {
        alert(`Error on line ${prog.program_counter}`);
        prog.is_running = false;
    }
    
    return prog;
}

export function clockCycle(x: Program): Program {
    let prog = x;

    prog = fetch(prog);
    const instruction = decode(prog);
    prog = execute(prog, instruction);

    return prog;
}


function checkDAT(prog: Program, operand: string): number {    // Checks if operand value is in DAT (return value), otherwise convert to int
    const numTest = parseInt(operand);

    if (isNaN(numTest)) {
        return prog.var_tracker[operand];
    } else {
        return numTest;
    }
}

export default Program;
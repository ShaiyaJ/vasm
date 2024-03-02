import type { Program } from "./cpu.ts";
import { Opcodes, newProgram } from "./cpu.ts";

// function isInteger(value: string) {
//     return /^\d+$/.test(value);
// }

// export default function tokenise(program: string): CompiledProgram | CompiledError {
//     let tokens:    Command[] = [];
//     let points:    Tracker[] = [];
//     let variables: Tracker[] = [];

//     let current_token: string = ""; // Whitespace used to denote next token
//     let current_command: Command = {opcode: undefined, operand: []};
    
//     // Loop through each character in the program
//     for (let i = 0; i < program.length; i++) {
//         const char = program.charAt(i);

//         if (char === " ") {                                         // Treat space as a flag that a token has "ended" and needs to be computed
//             switch (current_token) {
//                 // Handling opcodes
//                 case "ADD":
//                     current_command.opcode = Opcodes.ADD;
//                     break;
//                 // yadda yadda yadda

//                 // Otherwise
//                 default:
//                     if (isInteger(current_token)) {                 // If the token is an integer then it must be an operand
//                         current_command.operand?.push(current_token);
//                     } else {                                        // Otherwise, it must be a point to jump to
//                         points.push({current_token: tokens.length-1});
//                     }
//             }
//         } else if (char === "\n" || i === program.length-1) {       // Treat newline as a flag that it's a new command
//             tokens.push(current_command);
//             current_command = {opcode: undefined, operand: []}
//         } else {                                                    // Otherwise push the character to the current token and restart the loop waiting for either " " or "\n"
//             current_token = current_token.concat(char)            
//         }
//     }

//     // for (let i = 0; i < program.length; i++) { // might need another loop to treat \n as a new command line
//     //     const char = program.charAt(i);

//     //     if (char === " " || char === "\n") {          // Processes current_token then clears it
//     //         if (!current_command.opcode) {
//     //             // Check if opcode exists
//     //             switch (current_token) {
//     //                 case "ADD": 
//     //                     current_command.opcode = Opcodes.ADD;
//     //                     break; // etc. and add it to the .opcode
//     //                 default:
//     //                     // Otherwise, it has to be a jump point
//     //                     points.push({current_token: tokens.length});
//     //             }

//     //             console.log(current_command.opcode);

//     //             current_token = ""
//     //         }
            
//     //         // If opcode is full then
//     //         else if (!current_command.operand) { // This isn't running for some reason
//     //             current_command.operand = []

//     //             // Check if valid operand
//     //             if (isInteger(current_token)) {
//     //                 current_command.operand.push(current_token);
//     //                 console.log(current_command.operand);
//     //                 current_token = "";
//     //             } else {
//     //                 return CompiledError.NONEXISTANT_operand
//     //             }
//     //         }

//     //         // Otherwise it's complete
//     //         else {
//     //             tokens.push(current_command);
//     //             current_command = {opcode: undefined, operand: undefined};
//     //             current_token = "";
//     //         }

//     //     } else {  // Otherwise push the character to current_token
//     //         current_token = current_token.concat(char);
//     //     }
//     // }

//     return {tokens, points, variables};
// }

export default function tokenise(program: string): Program | number {
    let final_program: Program = newProgram();
    let error: number = 0;
    let assign_loc: number = 99;  // Next DAT store

    const lines = program.split("\n");
    
    lines.forEach((line, idx) => {
        let formattedLine = line.replace(/\/\/.*/gm, ""); // NEWCHANGE (changes)
        formattedLine = formattedLine.replace("\t", " ");        // Tabs to single spaces
        formattedLine = formattedLine.replace(/\s+/g, " ")       // Multispaces to single spaces
        formattedLine = formattedLine.replace(/^ +/gm, "");      // Leading whitespace removal

        const parts = formattedLine.trim().split(" ");

        console.log(idx, formattedLine);

        if (formattedLine == "") {
            return;       // Line is empty
        }

        let temp_opcode: string;
        let opcode: Opcodes;
        let operand: string[] = [];

        // Handling points
        // if (parts.length === 3) {   // 3 parts means <flag for point>, <flag for opcode>, <flag for operand> - so I handle the point here
        //     //points.push({parts[0]: tokens.length});
        //     temp_opcode = parts[1];
        //     if (parts[2]) {operand = parts.slice(2)}
            
        // } else {                    // Otherwise it must be just a command with no point flag
        //     temp_opcode = parts[0];
        //     if (parts[1]) {operand = parts.slice(1)}
        // }

        if (["HLT", "ADD", "SUB", "STA", "STO", "LDA", "BRA", "BRZ", "BRP", "INP", "OUT", "OTC", "DAT"].includes(parts[0].toUpperCase())) { // NEWCHANGE (lowercase)
            temp_opcode = parts[0].toUpperCase();
            if (parts[1]) {operand = parts.slice(1)}
        } else {                                    // Otherwise it has opcode second
            // Handle DAT
            if (line.includes("DAT") || line.includes("dat")) {
                final_program.var_tracker[parts[0]] = assign_loc;

                // Check for init value
                if (parts.length >= 3) {
                    final_program.memory[assign_loc] = parseInt(parts[2]);
                }

                assign_loc--;
            } else {
                // Else treat as a point
                final_program.pnt_tracker[parts[0]] = final_program.program.length;
            }
            
            temp_opcode = parts[1].toUpperCase();
            if (parts[2]) {operand = parts.slice(2)}
        }


        // Handling opcode
        switch (temp_opcode) {
            case "HLT":
                opcode = Opcodes.HLT;
                break;
            case "ADD":
                opcode = Opcodes.ADD;
                break;
            case "SUB":
                opcode = Opcodes.SUB;
                break;
            case "STA":
                opcode = Opcodes.STA;
                break;
            case "STO":
                opcode = Opcodes.STO;
                break;
            case "LDA":
                opcode = Opcodes.LDA;
                break;
            case "BRA":
                opcode = Opcodes.BRA;
                break;
            case "BRZ":
                opcode = Opcodes.BRZ;
                break;
            case "BRP":
                opcode = Opcodes.BRP;
                break;
            case "INP":
                opcode = Opcodes.INP;
                break;
            case "OUT":
                opcode = Opcodes.OUT;
                break;
            case "OTC":
                opcode = Opcodes.OTC;
                break;
            case "DAT":
                return;

            default:
                error = idx;
                break;
        }

        final_program.program.push({opcode, operand});
    });

    if (!error) {
        return final_program
    } else {
        console.log(final_program)
        return error; // NEWCHANGE
    }
}

export function isValidProgram(x: any): number {
    if (x.program) {
        return 0; //NEWCHANGE
    } 

    return 1;
}
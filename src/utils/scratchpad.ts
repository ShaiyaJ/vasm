async function readFile(input: HTMLInputElement): Promise<string> {
    return new Promise((resolve) => {
        // Securing possibilities
        if (!input.files) {
            resolve("")
            return; 
        }
        if (!FileReader) {
            resolve("")
            return
        }

        // Get file
        let file = input.files[0];

        // Initialise reader
        let reader = new FileReader();

        // Read file
        reader.readAsText(file);
    
        reader.onload = () => {
            if (reader.result) {
                resolve(reader.result.toString());
            }
        };
    
        reader.onerror = () => {
            throw reader.error;
        };
    });   
}

function downloadFile(filename: string, data: string /*base64*/) {
    // Encode data to base64
    const url = URL.createObjectURL( new Blob([data], {type: "text/plain"}));

    // Valid program check
    try {
        formatProgram(data);
    } catch (error) {
        return error;
    }

    // Download text
    const element = document.createElement("a");                                                // Create a tag element
    // element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(data));
    element.setAttribute("href", url);
    element.setAttribute("download", filename);
  
    element.style.display = "none";                                                             // A tag invisible to user
    document.body.appendChild(element);                                                         // Add to document
  
    element.click();                                                                            // Force click
  
    document.body.removeChild(element);                                                         // Remove a tag  
}


function formatProgram(data: string): string {
    // Constants
    const opcodes = {
        "EXAMPLE_OPCODE": {
            "operands": 3,
            "description": "Some description"
        }
    };

    // Consistency formatting
    data.replace("\t", " ");        // Tabs to single spaces
    data.replace(/\s+/g, " ")       // Multispaces to single spaces
    data.replace("/\/\/.*/gm", ""); // Comments removal
    data.replace(";", "");          // Removing ";"
    data.replace(",", "");          // Removing ","

    // Splitting program per line
    let program = data.split("\n");

    // Final formatting step
    let memory_l = 100;

    program.forEach(line => {
        // Uppercase formatting
        let split_line = line.split(" ");
        split_line[0] = split_line[0].toUpperCase();
        const opcode = split_line[0];

        // Replacing DAT with memory locations
        if (opcode === "DAT") {
            let name = split_line[1];
            line.replace(name, memory_l.toString());
            memory_l -= 1;
        }

        // Linting
        if (!(opcode in opcodes)) {                                                         // Opcode existance check
            return "Error - nonexistant opcode";
        } 

        
        if (split_line.length - 1 !== opcodes[opcode].operands) {                            // operands count check
            return `Error - mismatched operands, expected ${opcodes[opcode].operands}, got ${split_line.length - 1}`
        }

        for (let operand_index = 1; operand_index < split_line.length; operand_index++) {      // operand valid check
            const element = split_line[operand_index];

            if (typeof element !== "number") {
                return "Error - invalid operands";
            }
        }
    });

    // Concat program
    return program.join("\n");
}


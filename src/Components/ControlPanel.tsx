import React, { useCallback, useRef, useState } from "react";

import tokenise, { isValidProgram } from "../utils/token.ts";
import type Program from "../utils/cpu.ts";
import { clockCycle, newProgram } from "../utils/cpu.ts";

import Container from "./Container.tsx";

function assemble(x: string, setProgram: any) {
    const t = tokenise(x);

    if (isValidProgram(t) === 1) { // NEWCHANGE
        console.log(t)
    } else {
        let new_prog = t;

        setProgram(new_prog);
    }
}

async function step(program: Program, setProgram: any) {
    const delay = () => new Promise((resolve) => setTimeout(resolve, 0));

    const next_prog = clockCycle(program);
    const copy = Object.assign({}, next_prog);
    setProgram(copy);
    await delay();              // Forces state updates to take effect IMMEDIATELY 
}

async function run(program: Program, setProgram: any) {
    while (program.is_running) {    // Loop blocks state update
        await step(program, setProgram)
    }
}

function downloadFile(filename: string, data: string /*base64*/) {
    // Encode data to base64
    const url = URL.createObjectURL( new Blob([data], {type: "text/plain"}));

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

function ControlPanel({ program, setProgram }: { program: Program, setProgram: any }) {
    let [rawProgram, setRawProgram] = useState<string>("");
    let fileInput = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback((event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            setRawProgram(event.target.result);
        };

        reader.readAsText(file);
    }, []);



    return (
        <div className={"controlcontainer"}>
            <div>
                <input type={"file"} style={{"display": "none"}} ref={fileInput} onChange={handleFileChange} />
                <button onClick={(e) => {fileInput.current.click();}}>Import</button>
                <button onClick={(e) => downloadFile("program.txt", rawProgram)}>Export</button>
                <hr />
            </div>
            
            <div className={"text"}>
                <textarea value={rawProgram} onChange={(e) => {setRawProgram((e.target as HTMLTextAreaElement).value)}} /> <br />
            </div>

            <div>
                <hr />
                <button onClick={(e) => {assemble(rawProgram, setProgram);}}>Assemble</button>
                <button onClick={(e) => {run(program, setProgram);}}>Run</button>
                <button onClick={(e) => {step(program, setProgram)}}>Step</button>
            </div>
        </div>
    )
}

export default ControlPanel;
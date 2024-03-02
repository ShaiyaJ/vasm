import React, { useMemo, useState } from "react";

import type Program from "../utils/cpu";

import Container from "./Container.tsx";
import { Opcodes } from "../utils/cpu.ts";

function StatePanel({ program }: { program: Program }) {
    let varkeys: {name: string, value: number}[] = [];

    for (const key in program.var_tracker) {
        varkeys.push({name: key, value: program.var_tracker[key]});
    }

    let pntkeys: {name: string, value: number}[] = [];

    for (const key in program.pnt_tracker) {
        pntkeys.push({name: key, value: program.pnt_tracker[key]});
    }

    return (
        <>
            <div className={"ramcontainer"}>
                <div className={"extra-wrapper-for-no-reason"}>
                    <Container title={"RAM"}>
                        <div className={"memorycontainer"}>
                                {program.memory.map((e, idx) => 
                                    {return <>
                                        <span className={"memory"}>
                                            <p><b>{idx}</b></p>{e}
                                        </span>
                                    </>}
                                )}
                        </div>
                    </Container>
                </div>

                <hr className={"horizontalhr"} /> 

                <div className={"variablecontainer"}>
                    <Container title={"Variable tracker"}>
                        {varkeys.map((e) => {
                            return <>
                                <p><b>{e.name}</b> = {program.memory[e.value]} (@ {e.value}) </p> 
                            </>
                        })}

                        <br />

                        {pntkeys.map((e) => {
                            return <>
                                <p><b>{e.name}</b> @ PC {e.value}</p> 
                            </>
                        })}

                    </Container>
                </div>
            </div>

            <hr />

            <div>
                <Container title={"Registers"}>
                    <p>ACC: {program.accumulator}</p>
                    <p>PC: {program.program_counter} ({Opcodes[`${program.program[program.program_counter]?.opcode}`]} {program.program[program.program_counter]?.operand})</p> {/*NEWCHANGE*/}
                    <p>CIR: {program.current_instruction_register}</p>
                    <p>MAR: {program.memory_address_register}</p>
                    <p>MDR: {program.memory_data_register}</p>
                </Container> {/*NEWCHANGE (removed busses)*/}
            </div>
        </>
    )
}

export default StatePanel;
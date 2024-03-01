import React, { useEffect, useState } from "react";

import type Program from "../utils/cpu.ts";

import { newProgram } from "../utils/cpu.ts";

import ControlPanel from "../Components/ControlPanel.tsx";
import StatePanel from "../Components/StatePanel.tsx";
import Docs from "../Components/Docs.tsx";

function Main() {
    var [program, setProgram] = useState<Program>(newProgram());

    // useEffect(() => {console.log("a")}, [program])

    return ( 
        <div className={"main"}>
            <div className={"mainchild"}>
                <ControlPanel program={program} setProgram={setProgram} />
                <Docs />
            </div>

            <div className={"mainchild"}>
                <StatePanel program={program} />
            </div>
        </div>
    )
}

export default Main;
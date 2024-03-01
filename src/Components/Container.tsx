import React, { useEffect, useState } from "react";

function Container(props) {
    const [toggle, setToggle] = useState<boolean>(true);

    useEffect( () => {
        if (props.closed && toggle) {
        setToggle(false);
        }
    }, [])

    if (toggle) {
        return <div className={"container"}>
            <div className={props.className}>
                <button onClick={() => setToggle(!toggle)}>▼ {props.title} ▼</button> <br />
                {props.children}
            </div>
        </div>
    } else {
        return <div className={"container"}>
            <div className={props.className}>
                <button onClick={() => setToggle(!toggle)}>▶ {props.title} ◀</button> <br />
            </div>
        </div>
    }
}

export default Container;
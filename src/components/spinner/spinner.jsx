import React from "react"
import spinnerIMG from "../../assets/spinnerIMG.gif"

let Spinner = () => {
    return(
        <React.Fragment>
            <div>
                <img src={spinnerIMG} alt="spinner" style={{width: 400}} className="d-block m-auto" />
            </div>
        </React.Fragment>
    )
}

export default Spinner;
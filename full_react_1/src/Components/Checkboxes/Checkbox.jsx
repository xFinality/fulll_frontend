import React from "react";

const Checkbox = ({checkboxLabel, ...otherProps}) => {

    return (
        <label>
            <input type='checkbox' name={checkboxLabel} {...otherProps}/>
            {checkboxLabel}
        </label>
    )

}

export default Checkbox;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const usePasswordToggler = () =>{
    const [visible, setVisibility] = useState(false);
    const Icon = (
        <FontAwesomeIcon icon = {visible ? faEye : faEyeSlash}
        onClick={() => setVisibility(visibility => !visibility)} />

    );

    const inputType = visible ? "text" : "password";
    return [inputType, Icon];

}

export default usePasswordToggler
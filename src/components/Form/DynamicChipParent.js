import React, {useState} from 'react';
import DynamicChip from "../../utils/DynamicChip";

const DynamicChipParent = (props) => {
    const [value, setValue] = useState();
    const handleChange = (value) => {
        setValue(value)
        props.onChange(value)
    };

    useState(()=>{
        setValue(props.defaultValue);
    },[props.defaultValue])

    return (
        <div>
            {props.options.map((obj, index) => {
                return <DynamicChip
                    key={index} onChipCLick={handleChange}
                    name={obj.label} active={value} id={obj.value} />
            })}
        </div>
    );
};

export default DynamicChipParent;

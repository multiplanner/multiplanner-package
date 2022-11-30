import Option from './Option';
import './Select.css';

interface Props {
    placeholderText: string,
    selectName: string,
    selectLabel: string,
    options: Option[],
    value?: string,
    onChange:any,
    width?: string;
}

function Select({ placeholderText, selectName, selectLabel, options, value = "", onChange, width = "normal" }: Props ) {
    const changeSelect = (e:React.ChangeEvent<HTMLSelectElement>):any => {
        const selectedOption = options[e.target.options.selectedIndex - 1];
        onChange(selectedOption === undefined ? 0 : selectedOption.id);
    }
    return (
        <div>
            <h4 className="select-label">{selectLabel}</h4>
            <select value={value != "" ? value : "0"} className={"select select-" + width} id={selectName} name={selectName} onChange={changeSelect}>
                <option value="0">{placeholderText + "..."}</option>
                {options.map(option => {
                    return (
                        <option value={option.id} key={option.id}>{option.name}</option>
                    )}
                )}
            </select>
        </div>
    );
}

export default Select;
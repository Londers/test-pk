import React, {useState} from 'react';
import './App.sass';
import TableComponent from "./TableComponent/TableComponent";

function App() {

    const [selectValue, setSelectValue] = useState(0);

    const createSelect = (): Array<object> => {
        let options = []
        for (let i = 0; i < 12; i++) {
            options.push(<option key={i} value={i}>ПК{i + 1}</option>)
        }
        return options
    }

    const handleChange = (event: React.SyntheticEvent): void => {
        let target = event.target as HTMLSelectElement;
        setSelectValue(Number(target.value))
    }

    return (
        <div className="App">
            <select defaultValue={selectValue} onChange={handleChange}>
                {createSelect()}
            </select>
            <TableComponent currentPk={selectValue}/>
        </div>
    )
}

export default App
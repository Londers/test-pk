import React, {useState} from 'react';
import './App.sass';
import TableComponent from "./TableComponent/TableComponent";

function App() {

    const [selectValue, setSelectValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectValue(Number(event.target.value))
    }

    return (
        <div className="App">
            <select defaultValue={selectValue} onChange={handleChange}>
                {
                    Array.from({length: 12}, (v, i) => <option key={i} value={i}>ПК{i + 1}</option>)
                }
            </select>
            <TableComponent currentPk={selectValue}/>
        </div>
    )
}

export default App
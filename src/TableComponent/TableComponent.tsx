import React, {useState} from "react"
import "./TableComponent.sass"
import rawData from "../data.json"
import TableCellComponent from "../TableCellComponent/TableCellComponent";

function TableComponent(props: { currentPk: number }) {

    const phaseTypes = [' ', 'МГР', '1 ТВП', '2ТВП', '1,2 ТВП', 'Зам. 1ТВП', 'Зам. 2ТВП', 'Зам.', 'МДК', 'ВДК']

    const [data, setData] = useState(rawData)

    const handleTFChange = (event: React.ChangeEvent<HTMLSelectElement>, rowIndex: number) => {
        data.data.state.arrays.SetDK.dk[props.currentPk].sts[rowIndex].tf = Number(event.currentTarget.value)
        setData(Object.assign({}, data))
    }

    const handlePlusChange = (event: React.ChangeEvent<HTMLSelectElement>, rowIndex: number) => {
        data.data.state.arrays.SetDK.dk[props.currentPk].sts[rowIndex].plus = event.currentTarget.value === '+'
        setData(Object.assign({}, data))
    }

    return (
        <div className="container">
            <h1>Веселимся с ПК</h1>
            <table className="center">
                <thead>
                <tr>
                    <th>№перекл.</th>
                    <th>Вр. вкл</th>
                    <th>Тип фазы</th>
                    <th>№ фазы</th>
                    <th>Длительность</th>
                    <th>+пред.</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.data.state.arrays.SetDK.dk[props.currentPk].sts.map((sw, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
                                <td>{sw.line}</td>
                                <TableCellComponent
                                    type={'start'}
                                    data={data}
                                    setData={setData}
                                    value={sw.start}
                                    rowIndex={rowIndex}
                                    currentPk={props.currentPk}/>
                                <td>
                                    <select key={rowIndex} value={sw.tf}
                                            onChange={(event) => handleTFChange(event, rowIndex)}>
                                        {
                                            phaseTypes.map((phase, index) =>
                                                <option key={index} value={index}>{phase}</option>)
                                        }
                                    </select>
                                </td>
                                <TableCellComponent
                                    type={'num'}
                                    data={data}
                                    setData={setData}
                                    value={sw.num}
                                    rowIndex={rowIndex}
                                    currentPk={props.currentPk}/>
                                <TableCellComponent
                                    type={'stop'}
                                    data={data}
                                    setData={setData}
                                    value={sw.stop - sw.start}
                                    rowIndex={rowIndex}
                                    currentPk={props.currentPk}/>

                                <td>
                                    {
                                        ((sw.tf >= 2) && (sw.tf <= 4)) ? (
                                            <select value={sw.plus ? '+' : ''}
                                                    onChange={(event) => handlePlusChange(event, rowIndex)}>
                                                <option key={0}>{}</option>
                                                <option key={1}>+</option>
                                            </select>
                                        ) : (
                                            ''
                                        )
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default TableComponent
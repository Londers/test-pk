import React, {useState} from "react"
import "./TableComponent.sass"
import rawData from "../data.json"
import TableCellComponent from "../TableCellComponent/TableCellComponent";

export default function TableComponent(props: { currentPk: number}) {

    const [data, setData] = useState(rawData)

    const setDataFromChild = (newData: typeof rawData) => {
        setData(newData);
        onClickHandler();
        console.log('cool');
    }

    const [, setCount] = useState(0)
    const onClickHandler = () => {
        setCount(prevCount => prevCount + 1)
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
                    data.data.state.arrays.SetDK.dk[props.currentPk].sts.map((sw, index) => {
                        return (
                            <tr key={index}>
                                <td>{sw.line}</td>
                                <TableCellComponent data={data}
                                                    setData={setDataFromChild}
                                                    value={data.data.state.arrays.SetDK.dk[props.currentPk].sts[index].start}
                                                    index={index}
                                                    currentPk={props.currentPk}/>
                                <td>{sw.tf}</td>
                                <td>{sw.num}</td>
                                <td>{sw.stop - sw.start}</td>
                                <td>{sw.plus ? '+' : ''}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}
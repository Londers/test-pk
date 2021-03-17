import React, {useState} from "react";
import rawData from "../data.json"

function TableCellComponent(props: {
    type: string,
    data: typeof rawData,
    setData: Function,
    value: number | string,
    rowIndex: number,
    currentPk: number
}) {

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: -1
    })

    const setValue = (value: number) => {
        const currPk = props.data.data.state.arrays.SetDK.dk[props.currentPk].sts[props.rowIndex];
        if (isNaN(value)) return
        switch (props.type) {
            case 'start':
                currPk.start = value;
                break;
            case 'num':
                currPk.num = value;
                break;
            case 'stop':
                currPk.stop = currPk.start + value;
                break;
        }
        props.setData(Object.assign({}, props.data))
        setInEditMode({
            status: false,
            rowKey: -1
        })
    }

    const handleClick = (event: React.MouseEvent) => {
        let target = event.currentTarget as HTMLTableDataCellElement;
        let parentNode = target.parentNode as HTMLTableRowElement;
        if ((target.nodeName !== 'TD') || (inEditMode.rowKey === (parentNode.rowIndex - 1))) return
        setInEditMode({
            status: true,
            rowKey: parentNode.rowIndex - 1
        })
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.valueAsNumber)
    }

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if ((event.key === 'Enter') || (event.key === 'Tab')) {
            setValue(event.currentTarget.valueAsNumber)
        }
    }

    return (
        <td onClick={(event) => handleClick(event)}>
            {
                inEditMode.status && inEditMode.rowKey === props.rowIndex ? (
                    <input autoFocus={true}
                           key={props.rowIndex}
                           type={'number'}
                           defaultValue={props.value}
                           onBlur={(event) => handleBlur(event)}
                           onKeyUp={(event) => handleKeyUp(event)}
                    />) : (
                    props.value
                )
            }
        </td>
    )
}

export default TableCellComponent
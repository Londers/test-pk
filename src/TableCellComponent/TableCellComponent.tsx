import React, {useState} from "react";
import rawData from "../data.json"

export default function TableCellComponent(props: {data: typeof rawData, setData: Function, value: number | string, index: number, currentPk: number }) {

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: -1
    })

    const setValue = (index: number, name: string, value: number) => {
        props.data.data.state.arrays.SetDK.dk[props.currentPk].sts[index].start = value;
        props.setData(props.data)
        setInEditMode({
            status: false,
            rowKey: -1
        })
    }

    const handleClick = (index: number, event: React.SyntheticEvent) => {
        let parentNode;
        let target;
        if ((typeof event.target) === (typeof HTMLTableCellElement)) {
            target = event.target as HTMLTableDataCellElement;
            parentNode = target.parentNode as HTMLTableRowElement;
        } else {
            target = event.target as HTMLInputElement;
            const parentNode2 = target.parentNode as HTMLTableDataCellElement;
            parentNode = parentNode2.parentNode as HTMLTableRowElement;
        }
        if (inEditMode.rowKey === (parentNode.rowIndex-1)) return
        setInEditMode({
            status: !inEditMode.status,
            rowKey: parentNode.rowIndex - 1
        })
    }

    const handleBlur = (index: number, event: React.SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        setValue(index, '', target.valueAsNumber)
    }

    const handleKeyUp = (index: number, event: React.KeyboardEvent) => {
        const target = event.target as HTMLInputElement;
        if ((event.key === 'Enter') || (event.key === 'Tab')) {
            setValue(index, '', target.valueAsNumber)
        }
    }

    return (
        <td onClick={(event) => handleClick(props.index, event)}>
            {
                inEditMode.status && inEditMode.rowKey === props.index ? (
                    <input defaultValue={props.value}
                           type='number'
                           onBlur={(event) => handleBlur(props.index, event)}
                           onKeyUp={(event) => handleKeyUp(props.index, event)}
                    />
                ) : (
                    props.value
                )
            }
        </td>
    )
}
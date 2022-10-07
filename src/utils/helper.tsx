import React from "react";

export const renderList = (list:Array<any>,renderCell:Function) => {
    let op: any = [];
    list.forEach(e=>{
        op.push(renderCell(e,renderCell));
    })
    return (<div className="row">{op}</div>);
}

export const render2DList = (list:Array<Array<any>>,renderCell:Function) =>{
    let op: Array<any> = [];
    list.forEach(e=>op.push(renderList(e,renderCell)));
    console.log(op);
    return op;
}
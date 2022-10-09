import React from "react";
import { Spot } from "../model/Spot";

export const renderList = (list:Array<Spot>,rowNum:number) => {
    let op: any = [];
    let colNum=rowNum*8;;
    list.forEach(e=>{
        op.push(e.render(colNum));
        colNum++;
    })
    return (<div className="row" key={rowNum}>{op}</div>);
}

export const render2DList = (list:Array<Array<any>>) =>{
    let op: Array<any> = [];
    let rowNum=0;
    list.forEach(e=>op.push(renderList(e,rowNum++)));
    return op;
}
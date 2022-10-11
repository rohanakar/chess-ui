import React from "react";
import { Spot } from "../model/Spot";

export const renderList = (list:Array<Spot>,rowNum:number,_STATE:any) => {
    let op: any = [];
    let colNum=rowNum*8;;
    list.forEach(e=>{
        op.push(e.render(_STATE));
        colNum++;
    })
    return (<div className="row" key={rowNum}>{op}</div>);
}

export const render2DList = (list:Array<Array<any>>,_STATE:any) =>{
    let op: Array<any> = [];
    let rowNum=0;
    for(let i=list.length-1;i>=0;i--)
        op.push(renderList(list[i],rowNum++,_STATE));
    return op;
}
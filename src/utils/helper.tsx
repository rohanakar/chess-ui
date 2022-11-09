import { Spot } from "../components/Spot";

export const renderList = (list:Spot[],rowNum:number) => {
    let op: any = [];
    let colNum=rowNum*8;;
    list.forEach(e=>{
        op.push(e.render());
        colNum++;
    })
    return (<div className="row" key={rowNum}>{op}</div>);
}

export const render2DList = (list:any[][]) =>{
    let op: any[] = [];
    let rowNum=0;
    for(let i=list.length-1;i>=0;i--)
        op.push(renderList(list[i],rowNum++));
    return op;
}
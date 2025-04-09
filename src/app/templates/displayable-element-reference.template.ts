export class DisplayableElementReference{
    DisplayableElementId!:string;
    DisplayableElementType!:DisplayableElementType;
    Order!:number;

}

export enum DisplayableElementType{
    Dev ,
    Post ,
    TradingStatus

}
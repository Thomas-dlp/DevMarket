export class DisplayableElementReference{
    id!:"string";
    type!:DisplayableElementType;
    order!:number;

}

export enum DisplayableElementType{
    Dev,
    Post,
    TradingStatus,

}
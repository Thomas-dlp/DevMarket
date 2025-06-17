import { DisplayableElementType } from "./displayable-element-reference.template";
import { LightElement } from "./light-element.template";

export class LightDev implements LightElement{
     
    constructor(
        public id: string,
        public type: DisplayableElementType,
        public title: string,
        public studioId: string
    ) {}
}
    

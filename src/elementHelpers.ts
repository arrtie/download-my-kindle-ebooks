export function getElementFrom(parent: HTMLElement) {
    return function getElement(selector: string){
        return parent.querySelector<HTMLElement>(selector);
    }
}

export function getElementsFrom(parent: HTMLElement) {
return function getElements(selector: string){
    return Array.from(parent.querySelectorAll<HTMLElement>(selector).values());
}
}

export const findInChildren = (parent: HTMLElement, selector: string) => {
    const children = Array.from(parent.querySelectorAll<HTMLElement>("*")).filter(element => element.textContent === selector);
    if(children.length === 0 ){
        console.warn(`cannot find child element with text content "${selector}" in parent "${parent.tagName}"`)
        return null;
    }
    return children[0];
}


export function makeTitleMap(){
    const getElementsFromDoc = getElementsFrom(document.documentElement)
    const tableBody = getFirst(getElementsFromDoc("tbody"), "missing tbody")
    const getFromTable = getElementsFrom(tableBody);
    const rows = getFromTable("tr")
    const titleMap = new Map<string, HTMLElement>();
    rows.forEach((row) => {
        const titleElement = getElementFrom(row)("[class='digital_entity_title']")
        if(titleElement?.textContent != null) {
            titleMap.set(titleElement.textContent, row)
        }
    })
    return titleMap;
}

const getFirst = (someArray: HTMLElement[], errorText:string) => {
    if(someArray?.length == 0) {
        throw new Error(errorText)
    }
    return someArray[0];
}

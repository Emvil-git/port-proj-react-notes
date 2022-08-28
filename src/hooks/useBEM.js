export const useBEM  = (blockName) =>  {

    const E = (elementName, modifiers) => {

        let modifier = '';
        if (modifiers) {
            modifier = `${blockName}__${elementName}--${modifiers}`;
            if(Array.isArray(modifiers)){
                modifier = modifiers.map( m => m ? `${blockName}__${elementName}--${m}` : '').join(' ');
            }
        }

        return `${blockName}__${elementName} ${modifier}`.trim();
    }

    const B = (modifiers) => {         
        
        let modifier = '';
        if (modifiers) {
            modifier = `${blockName}--${modifiers}`;
            if (Array.isArray(modifiers)) {
                modifier = modifiers.map( m => m ? `${blockName}--${m}` : '').join(' ');
            }
        }
        
        return `${blockName} ${modifier}`.trim();
    }

    return [
        B,
        E
    ]
}
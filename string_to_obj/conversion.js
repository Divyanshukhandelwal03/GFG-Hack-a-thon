
function convert(str){
    let t="";
    let parentObj = {};
    let className = "";
    let elementName = "";
    let idName = "";
    let check = -1;
    let childObj = {};
    for(let i = 0 ; i< str.length ; i++)
    {
        if(str[i]=='%')
        {
            if(check == -1)
            {
                elementName = t ;
            }
            else if(check == 1)
            {
                className = t ;   
            }
            else if(check == 2){
                idName = t;
            }
            childObj = convert(str.substr(i+1));
            break;
        }
        else if(str[i] == '&')
        {
            if(check == -1)
            {
                elementName = t ;
            }
            else if(check == 1)
            {
                className = t ;   
            }
            else if(check == 2){
                idName = t;
            }
            t="";
            check = -1;
        }
        else if(str[i] == '.')
        {
           check = 1 ;
        }
        else if(str[i]=='#')
        {
            check = 2;
        }
        else{
            t+=str[i];
        }
    }
    if(t.length>0)
    {
        if(check == -1)
        {
            elementName = t ;
        }
        else if(check == 1)
        {
            className = t ;   
        }
        else if(check == 2){
            idName = t;
        } 
    }

    parentObj.element=elementName;
    parentObj.class=className;
    parentObj.id=idName;
    if(Object.keys(childObj).length)
    {
    parentObj.child = childObj;
    }
    return parentObj;
}
export function parseStrToObj(str){
    const data = [];
    let prev = 0 ; 
    let t ="";
    for(let i = 1 ; i < str.length ; i++)
    {
        if(str[i]=='$')
        {
            let newObj = convert(t);
            data.push(newObj);
            t = ""; 
        }
        else{
            t+=str[i];
        }
    }
    if(t.length>0)
    {
        let newObj=convert(t);
        data.push(newObj);
    }
    return data;
}
export default function(date,pattern){
    if(!date){
        return '';
    }
    if(typeof date=='string'){  
        date =+date;
    }
    return Date.format(new Date(date),pattern);
}
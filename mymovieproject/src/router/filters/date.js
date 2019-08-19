export default function(date,pattern){
    if(!date){
        return '';
    }
    
    console.log("1111",date);
    if(typeof date=='string'){
        
    console.log("2222",date);
        date =+date;
    }
    console.log("3333",date);
    return Date.format(new Date(date),pattern);
}
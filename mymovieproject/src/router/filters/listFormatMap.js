//用来表格列的字典翻译
export default function(param,list){

    if(list!=null){
        for(var i=0;i<list.length;i++){
            if(list[i].value==param){
                return list[i].label;
            }
        }
    }
    

}
/**
 * Created by JUN on 2018/8/10.
 */

$(function(){
    //生成th
    for(var i in thList){
        $("thead tr").append("<th class='sorting' rowspan='1' colspan='1'>"+thList[i].itemName+"</th>")

        var item=thList[i];
        var field;
        var span='';
        if(item.needcheck=="true"){
            span='<span style="color:red">*</span>';
        }
        if(item.select){
            var options;
            for(var j in item.selectlist){
                var item1=item.selectlist[j];
                options+='<option value="'+item1.val+'">'+item1.name+'</option>';
            }

            field='<div class="control-group">' +
                '<label class="control-label" for="selectError3">' +
                span +item.itemName+'</label> <div class="controls">' +
                ' <select id="selectError3" name="select">' +
                options+'</select> </div> </div>';
        }else{
            var dsp="";
            if(item.inputType=="hidden"){
                dsp="none"
            }
            field='<div class="control-group" style="display:'+dsp+'">' +
                '<label class="control-label">' +
                span +item.itemName+'</label> ' +
                '<div class="controls"> ' +
                '<input type="'+item.inputType+'" name="'+item.name+'" needcheck="'+item.needcheck+'" checkname="'+item.itemName+'"> ' +
                '</div></div>'
        }

        $("#NewInstance fieldset").append(field);
        $("#titleInstance").html($("title").html()+"信息");
        $("#titleContent").html($("title").html());

        $("#cancleBtn").click(function(){
            $("#NewInstance").hide();
        })

        $("#allcheck").click(function(){
            var a=$(this).prop("checked");
            if(a){
                $("tbody [type=checkbox]").prop("checked","checked");
            }else{
                $("tbody [type=checkbox]").removeProp("checked");
            }
        })
    }
    FillData();
})

function FillData(){
    var flag=false;
    for(var i in data){
        var item=data[i];

        var tr="";
        if(flag){
            tr='<tr class="odd">';
            flag=true;
        }else{
            tr='<tr class="">';
        }
        tr+='<td class="center"><input type="checkbox"></td>';

        var length=thList.length;
        var arr=[];

        for(var j in item){
            var th=thList.filter(function(e){
                return e.name==j;
            });
            var key1= th[0].key;

            var s="";
            if(!!th[0].onclick){
                s='<td class="center"><a style="text-decoration: underline;" onclick="'+th[0].onclick+'('+item.id+')">'+item[j]+'</a></td>';
            }else{
                s='<td class="center">'+item[j]+'</td>';
            }

            arr[key1]=s;
        }
        tr+=arr.join();
        tr+="</tr>";
        $("tbody").append(tr);
    }
}

function Create(){
    $("input").val("");
    $("#NewInstance").show();
}
function Edit(id){
    var item=data.filter(function(e){
        return e.id==id;
    })[0];

    for(var i in item){
        $("#NewInstance [name="+i+"]").val(item[i]);
    }
    $("#NewInstance").show();
}
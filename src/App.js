import React from 'react';
import './App.css';
import { useState } from 'react';
import data from './data.json';

let result;

export function Calculate(){
  //const [traceBasi,setBasic] = useState(1);
  const summaryState=()=>{
    let summary = {
      hp: document.getElementById("hp").value,
      atk:document.getElementById("atk").value,
      dmgbuff:document.getElementById("dmgbuff").value,
      critrate:document.getElementById("critrate").value,
      critdmg:document.getElementById("critdmg").value,
      speed:document.getElementById("speed").value,
      def:document.getElementById("def").value,
      breakEf:document.getElementById("breakEf").value,
      healBoost:document.getElementById("heal").value,
      err:document.getElementById("err").value,
      efHitRate:document.getElementById("efHitRate").value,
      efRES:document.getElementById("EfRES").value
    };
    return summary;
  }

  let select = document.getElementById("chara");

  let index = select.selectedIndex;
  let id = select.options[index].value;/*選択キャラid*/

  /*フォームをまとめる*/
  let summary = summaryState();
  return loadImport(summary,id);

  //import("./calc"+data.index[id]+".js").then(({ calc }) => calc(summary));
}

async function loadImport(summary,id){
  const module = await import("./calc"+data.index[id]+".js");
  result = module.calc(summary);
  console.log(result);
  return result;
}

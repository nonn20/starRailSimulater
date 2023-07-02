import React from 'react';
import buffs from './buffs.json'
import weapons from './weapon.json'

export function DisplayBuffs(){
  let chara = buffs.charactor;
  let buff = buffs.buff;
  let id = 0;
  let tmp=[];
  let resultTmp = [];
  let result = [];

  for(let i=0;i<chara.length;i++){
    let nowChara = buff[i];
    for(let j=0;j<buff[i].length;j++){
      tmp.push(<>
      <td><input type="checkbox" name={"buffCheck"+i}></input></td>
      <td><div>{nowChara[j].name}</div></td>
      <td><div>{nowChara[j].kind_display}</div></td>
      </>);
      if(nowChara[j].level)
        tmp.push(<td><input type="number" name={"buffTenpu"+i} min="0" max="10" placeholder='Level'/></td>);
      else
      tmp.push(<td name={"buffTenpu"+i}> </td>);
      if(nowChara[j].lay)
        tmp.push(<td><input type="number" name={"buffLay"+i} max={nowChara[j].deepLay} min="0" placeholder='層'/></td>);
      else
        tmp.push(<td name={"buffLay"+i}> </td>);
      if(nowChara[j].ref!=="none")
        tmp.push(<td><input type="text" name={"buffRef"+i}  min="0" placeholder={nowChara[j].ref_display}/></td>);
      else
        tmp.push(<td name={"buffRef"+i}> </td>);

      resultTmp.push(<tr name={chara[i]} id={j}>{tmp}</tr>);
      tmp = [];
      id++;
    }
    result.push(<><table className="table table-striped"><thead><tr><th><div>{chara[i]}</div></th></tr></thead><tbody>{resultTmp}</tbody></table></>)
    resultTmp = [];
  }

  return (<div>{result}</div>);
}

export function DisplayWeapons(){
  let select = document.getElementById("chara");
  let select1 = document.getElementById("weapon");
  let result = [];
  let selectResult = []
  let destinyId = 2

  if(select!=null){
    let index = select.selectedIndex;
    let id = select.options[index].value;/*選択キャラid*/
    destinyId = weapons.destiny[id];
  }

  let weaponList = weapons.cone[destinyId];
  let list = [];
  for(let i=0;i<weaponList.length;i++){
    list.push(<option value={i}>{weaponList[i].name}</option>);//リスト作成
  }

  let selectWeapon = weaponList[0];
  if(select1!=null){
    let index = select1.selectedIndex;
    let id = select1.options[index].value;/*選択武器id*/
    selectWeapon = weaponList[id];
  }

  if(selectWeapon.lay!=undefined){
    for(let i=0;i<selectWeapon['lay'].length;i++){//層UI
      if(selectWeapon.lay[i]){
        selectResult.push(<div>{selectWeapon.layExplain[0]}</div>)//層説明
        for(let j=0;j<selectWeapon.deepLay+1;j++){
          selectResult.push(<><input type="radio"  name="weaponRadio" id="weaponRadio" value={j}/>{j}</>)//ラジオボタン
        }
        break;
      }
    }
  }

  let con = selectWeapon.con;
  if(con!=undefined){
    for(let i=0;i<con.length;i++){//条件チェックボックス
        selectResult.push(<div>{selectWeapon.con[i]}<input type="checkbox" id="weaponCheck"></input></div>)
    }
  }

  selectResult.push(<div>重層</div>)
  for(let j=1;j<6;j++){
    selectResult.push(<><input type="radio"  name="starRadio" id="starRadio" value={j-1}/>{j}</>)//ラジオボタン
  }

  result.push(<div><select id="weapon">{list}</select><div>{selectResult}</div></div>)

  return result;
}

export function AddStatus(summary){
  let select = document.getElementById("chara");
  let select1 = document.getElementById("weapon");
  let destinyId = 2;
  let atkAddPer = 0;
  let atkAddReal = 0;
  let defAddPer = 0;
  let defAddReal = 0;
  let hpAddPer = 0;
  let hpAddReal = 0;

  if(select!=null){
    let index = select.selectedIndex;
    let id = select.options[index].value;/*選択キャラid*/
    destinyId = weapons.destiny[id];
  }


  let weaponList = weapons.cone[destinyId];
  let selectWeapon = weaponList[0];
  if(select1!=null){
    let index = select1.selectedIndex;
    let id = select1.options[index].value;/*選択武器id*/
    selectWeapon = weaponList[id];
  }

  let ele = document.getElementsByName("starRadio");//重層取得
  let star;
  for(star=0;star<5;star++){
    if(ele[star].checked)
      break;
    if(star==4&&!ele[star].checked){
      star=0;
      break;
    }
  }
  let coneStatus = [];
  if(selectWeapon.existEffect){
    let L = selectWeapon.effect.length;
    for(let i=0;i<L;i++){
      let tmpTable = selectWeapon.table[i];
      coneStatus.push(tmpTable[star])
    }

    for(let i=0;i<L;i++){
      let tmp;
      if(selectWeapon.exsistCon[i]&&selectWeapon.lay[i]){//層、条件どっちもアリ
        if(document.getElementById("weaponCheck").checked){
          ele = document.getElementsByName("weaponRadio");
          let lay;
          for(lay=0;lay<selectWeapon.deepLay+1;lay++){
            if(ele[lay].checked)
              break;
            if(lay==selectWeapon.deepLay&&!ele[lay].checked){
              lay=0;
              break;
            }
          }

          tmp = summary[selectWeapon.effect[i]];
          let tmpTable = selectWeapon.table[i];
          if(selectWeapon.effect[i]!="atk")
            summary[selectWeapon.effect[i]] = Number(summary[selectWeapon.effect[i]])+ (tmpTable[star]*lay);
          else{
            atkAddPer += tmpTable[star]*lay;
          }
        }
      }
      else if(selectWeapon.exsistCon[i]){//条件のみ
        ele = document.getElementById("weaponCheck")
        if(ele!=null)
          if(ele.checked){
            tmp = summary[selectWeapon.effect[i]];
            let tmpTable = selectWeapon.table[i];
            if(selectWeapon.effect[i]!="atk")
              summary[selectWeapon.effect[i]] = Number(summary[selectWeapon.effect[i]])+tmpTable[star];
            else
              atkAddPer += tmpTable[star];
          }
      }
      else if(selectWeapon.lay[i]){//層のみ
        ele = document.getElementsByName("weaponRadio");
        if(ele.length>0){
          let lay;
          for(lay=0;lay<selectWeapon.deepLay+1;lay++){
            if(ele[lay].checked)
              break;
            if(lay==selectWeapon.deepLay&&!ele[lay].checked){
              lay=0;
              break;
            }
          }

          tmp = summary[selectWeapon.effect[i]];
          let tmpTable = selectWeapon.table[i];
          if(selectWeapon.effect[i]!="atk")
            summary[selectWeapon.effect[i]] = Number(summary[selectWeapon.effect[i]])+ (tmpTable[star]*lay);
            else{
              atkAddPer += tmpTable[star]*lay;
            }
        }
      }
      else{
        tmp = summary[selectWeapon.effect[i]];
        let tmpTable = selectWeapon.table[i];
        if(selectWeapon.effect[i]!="atk")
          summary[selectWeapon.effect[i]] = Number(summary[selectWeapon.effect[i]])+tmpTable[star];
        else
          atkAddPer += tmpTable[star];
      }
    }
  }

  let chara = buffs.charactor;
  let data = buffs.buff;
  for(let i=0;i<chara.length;i++){
    let name = chara[i];
    let check,lay,tenpu,ref;
    let data1 = data[i];
    check = document.getElementsByName("buffCheck"+i);
    lay = document.getElementsByName("buffLay"+i);
    tenpu = document.getElementsByName("buffTenpu"+i);
    ref = document.getElementsByName("buffRef"+i);
    for(let j=0;j<data1.length;j++){
      let data2 = data1[j];
      let rate = 0;
      if(check[j].checked){
        if(data2.level){
          rate = data2.table[Number(tenpu[j].value)];
        }
        else{
          rate = data2.table;
        }
        if(data2.lay){
          rate = Number(rate) * Number(lay[j].value);
        }
        if(data2.ref!="none"){
          rate = Number(rate)/100 * Number(ref[j].value);
        }
        if(data2.mean == "real"){
          if(data2.kind==="atk")
            atkAddReal += rate;
          else if(data2.kind==="def")
            defAddReal += rate;
          else if(data2.kind==="hp")
            hpAddReal += rate;
          else
            summary[data2.kind] = Number(summary[data2.kind])+rate;
        }
        if(data2.mean == "per"){
          if(data2.kind==="atk")
            atkAddPer += rate;
          else if(data2.kind==="def")
            defAddPer += rate;
          else if(data2.kind==="hp")
            hpAddPer += rate;
          else
            summary[data2.kind] = Number(summary[data2.kind])*rate;
        }
        if(data2.table2!=undefined){
          if(data2.level){
            rate = data2.table2[Number(tenpu[j].value)];
          }
          else{
            rate = data2.table2;
          }
          if(data2.lay){
            rate = Number(rate) * Number(lay[j].value);
          }
          if(data2.ref!="none"){
            rate = Number(rate)/100 * Number(ref[j].value);
          }

          if(data2.mean2 == "real"){
            if(data2.kind==="atk")
              atkAddReal += rate;
            else if(data2.kind==="def")
              defAddReal += rate;
            else if(data2.kind==="hp")
              hpAddReal += rate;
            else
              summary[data2.kind] = Number(summary[data2.kind])+rate;
          }
          if(data2.mean2 == "per"){
            if(data2.kind==="atk")
              atkAddPer += rate;
            else if(data2.kind==="def")
              defAddPer += rate;
            else if(data2.kind==="hp")
              hpAddPer += rate;
            else
              summary[data2.kind] = Number(summary[data2.kind])*rate;
          }
        }
      }
    }
  }
  summary.atk = Number(summary.atk)+Number(summary.baseAtk)*(atkAddPer/100);
  summary.def = Number(summary.def)+Number(summary.baseDef)*(defAddPer/100);
  summary.hp = Number(summary.hp)+Number(summary.baseHp)*(hpAddPer/100);
  return summary;
}

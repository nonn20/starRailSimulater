import chara from "../data/herta.json";
import {MakeResult} from "../makeresult.js";
import {MakeResultHaveSelect} from "../makeresult.js";
import * as commonCalc from "../commonCalc";
import {calcEnemy} from "../enemyCalc";
import { useState } from 'react';

export function calc(info){
  let star = document.getElementById("star").value;
  let skills = chara.Skills;
  info.addrate = 0;/*倍率系追加ダメージ*/
  info.adddmg = 0;/*定数系追加ダメージ*/

  /*デバフ箱*/
  let debuff = {
    bedmg : 0,/*被ダメージアップ*/
    defF : 0,/*防御ダウン*/
    taisei: 0,/*耐性ダウン,貫通*/
  }

  /*追加選択*/
  let select1 = document.getElementById("star1");
  let select2 = setSelect2();
  let select3 = document.getElementById("star4");

  if(star>=2){
    info.critrate = Number(info.critrate)+3*select2;
  }

  /*会心率調整*/
  if(info['critrate'] > 100) info['critrate'] = 100;

  /*基礎ダメージ計算*/
  let basic = commonCalc.calcBasic(skills.basic,info);
  let skill = commonCalc.calcSkill(skills.skill,info);
  let ult = commonCalc.calcUlt(skills.ultimate,info);
  let talent = commonCalc.calcTalent(skills.talent,info);

  /*結果箱*/
  let result,
  basicResult={},
  skillResult={},
  ultResult={},
  talentResult={},
  techniqueResult={},
  starEffect={};

  /*名前情報入力*/
  basicResult['name'] = chara.skillName[0];
  skillResult['name'] = chara.skillName[1];
  ultResult['name'] = chara.skillName[2];
  talentResult['name'] = chara.skillName[3];
  techniqueResult['name'] = chara.skillName[4];

  /*ダメージ調整(敵依存)*/
  basicResult['detail'] = [
    {
    name : chara.Skills.basic.explain[0],
    dmg : calcEnemy(info,basic[0],debuff,"basic")
    }
  ]
  if(select1!=null){
    if(select1.checked){
      basicResult['detail'].push(
        {
          name : chara.Skills.basic.explain[0],
          dmg : calcEnemy(info,0.4*info.atk,debuff,"huka")
        }
      )
    }
  }
  skillResult['detail'] = [
      {
      name : chara.Skills.skill.explain[0],
      dmg : calcEnemy(info,skill[0],debuff,"skill")
      }
  ]
  ultResult['detail'] = [
    {
      name : chara.Skills.ultimate.explain[0],
      dmg : calcEnemy(info,ult[0],debuff,"ult")
    }
  ]
  talentResult['detail'] = [
    {
      name : chara.Skills.talent.explain[0],
      dmg : calcEnemy(info,talent[0],debuff,"add")
    }
  ]
  if(select3!=null){
    if(select3.checked){
      let tmp = Number(info.dmgbuff);
      info.dmgbuff = tmp + 10;
      talentResult['detail'] = [
        {
          name : chara.Skills.talent.explain[0],
          dmg : calcEnemy(info,talent[0],debuff,"add")
        }
      ]
      info.dmgbuff = tmp;
    }
  }

  techniqueResult['detail'] = [
    {
      name:chara.Skills.technique.explain[0],
      dmg : {
        noCrit : " ",
        crit :" ",
        exp : 40
      }
    }
  ]

  result = [
    basicResult,
    skillResult,
    ultResult,
    talentResult,
    techniqueResult
  ]

  let addSelect =[];
  if(star >= 1){
    addSelect[0] = <>1凸効果:通常攻撃を行った時、指定した敵単体の残りHPが50%以下の場合、さらにヘルタの攻撃力40%分の氷属性付加ダメージを与える。<input type="checkbox" id="star1"></input></>
    if(star >= 2)
      addSelect.push(<div>2凸効果:天賦が1回発動するごとに、自身の会心率+3%、最大で5回累積できる。
      <input type="radio"  name="star2" id="star2" value="0"/>0
      <input type="radio"  name="star2" id="star2" value="1"/>1
      <input type="radio"  name="star2" id="star2" value="2"/>2
      <input type="radio"  name="star2" id="star2" value="3"/>3
      <input type="radio"  name="star2" id="star2" value="4"/>4
      <input type="radio"  name="star2" id="star2" value="5"/>5
      </div>);
    if(star >= 4)
      addSelect.push(<>4凸効果:天賦発動時の与ダメージ+10%<input type="checkbox" id="star4"></input></>);
  }
  result.push(addSelect);

  return MakeResultHaveSelect(result);

  /*2凸効果ラジオボタン取得*/
  function setSelect2(){
    let ele = document.getElementsByName("star2");
    if(ele.length == 0) return 0;
    let i;
    for(i=0;i<6;i++){
      if(ele[i].checked)
        break;
      if(i==5&&!ele[i].checked){
        i=0;
        break;
      }
    }

    return i;
  }
}

export default calc;

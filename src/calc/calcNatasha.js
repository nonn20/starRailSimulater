import chara from "../data/natasha.json";
import {MakeResult} from "../makeresult.js";
import {MakeResultHaveSelect} from "../makeresult.js";
import * as commonCalc from "../commonCalc";
import {calcEnemy} from "../enemyCalc";

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
  let select1 = document.getElementById("talentSelect");
  let select2 = document.getElementById("star1");
  let select3 = document.getElementById("star2");
  let select4 = document.getElementById("star6");

  /*天賦適用*/
  let talent = commonCalc.calcTalent(skills.talent,info);
  if(select1 != null){
    if(select1.checked)
      info.healBoost = Number(info.healBoost) + talent[0];
  }
  /*追加能力4*/
  if(document.getElementById("add4").checked){
    info.healBoost = Number(info.healBoost) + 10;
  }

  /*会心率調整*/
  if(info['critrate'] > 100) info['critrate'] = 100;

  /*基礎ダメージ計算*/
  let basic = commonCalc.calcBasic(skills.basic,info);
  let skill = commonCalc.calcSkill(skills.skill,info);
  let ult = commonCalc.calcUlt(skills.ultimate,info);

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
  if(select4 != null){
    if(select4.checked)
      basicResult.detail.push({
        name: "追加ダメージ(6凸効果)",
        dmg: calcEnemy(info,info.hp*0.4,debuff,"basic")
      })
  }
  skillResult['detail'] = [
    {
      name : chara.Skills.skill.explain[0],
      dmg : {
        noCrit : " ",
        crit :" ",
        exp : (skill[0]+skill[1])*(info.healBoost/100+1)
      }
    },
    {
      name : chara.Skills.skill.explain[1],
      dmg : {
        noCrit : " ",
        crit :" ",
        exp : (skill[2]+skill[3])*(info.healBoost/100+1)
      }
    }
  ]
  ultResult['detail'] = [
    {
      name : chara.Skills.ultimate.explain[0],
      dmg : {
        noCrit : " ",
        crit :" ",
        exp : (ult[0]+ult[1])*(info.healBoost/100+1)
      }
    }
  ]
  if(select3 != null){
    if(select3.checked)
      ultResult.detail.push({
        name: "持続回復量(2凸効果)",
        dmg: {
          noCrit : " ",
          crit :" ",
          exp : (info.hp*0.06+160)*(info.healBoost/100+1)
        }
      })
  }
  talentResult['detail'] = [
    {
      name : chara.Skills.talent.explain[0],
      dmg : {
        noCrit : " ",
        crit :" ",
        exp : talent[0]
      }
    }
  ]
  techniqueResult['detail'] = [
    {
      name:chara.Skills.technique.explain[0],
      dmg : calcEnemy(info,info.atk*0.8,debuff,"atk")
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
  addSelect[0] = <>天賦:残りHPが30%以下の味方に治癒を行う時、治癒量アップ<input type="checkbox" id="talentSelect"></input></>
  if(star >= 1){
    addSelect.push(<>1凸効果:攻撃を受けた後、残りHPが30%以下の場合、自身に治癒を1回行う<input type="checkbox" id="star1"></input></>);
    if(star >= 2)
      addSelect.push(<>2凸効果:必殺技を発動した時、残りHPが30%以下の味方に1ターン継続する持続治癒効果を付与する。<input type="checkbox" id="star2"></input></>);
    if(star >= 6)
      addSelect.push(<>6凸効果:通常攻撃を行った時、追加ダメージを与える<input type="checkbox" id="star6"></input></>);
  }
  result.push(addSelect);

  if(select2 != null){
    if(select2.checked){
      starEffect['detail'] = [
      {
        name: "回復量(1凸効果)",
        dmg: {
          noCrit : " ",
          crit :" ",
          exp : (info.hp*0.15+400)*(info.healBoost/100+1)
        }
      }]
      result.push(starEffect)
    }
  }

  return MakeResultHaveSelect(result);
}

export default calc;

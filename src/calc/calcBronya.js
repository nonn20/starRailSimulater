import chara from "../data/bronya.json";
import {MakeResult} from "../makeresult.js";
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

  /*追加能力*/
  if(document.getElementById("add6").checked) info.dmgbuff+=10;

  /*jsonとフォームから必要情報取得*/
  if(info['critrate'] > 100) info['critrate'] = 100;

  /*基礎ダメージ計算*/
  let basic = commonCalc.calcBasic(skills.basic,info);
  let skill = commonCalc.calcSkill(skills.skill,info);
  let ult = commonCalc.calcUlt(skills.ultimate,info);
  let talent = commonCalc.calcTalent(skills.talent,info);

  /*結果箱*/
  let result,
  basicResult={name : "姫子"},
  skillResult={name : "姫子"},
  ultResult={name : "姫子"},
  talentResult={name : "姫子"},
  techniqueResult={name : "姫子"};

  /*名前情報入力*/
  basicResult['name'] = chara.skillName[0];
  skillResult['name'] = chara.skillName[1];
  ultResult['name'] = chara.skillName[2];
  talentResult['name'] = chara.skillName[3];
  techniqueResult['name'] = chara.skillName[4];

  /*ダメージ調整(敵依存)*/
  if(document.getElementById("add2").checked){
    let tmp = info.critrate;
    info.critrate = 100;
    basicResult['detail'] = [
      {
      name : chara.Skills.basic.explain[0],
      dmg : calcEnemy(info,basic[0],debuff,"basic")
      }
    ]
    if(star >= 4)
      basicResult['detail'][1] ={
        name: "追加攻撃(4凸効果)",
        dmg : calcEnemy(info,basic[0]*0.8,debuff,"add")
      }
    info.critrate = tmp;
  }else{
    basicResult['detail'] = [
      {
      name : chara.Skills.basic.explain[0],
      dmg : calcEnemy(info,basic[0],debuff,"basic")
      }
    ]
    if(star >= 4)
      basicResult['detail'][1] ={
        name: "追加攻撃(4凸効果)",
        dmg : calcEnemy(info,basic[0]*0.8,debuff,"add")
      }
  }
  skillResult['detail'] = [
      {
      name : chara.Skills.skill.explain[0],
      dmg:{
        noCrit : " ",
        crit :" ",
        exp : skill[0]
      }
      }
  ]
  ultResult['detail'] = [
      {
      name : chara.Skills.ultimate.explain[0],
      dmg:{
        noCrit : " ",
        crit :" ",
        exp : ult[0]
      }
      },
      {
        name : chara.Skills.ultimate.explain[1],
        dmg:{
          noCrit : " ",
          crit :" ",
          exp : (ult[1]/100)*Number(info.critdmg)+ult[2]
        }
      }
  ]
  talentResult['detail'] = [
      {
      name : chara.Skills.talent.explain[0],
      dmg:{
        noCrit : " ",
        crit :" ",
        exp : talent[0]
      }
      }
  ]
  techniqueResult['detail'] = [
    {
      name:chara.Skills.technique.explain[0],
      dmg:{
        noCrit : " ",
        crit :" ",
        exp : "15"
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

  return MakeResult(result);
}

export default calc;

import chara from "../data/tingyun.json";
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
  skillResult['detail'] = [
      {
      name : chara.Skills.skill.explain[0],
      dmg : {
        noCrit : " ",
        crit :" ",
        exp : skill[0]
        }
      },
      {
        name : chara.Skills.skill.explain[1],
        dmg : {
          noCrit : " ",
          crit :" ",
          exp : skill[1]
          }
      },
      {
        name : chara.Skills.skill.explain[2],
        dmg : calcEnemy(info,skill[2],debuff,"skill")
      }
  ]
  if(star >= 4){
    skillResult.detail[2] = {
      name : chara.Skills.skill.explain[2],
      dmg : calcEnemy(info,skill[2]+0.2*info.atk,debuff,"huka")
    }
  }
  ultResult['detail'] = [
    {
      name : chara.Skills.ultimate.explain[0],
      dmg : {
        noCrit : " ",
        crit :" ",
        exp : ult[0]
      }
    }
  ]
  talentResult['detail'] = [
    {
      name : chara.Skills.talent.explain[0],
      dmg : calcEnemy(info,talent[0],debuff,"huka")
    }
  ]
  techniqueResult['detail'] = [
    {
      name:chara.Skills.technique.explain[0],
      dmg : {
        noCrit : " ",
        crit :" ",
        exp : " "
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

import chara from "../data/march7.json";
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

  /*会心率調整*/
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
  techniqueResult={name : "姫子"},
  starEffect={name : "姫子"};

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
        exp : skill[0]+skill[1]
      }
      }
  ]
  ultResult['detail'] = [
    {
      name : chara.Skills.ultimate.explain[0],
      dmg : calcEnemy(info,ult[0],debuff,"ult")
    },
    {
      name : chara.Skills.ultimate.explain[1],
      dmg : calcEnemy(info,ult[1],debuff,"ult")
    }
  ]
  if(star >=4)
  talentResult['detail'] = [
    {
      name : chara.Skills.talent.explain[0],
      dmg : calcEnemy(info,talent[0]+(0.3*info.def),debuff,"atk")
    }
  ]
  else
  talentResult['detail'] = [
    {
      name : chara.Skills.talent.explain[0],
      dmg : calcEnemy(info,talent[0],debuff,"atk")
    }
  ]
  techniqueResult['detail'] = [
    {
      name:chara.Skills.technique.explain[0],
      dmg: calcEnemy(info,0.5*info.atk,debuff,"huka")
    }
  ]

  result = [
    basicResult,
    skillResult,
    ultResult,
    talentResult,
    techniqueResult
  ]

  if(star >=2){
    starEffect['detail'] = [
      {
        name: "バリア量(2凸効果)",
        dmg : {
          noCrit : " ",
          crit :" ",
          exp : info.def*0.24+32
        }
      }
    ]
    if(star >= 6)
    starEffect['detail'][1] =
      {
        name: "回復量(6凸効果)",
        dmg : {
          noCrit : " ",
          crit :" ",
          exp : info.hp*(1+Number(info.healBoost)/100)*0.04+106
        }
      }
    result[result.length] = starEffect;
  }

  return MakeResult(result);
}

export default calc;

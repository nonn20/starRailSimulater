import chara from "../data/serval.json";
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

  /*追加選択*/
  let select1 = document.getElementById("star6");
  if(select1 != null){
    if(select1.checked){
      info.dmgbuff = Number(info.dmgbuff)+30;
    }
  }

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
      dmg : calcEnemy(info,basic[0],debuff,"atk")
      }
  ]
  if(star>=1){
    basicResult['detail'] = [
      {
        name : chara.Skills.basic.explain[0],
        dmg : calcEnemy(info,basic[0],debuff,"basic")
      },
      {
        name : "ランダムダメージ",
        dmg : calcEnemy(info,basic[0]*0.6,debuff,"basic")
      }
    ]
  }
  skillResult['detail'] = [
      {
      name : chara.Skills.skill.explain[0],
      dmg : calcEnemy(info,skill[0],debuff,"skill")
      },
      {
        name : chara.Skills.skill.explain[1],
        dmg : calcEnemy(info,skill[1],debuff,"skill")
      },
      {
        name : chara.Skills.skill.explain[2],
        dmg : calcEnemy(info,skill[2],debuff,"jizoku")
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
      dmg :  calcEnemy(info,talent[0],debuff,"atk")
    }
  ]
  techniqueResult['detail'] = [
    {
      name:chara.Skills.technique.explain[0],
      dmg : calcEnemy(info,info.atk*50/100,debuff,"atk")
    },
    {
      name:chara.Skills.technique.explain[1],
      dmg : calcEnemy(info,info.atk*50/100,debuff,"jizoku")
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
  if(star >= 6){
    addSelect.push(<>感電状態の敵に対するセーバルの与ダメージ+30%<input type="checkbox" id="star6"/></>);
  }
  result.push(addSelect);

  return MakeResultHaveSelect(result);
}

export default calc;

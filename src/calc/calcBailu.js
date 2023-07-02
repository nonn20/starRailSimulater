import chara from "../data/bailu.json";
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
  let select2 = document.getElementById("star2");
  if(select2 != null){
    if(select2.checked)
      info.healBoost = Number(info.healBoost) + 15;
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
        exp : (skill[0]+skill[1])*(info.healBoost/100+1)
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
  talentResult['detail'] = [
    {
      name : chara.Skills.talent.explain[0],
      dmg : {
        noCrit : " ",
        crit :" ",
        exp : (talent[0]+talent[1])*(info.healBoost/100+1)
      }
    },
    {
      name : chara.Skills.talent.explain[1],
      dmg : {
        noCrit : " ",
        crit :" ",
        exp : (talent[2]+talent[3])*(info.healBoost/100+1)
      }
    }
  ]
  techniqueResult['detail'] = [
    {
      name:"味方全体に「生生」を付与",
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

  let addSelect =[];
  if(star >= 2){
    addSelect.push(<>2凸効果:必殺技を発動した後、白露の治癒量+15%<input type="checkbox" id="star2"></input></>);
  }
  result.push(addSelect);

  return MakeResultHaveSelect(result);
}

export default calc;

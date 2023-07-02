import chara from "../data/sampo.json";
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
    bedmg : info.bedmg,/*被ダメージアップ*/
    defF : info.defF,/*防御ダウン*/
    taisei: info.taisei,/*耐性ダウン,貫通*/
  }

  /*追加選択*/
  let select1 = document.getElementById("star6");

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
      dmg : calcEnemy(info,skill[0],debuff,"skill")
      },
      {
      name : chara.Skills.skill.explain[1],
      dmg : calcEnemy(info,skill[0],debuff,"skill")
      }
  ]
  ultResult['detail'] = [
    {
      name : chara.Skills.ultimate.explain[0],
      dmg : calcEnemy(info,ult[0],debuff,"ult")
    },
    {
      name : chara.Skills.ultimate.explain[1],
      dmg : {
        noCrit : " ",
        crit :" ",
        exp : ult[1]
      }
    }
  ]
  talentResult['detail'] = [
    {
      name : chara.Skills.talent.explain[0],
      dmg : calcEnemy(info,talent[0],debuff,"jizoku")
    }
  ]
  if(select1 != null){
    if(select1.checked){
      let tmp = info.dmgbuff;
      info.dmgbuff = Number(info.dmgbuff) + 15;
      talentResult['detail'] = [
        {
          name : chara.Skills.talent.explain[0],
          dmg : calcEnemy(info,talent[0],debuff,"jizoku")
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
        exp : 25
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
  if(star >= 6){
    addSelect.push(<>6凸効果:天賦が付与した風化状態の持続ダメージ倍率+15%<input type="checkbox" id="star6"></input></>);
  }
  result.push(addSelect);

  return MakeResultHaveSelect(result);
}

export default calc;

import chara from "../data/pela.json";
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
  let select1 = document.getElementById("star6");

  /*追加効果*/
  if(document.getElementById("add2").checked)
    info.dmgbuff = Number(info.dmgbuff) + 20;
  if(document.getElementById("add6").checked)
    info.dmgbuff = Number(info.dmgbuff) + 20;

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
    },
  ]
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
      dmg : calcEnemy(info,0.8*info.atk,debuff,"atk")
    },
    {
      name:chara.Skills.technique.explain[1],
      dmg : {
        noCrit : " ",
        crit :" ",
        exp : -20
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
    addSelect.push(<>6凸効果:攻撃を行った後、敵がデバフ状態の場合、氷属性付加ダメージを与える<input class="form-check-input" type="checkbox" id="star1"></input></>);
  }
  result.push(addSelect);

  if(select1 != null){
    if(select1.checked){
      starEffect['detail'] = [
        {
          name: "付加ダメージ(6凸効果)",
          dmg: calcEnemy(info,0.4*info.atk,debuff,"huka")
        }
      ]
    }
  }

  return MakeResultHaveSelect(result);
}

export default calc;

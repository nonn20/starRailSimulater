import chara from "../data/danHeng.json";
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
  let select2 = document.getElementById("star1");
  if(select2 != null){
    if(select2.checked)
      info.crit = Number(info.crit) + 12;
  }

  /*会心率調整*/
  if(info['critrate'] > 100) info['critrate'] = 100;

  /*基礎ダメージ計算*/
  let basic = commonCalc.calcBasic(skills.basic,info);
  let skill = commonCalc.calcSkill(skills.skill,info);
  let ult = commonCalc.calcUlt(skills.ultimate,info);
  let talent = commonCalc.calcTalent(skills.talent,info);

  /*追加選択*/
  let select1 = document.getElementById("talentSelect");
  if(select1 != null){
    if(select1.checked)
      info.taisei += talent[0];
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
    {
      name : "単体ダメージ（減速状態）",
      dmg : calcEnemy(info,info.atk*ult[1]/100+ult[0],debuff,"atk")
    }
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
  addSelect[0] = <>天賦：丹恒が味方スキルのターゲットになった時、次の攻撃の風属性耐性貫通を得る<input type="checkbox" id="talentSelect"></input></>
  if(star >= 1){
    addSelect.push(<>1凸効果:攻撃した敵の残りHPが50%以上の場合、会心率+12%<input type="checkbox" id="star1"></input></>);
  }
  result.push(addSelect);

  return MakeResultHaveSelect(result);
}

export default calc;

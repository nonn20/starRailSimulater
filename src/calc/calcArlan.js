
import chara from "../data/arlan.json";
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
  let select1 = document.getElementById("star1");
  let select2 = document.getElementById("star6");

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
    dmg : calcEnemy(info,skill[0],debuff,"skill")
    }
  ]
  if(select1!=null){
    if(select1.checked){
      let tmp = info.dmgbuff;
      info.dmgbuff = Number(info.dmgbuff)+10;
      skillResult['detail'] = [
        {
        name : chara.Skills.skill.explain[0],
        dmg : calcEnemy(info,skill[0],debuff,"skill")
        }
      ]
      info.dmgbuff = tmp;
    }
  }

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
  if(select2!=null){
    if(select2.checked){
      let tmp = info.dmgbuff;
      info.dmgbuff = Number(info.dmgbuff)+20;
      ultResult['detail'] = [
        {
          name : chara.Skills.ultimate.explain[0],
          dmg : calcEnemy(info,ult[0],debuff,"atk")
        },
        {
          name : chara.Skills.ultimate.explain[1],
          dmg : calcEnemy(info,ult[0],debuff,"atk")
        }
      ]
      info.dmgbuff = tmp;
    }
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
      dmg : calcEnemy(info,80*info.atk/100,debuff,"atk")
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
    addSelect.push(<>1凸効果:残りHPが50%以下の敵に対する戦闘スキルの与ダメージ+10%。<input type="checkbox" id="star1"></input></>);
  }
  if(star >= 6){
    addSelect.push(<>6凸効果:残りHPが50%以下の時、必殺技の与ダメージ+20%、隣接する敵へのダメージ倍率がメインターゲットと同じになる。<input type="checkbox" id="star6"></input></>);
  }
  result.push(addSelect);

  if(document.getElementById("add2").checked)
  {
    starEffect['detail'] = [
      {
        name: "昇格2効果: 回復量",
        dmg : {
          noCrit : " ",
          crit :" ",
          exp : info.hp*0.2*(1+info.healBoost/100)
        }
      }
    ]
    result.push(starEffect);
  }

  return MakeResultHaveSelect(result);
}

export default calc;

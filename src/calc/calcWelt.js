import chara from "../data/Welt.json";
import {MakeResult} from "../makeresult.js";
import * as commonCalc from "../commonCalc";
import {calcEnemy} from "../enemyCalc";

export function calc(info){
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
  if(document.getElementById("add2").checked) info.bedmg+=12;
  if(document.getElementById("add6").checked) info.dmgbuff+=15;

  /*jsonとフォームから必要情報取得*/
  if(info['critrate'] > 100) info['critrate'] = 100;

  /*基礎ダメージ計算*/
  let basic = commonCalc.calcBasic(skills.basic,info);
  let skill = commonCalc.calcSkill(skills.skill,info);
  let ult = commonCalc.calcUlt(skills.ultimate,info);
  let talent = commonCalc.calcTalent(skills.talent,info);

  /*凸効果*/
  let star = document.getElementById("star").value;
  if(star >= 6){
    skill[1]*=1.5;
  }

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
      dmg : calcEnemy(info,skill[1],debuff,"skill")
      }
  ]
  ultResult['detail'] = [
      {
      name : chara.Skills.ultimate.explain[0],
      dmg : calcEnemy(info,ult[0]*(1+info.addrate)+info.adddmg,debuff,"ult")
      }
  ]
  if(star>=1)
    talentResult['detail'] = [
      {
        name : chara.Skills.talent.explain[0],
        dmg : calcEnemy(info,talent[0],debuff,"huka")
      },
      {
      name : "1凸効果:付加ダメージ(通常攻撃)",
      dmg : calcEnemy(info,talent[0]+basic[0]*0.5,debuff,"basic")
      },
      {
      name : "1凸効果:付加ダメージ(戦闘スキル)",
      dmg : calcEnemy(info,talent[0]+skill[0]*0.8,debuff,"skill")
      }
  ]
  else
  talentResult['detail'] = [
      {
      name : chara.Skills.talent.explain[0],
      dmg : calcEnemy(info,talent[0],debuff,"huka")
      }
  ];
  techniqueResult['detail'] = [
    {
      name:"行動順遅延",
      dmg:{
        noCrit : " ",
        crit :" ",
        exp : "20"
      }
    },
    {
      name:"速度デバフ",
      dmg:{
        noCrit : " ",
        crit :" ",
        exp : "-10"
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

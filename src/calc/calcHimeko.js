import chara from "../data/himeko.json";
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
  if(document.getElementById("add2").checked) info.speed+=20;
  if(document.getElementById("add6").checked) info.critrate+=15;

  /*凸効果*/
  let star = document.getElementById("star").value;
  if(star >= 2){
    info.dmgbuff = 15;
  }

  /*jsonとフォームから必要情報取得*/
  if(info['critrate'] > 100) info['critrate'] = 100;

  /*基礎ダメージ計算*/
  let basic = commonCalc.calcBasic(skills.basic,info);
  let skill = commonCalc.calcSkill(skills.skill,info);
  let ult = commonCalc.calcUlt(skills.ultimate,info);
  let talent = commonCalc.calcTalent(skills.talent,info);

  /*昇格4*/
  if(document.getElementById("add4").checked){
    for(let i=0;i<skill.length;i++){
      skill[i]*=1.2;
    };
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
  /*凸効果*/
  if(star >=6)
    ultResult['detail'] = [
      {
      name : chara.Skills.ultimate.explain[0],
      dmg : calcEnemy(info,ult[0]*(1+info.addrate+0.8)+info.adddmg,debuff,"ult")
      }
    ]
  else
  ultResult['detail'] = [
      {
      name : chara.Skills.ultimate.explain[0],
      dmg : calcEnemy(info,ult[0]*(1+info.addrate)+info.adddmg,debuff,"ult")
      }
  ]
  talentResult['detail'] = [
      {
      name : chara.Skills.talent.explain[0],
      dmg : calcEnemy(info,talent[0],debuff,"add")
      }
  ]
  techniqueResult['detail'] = [
    {
      name:"炎属性被ダメージデバフ",
      dmg:{
        noCrit : " ",
        crit :" ",
        exp : "10"
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

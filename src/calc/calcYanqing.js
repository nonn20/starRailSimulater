import chara from "../data/yanqing.json";
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

  /*基礎ダメージ計算*/
  let basic = commonCalc.calcBasic(skills.basic,info);
  let skill = commonCalc.calcSkill(skills.skill,info);
  let ult = commonCalc.calcUlt(skills.ultimate,info);
  let talent = commonCalc.calcTalent(skills.talent,info);

  /*追加選択*/
  let select1 = document.getElementById("select1");
  let hitugi = document.getElementById("hitugi");
  let star4 = document.getElementById("star4");

  if(select1!=null){
    if(select1.checked){
      info.critrate = Number(info.critrate)+talent[0];
      info.critdmg = Number(info.critdmg)+talent[1];
    }
  }

  if(hitugi!=null){
    if(hitugi.checked)
      info.dmgbuff = Number(info.dmgbuff)+30;
  }

  if(star4!=null){
    if(star4.checked)
      info.taisei = Number(info.taisei)+12;
  }

  /*会心率調整*/
  if(info['critrate'] > 100) info['critrate'] = 100;

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

  let tmp = info.critrate;
  info.critrate = Number(info.critrate)+60;
  if(info['critrate'] > 100) info['critrate'] = 100;
  ultResult['detail'] = [
    {
      name : chara.Skills.ultimate.explain[0],
      dmg : calcEnemy(info,ult[1],debuff,"ult")
    }
  ]
  if(select1!=null){
    if(select1.checked){
      let tmp1 = info.critdmg;
      info.critdmg = Number(info.critdmg)+talent[1];
      ultResult['detail'] = [
        {
          name : chara.Skills.ultimate.explain[0],
          dmg : calcEnemy(info,ult[1],debuff,"ult")
        }
      ]
      info.critdmg = tmp1;
    }
  }
  info.critrate = tmp;

  talentResult['detail'] = [
    {
      name : chara.Skills.talent.explain[0],
      dmg : {
        noCrit : " ",
        crit :" ",
        exp : talent[0]
      }
    },
    {
      name : chara.Skills.talent.explain[1],
      dmg : {
        noCrit : " ",
        crit :" ",
        exp : talent[1]
      }
    },
    {
      name : chara.Skills.talent.explain[2],
      dmg : {
        noCrit : " ",
        crit :" ",
        exp : talent[2]
      }
    },
    {
      name : chara.Skills.talent.explain[0],
      dmg : calcEnemy(info,talent[3],debuff,"add")
    },
    {
      name : chara.Skills.talent.explain[0],
      dmg : calcEnemy(info,talent[4],debuff,"huka")
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

  let addSelect =[];
  addSelect.push(<>智剣連心<input class="form-check-input" type="checkbox" id="select1"></input></>);
  addSelect.push(<>秘技:次の戦闘開始時、残りHPが50%以上の敵に対して、与ダメージ+30%<input class="form-check-input" type="checkbox" id="hitugi"></input></>)
  if(star >= 4){
    addSelect.push(<>4凸効果:自身の残りHPが80%以上の時、自身の氷属性耐性貫通+12%。<input class="form-check-input" type="checkbox" id="star4"></input></>);
  }

  result.push(addSelect);

  if(document.getElementById("add2")){
    starEffect['detail'] = [
      {
        name: "昇格2:付加ダメージ(氷属性に弱点がある敵)",
        dmg: calcEnemy(info,info.atk*0.3,debuff,"huka")
      }
    ]
    result.push(starEffect)
  }


  return MakeResultHaveSelect(result);
}

export default calc;

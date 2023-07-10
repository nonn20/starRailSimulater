import chara from "../data/seele.json";
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
  let star1 = document.getElementById("star1");
  let star6 = document.getElementById("star6");
  let add4 = document.getElementById("add4");
  if(select1!=null){
    if(select1.checked){
      info.dmgbuff = Number(info.dmgbuff)+talent[0];
      if(add4.checked)
        info.taisei = Number(info.taisei)+20;
    }
  }

  if(star1!=null){
    if(star1.checked)
      info.critrate = Number(info.critrate) + 15;
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
      dmg : calcEnemy(Object.assign({}, info),basic[0],debuff,"basic")
      }
  ]
  skillResult['detail'] = [
      {
      name : chara.Skills.skill.explain[0],
      dmg : calcEnemy(Object.assign({}, info),skill[0],debuff,"skill")
      }
  ]
  ultResult['detail'] = [
    {
      name : chara.Skills.ultimate.explain[0],
      dmg : calcEnemy(Object.assign({}, info),ult[0],debuff,"ult")
    }
  ]
  if(star6!=null){
    if(star6.checked){
      ultResult.detail.push(
        {
          name : "6凸効果付加ダメージ",
          dmg : calcEnemy(info,ult[0]*0.15,debuff,"huka")
        }
      )
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
  addSelect.push(<>増幅状態<input type="checkbox" id="select1"></input></>);
  if(star >= 1){
    addSelect.push(<>1凸効果:残りHPが80%以下の敵にダメージを与える時、会心率+15%。<input type="checkbox" id="star1"></input></>);
  }
  if(star>=6){
    addSelect.push(<>6凸効果:乱れ蝶状態の敵が攻撃を受けた後、ゼーレの必殺技ダメージ15%分の量子属性付加ダメージを1回受ける。<input type="checkbox" id="star6"></input></>);
  }
  result.push(addSelect);

  return MakeResultHaveSelect(result);
}

export default calc;

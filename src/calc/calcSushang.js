import chara from "../data/sushang.json";
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
  let select1 = document.getElementById("select1");
  if(select1 != null){
    let index = select1.selectedIndex;
    select1 = select1.options[index].value;
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
      dmg : calcEnemy(info,skill[0],debuff,"skill")
    },
    {
      name : chara.Skills.skill.explain[1],
      dmg : calcEnemy(info,skill[1],debuff,"huka")
    }
  ]
  if(select1!=null){
    let tmp = info.dmgbuff;
    info.dmgbuff = Number(info.dmgbuff )+select1*2
    skillResult.detail[1]={
      name : chara.Skills.skill.explain[1],
      dmg : calcEnemy(info,skill[1],debuff,"huka")
    }
    info.dmgbuff = tmp;
  }
  ultResult['detail'] = [
    {
      name : chara.Skills.ultimate.explain[0],
      dmg :  calcEnemy(info,ult[0],debuff,"ult")
    },
    {
      name:chara.Skills.ultimate.explain[1],
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
      dmg : calcEnemy(info,info.atk*0.8,debuff,"atk")
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
  if(document.getElementById("add4").checked){
    addSelect.push(<>昇格4:「剣勢」を発動するたび、「剣勢」の与ダメージ+2%。最大10層
    <select id="select1">
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select></>);
  }
  result.push(addSelect);

  return MakeResultHaveSelect(result);
}

export default calc;

import chara from "../data/qingque.json";
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

  /*会心率調整*/
  if(info['critrate'] > 100) info['critrate'] = 100;

  /*基礎ダメージ計算*/
  let basic = commonCalc.calcBasic(skills.basic,info);
  let skill = commonCalc.calcSkill(skills.skill,info);
  let ult = commonCalc.calcUlt(skills.ultimate,info);
  let talent = commonCalc.calcTalent(skills.talent,info);

  /*追加選択*/
  let select1 = setSelectS();
  info.dmgbuff = Number(info.dmgbuff)+select1*skill[0];

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
      },
      {
        name : chara.Skills.basic.explain[1],
        dmg : calcEnemy(info,basic[1],debuff,"basic")
      },
      {
        name : chara.Skills.basic.explain[2],
        dmg : calcEnemy(info,basic[2],debuff,"basic")
      }
  ]
  skillResult['detail'] = [
    {
      name : chara.Skills.skill.explain[0],
      dmg : {
        noCrit : " ",
        crit :" ",
        exp : skill[0]*select1
      }
    }
  ]
  if(document.getElementById("add4").checked){
    skillResult['detail'] = [
      {
        name : chara.Skills.skill.explain[0],
        dmg : {
          noCrit : " ",
          crit :" ",
          exp : skill[0]+10
        }
      }
    ]
  }

  ultResult['detail'] = [
    {
      name : chara.Skills.ultimate.explain[0],
      dmg : calcEnemy(info,ult[0],debuff,"ult")
    }
  ];

  if(star>=1){
    let tmp = info.dmgbuff;
    info.dmgbuff = Number(info.dmgbuff+10);
    ultResult['detail'] = [
      {
        name : chara.Skills.ultimate.explain[0],
        dmg : calcEnemy(info,ult[0],debuff,"ult")
      }
    ];
    info.dmgbuff = tmp;
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
    addSelect.push(<div>牌を2枚取り、自身の与ダメージアップ。4層まで累積できる。
      <input type="radio"  id="selectS" name="selectS"value="0"/>0
      <input type="radio"  id="selectS" name="selectS"value="1"/>1
      <input type="radio"  id="selectS" name="selectS"value="2"/>2
      <input type="radio"  id="selectS" name="selectS"value="3"/>3
      <input type="radio"  id="selectS" name="selectS"value="4"/>4
      </div>);
  result.push(addSelect);

  return MakeResultHaveSelect(result);
}

/*スキル効果ラジオボタン取得*/
function setSelectS(){
  let ele = document.getElementsByName("selectS");
  if(ele.length == 0) return 0;
  let i;
  for(i=0;i<5;i++){
    if(ele[i].checked)
      break;
    if(i==4&&!ele[i].checked){
      i=0;
      break;
    }
  }
  return i;
}

export default calc;

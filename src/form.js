import React from 'react';
import { useState } from 'react';
import data from './data.json';
import {DisplayBuffs} from './BuffStatus'
import {DisplayWeapons} from './BuffStatus'
import {AddStatus} from './BuffStatus'
//import {Calculate} from './App.js';

export function Form(){
  const [traceBasic,setBasic] = useState(1);
  const [traceSkill,setSkill] = useState(1);
  const [traceUlt,setUlt] = useState(1);
  const [traceTalent,setTalent] = useState(1);
  const [result,setResult] = useState();

  return(
    <div className="d-flex flex-row justify-content-between" onChange={gotoCalc}>
      <form name="form"  onChange={gotoCalc}>
        <select id="chara">
          <option value="0">姫子</option>
          <option value="1">ヴェルト</option>
          <option value="2">ブローニャ</option>
          <option value="3">ジェパード</option>
          <option value="4">クラーラ</option>
          <option value="5">彦卿</option>
          <option value="6">白露</option>
          <option value="7">ゼーレ</option>
          <option value="8">三月なのか</option>
          <option value="9">丹恒</option>
          <option value="10">アーラン</option>
          <option value="11">アスター</option>
          <option value="12">ヘルタ</option>
          <option value="13">セーバル</option>
          <option value="14">ナターシャ</option>
          <option value="15">ペラ</option>
          <option value="16">サンポ</option>
          <option value="17">フック</option>
          <option value="18">青雀</option>
          <option value="19">停雲</option>
          <option value="20">素裳</option>
          <option value="21">サンポ</option>
          <option value="22">サンポ</option>
        </select>

        <div id="status">
          <div>レベル</div>
            <input type="text" id="level"></input>
          <div>基礎HP</div>
            <input type="text" id="baseHp" placeholder='HP'></input>
          <div>HP</div>
            <input type="text" id="hp" placeholder='HP'></input>
          <div>基礎攻撃力</div>
            <input type="text" id="baseAtk"></input>
          <div>攻撃力</div>
            <input type="text" id="atk"></input>
          <div>ダメージバフ</div>
            <input type="text" id="dmgbuff"></input>
          <div>会心率</div>
            <input type="text" id="critrate" ></input>
          <div>会心ダメージ</div>
            <input type="text" id="critdmg"></input>
          <div>速度</div>
            <input type="text" id="speed" ></input>
          <div>基礎防御力</div>
            <input type="text" id="baseDef" placeholder='HP'></input>
          <div>防御力</div>
            <input type="text" id="def"></input>
          <div>撃破特攻</div>
            <input type="text" id="breakEf"></input>
          <div>回復量</div>
            <input type="text" id="heal"></input>
          <div>エネルギー回復</div>
            <input type="text" id="err" ></input>
          <div>効果命中</div>
            <input type="text" id="efHitRate"></input>
          <div>効果抵抗</div>
            <input type="text" id="EfRES"></input>

          <p>軌跡Lvl</p>
          <div>通常攻撃</div>
            <input type="number" id="traceBasic" value={traceBasic} min="1" max="6" onChange={function(e){setBasic(e.target.value);}}></input>
          <div>戦闘スキル</div>
            <input type="number" id="traceSkill" value={traceSkill}  min="1" max="10" onChange={function(e){setSkill(e.target.value);}} ></input>
          <div>必殺技</div>
            <input type="number" id="traceUlt" value={traceUlt}  min="1" max="10" onChange={function(e){setUlt(e.target.value);}}></input>
          <div>天賦</div>
            <input type="number" id="traceTalent" value={traceTalent}  min="1" max="10" onChange={function(e){setTalent(e.target.value);}}></input>
        </div>
        <div>
          <p>追加能力</p>
          <div>昇格2</div>
          <input type="checkbox" id="add2"></input>
          <div>昇格4</div>
          <input type="checkbox" id="add4"></input>
          <div>昇格6</div>
          <input type="checkbox" id="add6"></input>
          <div>星魂Level</div>
          <input type="text" id="star"></input>
        </div>
      </form>
      <div>
        <DisplayBuffs onChange={gotoCalc} key={'buff'}/>
        <DisplayWeapons onChange={gotoCalc} key={'weapon'}/>
      </div>
      <div onChange={gotoCalc}>{result}</div>
    </div>
  );

  function gotoCalc(){
    Calculate();
  }

  function Calculate(){
    //const [traceBasi,setBasic] = useState(1);
    const summaryState=()=>{
      let summary = {
        level: document.getElementById("level").value,
        baseHp:document.getElementById("baseHp").value,//基礎HP
        hp: document.getElementById("hp").value,
        baseAtk:document.getElementById("baseAtk").value,//基礎攻撃力
        atk:document.getElementById("atk").value,
        dmgbuff:document.getElementById("dmgbuff").value,
        critrate:document.getElementById("critrate").value,
        critdmg:document.getElementById("critdmg").value,
        speed:document.getElementById("speed").value,
        baseDef:document.getElementById("baseDef").value,//基礎防御力
        def:document.getElementById("def").value,
        breakEf:document.getElementById("breakEf").value,
        healBoost:document.getElementById("heal").value,
        err:document.getElementById("err").value,
        efHitRate:document.getElementById("efHitRate").value,
        efRES:document.getElementById("EfRES").value,
        buffBasic: 0,
        buffSkill: 0,
        buffUlt: 0,
        buffAdd: 0,//追加攻撃
        buffHuka: 0,//付加ダメージ
        buffJizoku: 0,//持続ダメージ
        atkSkill: 0,
        bedmg : 0,/*被ダメージアップ*/
        defF : 0,/*防御ダウン*/
        taisei: 0,/*耐性ダウン,貫通*/
        ultCritdmg: 0//必殺技の会心ダメージ
      };
      return summary;
    }

    let select = document.getElementById("chara");
    let index = select.selectedIndex;
    let id = select.options[index].value;/*選択キャラid*/

    /*フォームをまとめる*/
    let summary = summaryState();

    /*バフを追加*/
    summary = AddStatus(summary);

    return loadImport(summary,id);
  }

  async function loadImport(summary,id){
    const module = await import("./calc/calc"+data.index[id]+".js");
    setResult(module.calc(summary));
  }
}

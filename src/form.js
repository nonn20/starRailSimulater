import React from 'react';
import { useState } from 'react';
import data from './data.json';
import {DisplayBuffs} from './BuffStatus'
import {DisplayDebuffs} from './BuffStatus'
import {DisplayWeapons} from './BuffStatus'
import {AddStatus} from './BuffStatus'
//import {Calculate} from './App.js';

export function Form(){
  const [traceBasic,setBasic] = useState(1);
  const [traceSkill,setSkill] = useState(1);
  const [traceUlt,setUlt] = useState(1);
  const [traceTalent,setTalent] = useState(1);
  const [result,setResult] = useState();
  const [Elevel,setElevel] = useState(90);
  const [level,setLevel] = useState(90);

  return(
    <div class="d-flex flex-wrap bd-highlight">
    <div class="p-2 bd-highlight flex-fill ">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a href="#form" class="nav-link active" data-bs-toggle="tab">キャラ</a>
        </li>
        <li class="nav-item">
          <a href="#form2" class="nav-link" data-bs-toggle="tab">敵</a>
        </li>
        <li class="nav-item">
          <a href="#form3" class="nav-link" data-bs-toggle="tab">天賦</a>
        </li>
        <li class="nav-item">
          <a href="#buffs" class="nav-link" data-bs-toggle="tab">バフ、デバフ</a>
        </li>
        <li class="nav-item">
          <a href="#cone" class="nav-link" data-bs-toggle="tab">光円錐</a>
        </li>
      </ul>
      <div className="tab-content">
        <form name="form" id="form" class="tab-pane active" onChange={gotoCalc}>
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

          <div id="status" class="d-flex bd-highlight flex-wrap">
            <div class="form-floating mb-3 p-2 flex-fill bd-highlight">
              <input type="number" class="form-control" id="level" value = {level} onChange={function(e){setLevel(e.target.value);}} />
              <label for="level">レベル</label>
            </div>
            <div class="form-floating mb-3 p-2 flex-fill bd-highlight">
              <input type="number" class="form-control" id="baseHp" placeholder="baseHP"/>
              <label for="baseHp">基礎HP</label>
            </div>
            <div class="form-floating mb-3 p-2 flex-fill bd-highlight">
              <input type="number" class="form-control" id="hp" placeholder="baseHP"/>
              <label for="hp">HP</label>
            </div>
            <div class="form-floating mb-3 p-2 flex-fill bd-highlight">
              <input type="number" class="form-control" id="baseAtk" placeholder="baseHP"/>
              <label for="baseAtk">基礎攻撃力</label>
            </div>
            <div class="form-floating mb-3 p-2 flex-fill bd-highlight">
              <input type="number" class="form-control" id="atk" placeholder="baseHP"/>
              <label for="atk">攻撃力</label>
            </div>
            <div class="form-floating mb-3 p-2 flex-fill bd-highlight">
              <input type="number" class="form-control" id="dmgbuff" placeholder="baseHP"/>
              <label for="dmgbuff">ダメージバフ</label>
            </div>
            <div class="form-floating mb-3 p-2 flex-fill bd-highlight">
              <input type="number" class="form-control" id="critrate" placeholder="baseHP"/>
              <label for="critrate">会心率</label>
            </div>
            <div class="form-floating mb-3 p-2 flex-fill bd-highlight">
              <input type="number" class="form-control" id="critdmg" placeholder="baseHP"/>
              <label for="critdmg">会心ダメージ</label>
            </div>
            <div class="form-floating mb-3 p-2 flex-fill bd-highlight">
              <input type="number" class="form-control" id="speed" placeholder="baseHP"/>
              <label for="speed">速度</label>
            </div>
            <div class="form-floating mb-3 p-2 flex-fill bd-highlight">
              <input type="number" class="form-control" id="baseDef" placeholder="baseHP"/>
              <label for="baseDef">基礎防御力</label>
            </div>
            <div class="form-floating mb-3 p-2 flex-fill bd-highlight">
              <input type="number" class="form-control" id="def" placeholder="baseHP"/>
              <label for="def">防御力</label>
            </div>
            <div class="form-floating mb-3 p-2 flex-fill bd-highlight">
              <input type="number" class="form-control" id="breakEf" placeholder="baseHP"/>
              <label for="breakEf">撃破特攻</label>
            </div>
            <div class="form-floating mb-3 p-2 flex-fill bd-highlight">
              <input type="number" class="form-control" id="heal" placeholder="baseHP"/>
              <label for="heal">回復量</label>
            </div>
            <div class="form-floating mb-3 p-2 flex-fill bd-highlight">
              <input type="number" class="form-control" id="err" placeholder="baseHP"/>
              <label for="err">エネルギー回復</label>
            </div>
            <div class="form-floating mb-3 p-2 flex-fill bd-highlight">
              <input type="number" class="form-control" id="efHitRate" placeholder="baseHP"/>
              <label for="efHitRate">効果命中</label>
            </div>
            <div class="form-floating mb-3 p-2 flex-fill bd-highlight">
              <input type="number" class="form-control" id="EfRES" placeholder="baseHP"/>
              <label for="EfRES">効果抵抗</label>
            </div>
          </div>
          <div>

          </div>
        </form>
        <form name="form" id="form2" class="tab-pane" onChange={gotoCalc}>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="zinsei"/>
            <label class="form-check-label" for="zinsei">
              靭性
            </label>
          </div>
          <div>敵レベル</div>
            <input type="text" id="Elevel" value = {Elevel}onChange={function(e){setElevel(e.target.value);}} ></input>
          <div>敵耐性</div>
            <input type="text" id="Etaisei"></input>
        </form>
        <form name="form" id="form3" class="tab-pane" onChange={gotoCalc}>
          <p>軌跡Lvl</p>
            <div>通常攻撃</div>
              <input type="number" id="traceBasic" value={traceBasic} min="1" max="6" onChange={function(e){setBasic(e.target.value);}}></input>
            <div>戦闘スキル</div>
              <input type="number" id="traceSkill" value={traceSkill}  min="1" max="10" onChange={function(e){setSkill(e.target.value);}} ></input>
            <div>必殺技</div>
              <input type="number" id="traceUlt" value={traceUlt}  min="1" max="10" onChange={function(e){setUlt(e.target.value);}}></input>
            <div>天賦</div>
              <input type="number" id="traceTalent" value={traceTalent}  min="1" max="10" onChange={function(e){setTalent(e.target.value);}}></input>
          <p>追加能力</p>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="add2"/>
              <label class="form-check-label" for="add2">
                昇格2
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="add4"/>
              <label class="form-check-label" for="add4">
                昇格4
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="add6"/>
              <label class="form-check-label" for="add6">
                昇格6
              </label>
            </div>
            <div>星魂Level</div>
            <input type="number" min="0" max="6" id="star"></input>
        </form>
        <div id="buffs" class="tab-pane">
          <DisplayBuffs onChange={gotoCalc} key={'buff'}/>
          <DisplayDebuffs onChange={gotoCalc} key={'debuff'}/>
        </div>
        <div id="cone" class="tab-pane">
          <DisplayWeapons onChange={gotoCalc} key={'weapon'}/>
        </div>
      </div>
    </div>
      <div onChange={gotoCalc} id="result" class="p-2 flex-fill bd-highlight">{result}</div>
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

        bedmg : 0,/*被ダメージアップ*/
        defF : 0,/*防御ダウン*/
        taisei: 0,/*耐性ダウン,貫通*/
        bedmgJizoku:0,
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
        ultCritdmg: 0,//必殺技の会心ダメージ

        zinsei:document.getElementById("zinsei").checked,
        Elevel:Number(document.getElementById("Elevel").value),
        taiseiE:Number(document.getElementById("Etaisei").value)
      };
      return summary;
    }

    let select = document.getElementById("chara");
    let index = select.selectedIndex;
    let id = select.options[index].value;/*選択キャラid*/

    /*フォームをまとめる*/
    let summary = summaryState();

    /*バフ・デバフを追加*/
    summary = AddStatus(summary);

    return loadImport(summary,id);
  }

  async function loadImport(summary,id){
    const module = await import("./calc/calc"+data.index[id]+".js");
    setResult(module.calc(summary));
  }
}

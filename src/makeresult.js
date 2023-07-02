import React from 'react';
import ReactDOM from 'react-dom/client';

export function MakeResult(result){
  const list = [];
  const cap = ["通常攻撃・","戦闘スキル・","必殺技・","天賦・","秘儀・","追加能力"]

  for(let i=0;i<5;i++){
    list.push(<div>{cap[i]}{result[i].name}</div>);
    let d = result[i].detail;
    for(let j=0;j<d.length;j++){
      list.push(<div>{d[j].name}</div>)
      list.push(<div>{d[j].dmg.noCrit}</div>)
      list.push(<div>{d[j].dmg.crit}</div>)
      list.push(<div>{(d[j].dmg.exp==" ")?" ":Math.round(d[j].dmg.exp)}</div>)
    }
  }

  for(let i=5;i<result.length;i++){
    list.push(<div>追加効果</div>);
    let d = result[i].detail;
    for(let j=0;j<d.length;j++){
      list.push(<div>{d[j].name}</div>)
      list.push(<div>{d[j].dmg.noCrit}</div>)
      list.push(<div>{d[j].dmg.crit}</div>)
      list.push(<div>{(d[j].dmg.exp==" ")?" ":Math.round(d[j].dmg.exp)}</div>)
    }
  }

  return list;
}

export function MakeResultHaveSelect(result){
  const list = [];
  const cap = ["通常攻撃・","戦闘スキル・","必殺技・","天賦・","秘儀・","追加能力・"]

  for(let i=0;i<result[5].length;i++){
    list.push(<div>{result[5][i]}</div>);
  }

  for(let i=0;i<5;i++){
    list.push(<div>{cap[i]}{result[i].name}</div>);
    let d = result[i].detail;
    for(let j=0;j<d.length;j++){
      list.push(<div>{d[j].name}</div>)
      list.push(<div>{d[j].dmg.noCrit}</div>)
      list.push(<div>{d[j].dmg.crit}</div>)
      list.push(<div>{(d[j].dmg.exp==" ")?" ":Math.round(d[j].dmg.exp)}</div>)
    }
  }

  for(let i=6;i<result.length;i++){
    list.push(<div>追加効果</div>);
    let d = result[i].detail;
    for(let j=0;j<d.length;j++){
      list.push(<div>{d[j].name}</div>)
      list.push(<div>{d[j].dmg.noCrit}</div>)
      list.push(<div>{d[j].dmg.crit}</div>)
      list.push(<div>{(d[j].dmg.exp==" ")?" ":Math.round(d[j].dmg.exp)}</div>)
    }
  }

  return list;
}

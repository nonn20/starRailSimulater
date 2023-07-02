/*キャラ共通の計算部分*/

export function calcBasic(basic,info){
  let trace = document.getElementById("traceBasic").value;
  return allCalc(basic,trace,info);
}

export function calcSkill(skill,info){
  let trace = document.getElementById("traceSkill").value;
  return allCalc(skill,trace,info);
}

export function calcUlt(ult,info){
  let trace = document.getElementById("traceUlt").value;
  return allCalc(ult,trace,info);
}

export function calcTalent(talent,info){
  let trace = document.getElementById("traceTalent").value;
  return allCalc(talent,trace,info);
}

/*一つのアクションの中の各数値の計算を振り分け*/
function allCalc(skill,trace,info){
  let ref = skill.ref;
  let status = new Array(ref.length);

  for( let i=0;i<skill.ability.length;i++){
    status[i] = calcByAbility(skill.ability[i],trace,skill.table[i],ref[i],info);
  }

  return status;
}

/*一つのアクションの中の各数値を計算*/
function calcByAbility(ability,trace,table,ref,info){
  /*攻撃系のアクションなら普通の式*/
  if(ability == "atk"){
    if(ref == "none")
      return table[trace-1];

    else  return info[ref]*table[trace-1]/100;
  }

  /*デバフの場合*/
  if(ability == "debuff"){
    /*参照無しなら、そのまま倍率を返す*/
    if(ref == "none")
      return table[trace-1];

    /*参照アリなら計算する*/
    else return info[ref]*table[trace-1];
  }

  /*バフの場合*/
  if(ability == "buff"){
      /*参照無しなら、そのまま倍率を返す*/
      if(ref == "none")
        return table[trace-1];

      /*参照アリなら計算する*/
      else return info[ref]*table[trace-1]/100;
  }

  if(ability == "shield"){
    /*参照無しなら、そのまま倍率を返す*/
    if(ref == "none")
    return table[trace-1];

    /*参照アリなら計算する*/
    else return info[ref]*table[trace-1]/100;
  }

  if(ability == "heal"){
    /*参照無しなら、そのまま倍率を返す*/
    if(ref == "none")
    return table[trace-1];

    /*参照アリなら計算する*/
    else return info[ref]*table[trace-1]/100;
  }

  if(ability == "huka"){
    /*参照無しなら、そのまま倍率を返す*/
    if(ref == "none")
    return table[trace-1];

    /*参照アリなら計算する*/
    else return info[ref]*table[trace-1]/100;
  }

  if(ability == "jizoku"){
    /*参照無しなら、そのまま倍率を返す*/
    if(ref == "none")
    return table[trace-1];

    /*参照アリなら計算する*/
    else return info[ref]*table[trace-1]/100;
  }
  return 0;
}

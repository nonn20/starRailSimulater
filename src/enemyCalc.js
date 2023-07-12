/*info キャラステータス
basic 基礎ダメージ
debuff  デバフ値一覧*/
export const calcEnemy=(info,basic,act)=> {
  let zinsei = info.zinsei,level = info.Elevel,taisei = info.taiseiE;
  let zinseiE = zinsei ? 0.9: 1;
  let result;

  let def = (20 + Number(info.level))/((20+level)*(1-info.defF/100) + 20 + Number(info.level));
  let taiseiE = 100 - taisei + info.taisei;

  info = kindAtk(info,act);

  if(act == "jizoku")
    result = calcJizoku(zinseiE,def,taiseiE,info,basic,info);
  else
    result = calcAtk(zinseiE,def,taiseiE,info,basic,info);

  return result;
}

const kindAtk = (info,act) => {
  if(act=="basic")
    info.dmgbuff = Number(info.dmgbuff)+Number(info.buffBasic);
  else if(act=="skill")
    info.dmgbuff = Number(info.dmgbuff)+Number(info.buffSkill);
  else if(act=="ult"){
    info.dmgbuff = Number(info.dmgbuff)+Number(info.buffUlt);
    info.critdmg = Number(info.critdmg)+Number(info.ultCritdmg);
  }
  else if(act=="add")
    info.dmgbuff = Number(info.dmgbuff)+Number(info.buffAdd);
  else if(act=="huka")
    info.dmgbuff = Number(info.dmgbuff)+Number(info.buffHuka);
  else if(act=="jizoku")
    info.dmgbuff = Number(info.dmgbuff)+Number(info.buffJizoku);

    return info;
}

const calcAtk = (zinseiE,def,taiseiE,info,basic) => {
  let noCrit = basic*(1+info.dmgbuff/100)*def*taiseiE/100*zinseiE*(1+info.bedmg/100);
  let crit = noCrit*(1+info.critdmg/100);
  let exp = noCrit*(1-info.critrate/100)+crit*info.critrate/100;

  let result = {
    noCrit : Math.round(noCrit),
    crit : Math.round(crit),
    exp : Math.round(exp)
  }

  return result
}

const calcJizoku = (zinseiE,def,taiseiE,info,basic) => {
  let noCrit = basic*(1+info.dmgbuff/100)*def*taiseiE/100*zinseiE*(1+(info.bedmgJizoku+info.bedmg)/100);

  let result = {
    noCrit : " ",
    crit : " ",
    exp : Math.round(noCrit)
  }

  return result
}

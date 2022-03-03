/* Calculo IRRF renda mensal e INSS nova regra */

function previdenciaSocial(){
    let vrRenda = parseFloat(document.getElementById("renda").value.replace(/\./g,''));
    let faixaReal1 = 1212; // primeira faixa do INSS 2020
    let faixaReal2i = 1212.01; // primeiro nível da segudnda faixa do INSS 2020
    let faixaReal2 = 2427.35; // segundo nível da segunda faixa do INSS 2020
    let faixaReal3i = 2427.36; // primeiro nível da terceira faixa do INSS 2020
    let faixaReal3 = 3641.03; // segundo nível da terceira faiza do INSS 2020
    let faixaReal4i = 3641.04; // primeiro nível da quarta faixa do INSS 2020
    let faixaReal4 = 7087.22; // segundo nível da quarta faixa do INSS 2020
    let aliquota1 = 0.075; // alíquota primeira faixa INSS 2020
    let aliquota2 = 0.090; // alíquota segunda faixa INSS 2020
    let aliquota3 = 0.120; // alíquota terceita faixa INSS 2020
    let aliquota4 = 0.140; // alíquota quarta faixa INSS 2020
    let faixa1 = 0; // suporte para calculo do INSS
    let faixa2 = 0; // suporte para calculo do INSS
    let faixa3 = 0; // suporte para calculo do INSS
    let faixa4 = 0; // suporte para calculo do INSS
    let faixaCoringa = 0; // suporte para calculo do INSS
    let inssSim = document.getElementById('select-inss').options[document.getElementById('select-inss').selectedIndex].value;
    let inssDevido = 0;
    let salMinimo = 1212;

    if(vrRenda>=salMinimo){
        
        if(vrRenda>0 && inssSim==1){
            faixa1 = faixaReal1*aliquota1;
        }else{
            faixa1 = 0;
        }if(vrRenda>=faixaReal2 && inssSim==1){
            faixa2 = (faixaReal2-faixaReal1)*aliquota2;
        }else{
            faixa2 = 0;
        }if(vrRenda>=faixaReal3 && inssSim==1){
            faixa3 = (faixaReal3-faixaReal2)*aliquota3;
        }else {
            faixa3 = 0;
        }if (vrRenda>=faixaReal4 && inssSim==1){
            faixa4 = (faixaReal4-faixaReal3)*aliquota4;
        }else{
            faixa4 = 0;
        }
        if (vrRenda<=faixaReal1 && inssSim==1){
            faixaCoringa = (vrRenda - faixaReal1) * aliquota1;
        }else if(vrRenda>=faixaReal2i && vrRenda<=faixaReal2 && inssSim==1){
            faixaCoringa = (vrRenda - faixaReal2i) *aliquota2;
        }else if(vrRenda>=faixaReal3i && vrRenda<=faixaReal3 && inssSim==1){
            faixaCoringa = (vrRenda - faixaReal3i) *aliquota3;
        }else if(vrRenda>=faixaReal4i && vrRenda<=faixaReal4 && inssSim==1){
            faixaCoringa = (vrRenda - faixaReal4i) *aliquota4;
        }else {
            faixaCoringa=0;
        }
    inssDevido = faixa1+faixa2+faixa3+faixa4+faixaCoringa;
}else{
    inssDevido = 0;
}    
    return inssDevido;
}    

function impostoRenda(){
    let vrRenda = parseFloat(document.getElementById("renda").value.replace(/\./g,''));
    let vrDependentes = 189.59; // valor da dedução vigente
    let dependentes = document.getElementById("dependente").value * vrDependentes;
    let pensoes = parseFloat(document.getElementById("pensao").value.replace(/\./g,''));
    let outras = parseFloat(document.getElementById("outra").value.replace(/\./g,''));
    let faixaIr1=1903.98; // primeira faixa do IRRF 2020
    let faixaIr2i=1903.99; // primeiro nível da segudnda faixa do IRRF 2020
    let faixaIr2=2826.65; // segundo nível da segunda faixa do IRRF 2020
    let faixaIr3i=2826.66; // primeiro nível da terceira faixa do IRRF 2020
    let faixaIr3=3751.05; // segundo nível da terceira faiza do IRRF 2020
    let faixaIr4i=3751.06; // primeiro nível da quarta faixa do IRRF 2020
    let faixaIr4=4664.68; // segundo nível da quarta faixa do IRRF 2020
    let aliquotaIr1 = 0.075; // alíquota primeira faixa IRRF 2020
    let aliquotaIr2 = 0.15; // alíquota segunda faixa IRRF 2020
    let aliquotaIr3 = 0.225; // alíquota terceita faixa IRRF 2020
    let aliquotaIr4 = 0.275; // alíquota quarta faixa IRRF 2020
    let dedutivel1 = 142.80; // parcela dedutível primeira faixa IRRF 2020
    let dedutivel2=354.80; // parcela dedutível segunda faixa IRRF 2020
    let dedutivel3=636.13; // parcela dedutível terceira faixa IRRF 2020
    let dedutivel4=869.36; // parcela dedutível quarta faixa IRRF 2020
    let vrInss = 0;
    let baseAntesDoIr =0;
    let vrIrpf = 0;
    let inssSim = document.getElementById('select-inss').options[document.getElementById('select-inss').selectedIndex].value;
    
    if (Number.isNaN(pensoes)){
    pensoes = 0;
    }
    if (Number.isNaN(outras)){
        outras = 0;
        }
        if (Number.isNaN(vrRenda)){
            vrRenda = 0;
            }    

    if(inssSim==1){
        vrInss = previdenciaSocial();
    }else{
        vrInss = 0;
    }
    
        baseAntesDoIr = vrRenda - vrInss - dependentes - pensoes - outras;
         

    if(baseAntesDoIr<=faixaIr1){
        vrIrpf = 0;
    }else if(baseAntesDoIr>=faixaIr2i && baseAntesDoIr<=faixaIr2){
        vrIrpf = baseAntesDoIr * aliquotaIr1 - dedutivel1;
    }else if(baseAntesDoIr>= faixaIr3i && baseAntesDoIr<=faixaIr3){
        vrIrpf = baseAntesDoIr * aliquotaIr2 - dedutivel2;
    }else if(baseAntesDoIr>=faixaIr4i && baseAntesDoIr<=faixaIr4){
        vrIrpf = baseAntesDoIr * aliquotaIr3 - dedutivel3;
    }else{
        vrIrpf = baseAntesDoIr * aliquotaIr4 - dedutivel4;
    }     
        return vrIrpf;
    }
   
function estimativaImpostoRenda(){
  document.getElementById("retencao-irpf").innerHTML=impostoRenda().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  document.getElementById("retencao-inss").innerHTML=previdenciaSocial().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

/* --------------------------------------------- Cálculo  do RPA -     ----------------------------------*/

function previRpa(){
    let vrServBruto = parseFloat(document.getElementById("servico").value.replace(/\./g,''));;
    let vrInssRpa = 0;
    let ultimaFaixa = 7087.22; // segundo nível da quarta faixa do INSS 2020
    
    if (Number.isNaN(vrServBruto)){
        vrServBruto = 0;
        }


    if(vrServBruto!="" && vrServBruto!=0 && vrServBruto<=ultimaFaixa){
        vrInssRpa = vrServBruto *0.11;
    }else if(vrServBruto>ultimaFaixa){
        vrInssRpa = ultimaFaixa *0.11;
    }else{
        vrInssRpa ="Informe um valor válido.";
    }
    return vrInssRpa;
}


function inssRpa(){
     document.getElementById("inss-prest").innerHTML=previRpa().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

function irpfRpa(){
    let vrServBruto = parseFloat(document.getElementById("servico").value.replace(/\./g,''));
    let faixaIr1=1903.98; // primeira faixa do IRRF 2021
    let faixaIr2i=1903.99; // primeiro nível da segudnda faixa do IRRF 2021
    let faixaIr2=2826.65; // segundo nível da segunda faixa do IRRF 2021
    let faixaIr3i=2826.66; // primeiro nível da terceira faixa do IRRF 2021
    let faixaIr3=3751.05; // segundo nível da terceira faiza do IRRF 2021
    let faixaIr4i=3751.06; // primeiro nível da quarta faixa do IRRF 2021
    let faixaIr4=4664.68; // segundo nível da quarta faixa do IRRF 2021
    let aliquotaIr1 = 0.075; // alíquota primeira faixa IRRF 2021
    let aliquotaIr2 = 0.15; // alíquota segunda faixa IRRF 2021
    let aliquotaIr3 = 0.225; // alíquota terceita faixa IRRF 2021
    let aliquotaIr4 = 0.275; // alíquota quarta faixa IRRF 2021
    let dedutivel1 = 142.80; // parcela dedutível primeira faixa IRRF 2021
    let dedutivel2=354.80; // parcela dedutível segunda faixa IRRF 2021
    let dedutivel3=636.13; // parcela dedutível terceira faixa IRRF 2021
    let dedutivel4=869.36; // parcela dedutível quarta faixa IRRF 2021
    let vrInss = 0;
    let baseAntesDoIr =0;
    let vrIrpf = 0;
    let varInssRpa = parseFloat(document.getElementById("servico").value.replace(/\./g,''))*.11;
    
    if (Number.isNaN(vrServBruto)){
        vrServBruto = 0;
        }

        baseAntesDoIr = vrServBruto - varInssRpa;
         
    if(vrServBruto!="" && vrServBruto!=0){
        
            if(baseAntesDoIr<=faixaIr1){
                vrIrpf = 0;
            }else if(baseAntesDoIr>=faixaIr2i && baseAntesDoIr<=faixaIr2){
                vrIrpf = baseAntesDoIr * aliquotaIr1 - dedutivel1;
            }else if(baseAntesDoIr>= faixaIr3i && baseAntesDoIr<=faixaIr3){
                vrIrpf = baseAntesDoIr * aliquotaIr2 - dedutivel2;
            }else if(baseAntesDoIr>=faixaIr4i && baseAntesDoIr<=faixaIr4){
                vrIrpf = baseAntesDoIr * aliquotaIr3 - dedutivel3;
            }else{
                vrIrpf = baseAntesDoIr * aliquotaIr4 - dedutivel4;
        }   
     }else{
        vrIrpf ="Informe um valor válido.";
        }  
        return vrIrpf;
    }

    function irrfRpa(){
        document.getElementById("irrf-prest").innerHTML=irpfRpa().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
   }

function issFonteRpa(){
let vrServBruto = parseFloat(document.getElementById("servico").value.replace(/\./g,''));
let selAliquotaIss = document.getElementById('iss').options[document.getElementById('iss').selectedIndex].value;
let vrIssRpa = 0;

if (Number.isNaN(vrServBruto)){
    vrServBruto = 0;
    }


    if(vrServBruto!="" && vrServBruto!=0){
        vrIssRpa = vrServBruto * selAliquotaIss;
    }else{
        vrIssRpa ="Informe um valor válido.";
    }
    return vrIssRpa;
}

function issRpa(){
    document.getElementById("iss-prest").innerHTML=issFonteRpa().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}


function inssPatronal(){
    let vrServBruto = parseFloat(document.getElementById("servico").value.replace(/\./g,''));
    let vrInssPatronal = 0;
    let percInssPatronal = 0.2;

    if (Number.isNaN(vrServBruto)){
        vrServBruto = 0;
        }
    
    if(vrServBruto!="" && vrServBruto!=0){
        vrInssPatronal = vrServBruto * percInssPatronal;
    }else{
         vrInssPatronal ="Informe um valor válido.";
    }
    return vrInssPatronal;
}

 


function inssEmp(){
     document.getElementById("inss-patr").innerHTML=inssPatronal().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

function gastoTotalEmp(){
    let vrServBruto = parseFloat(document.getElementById("servico").value.replace(/\./g,''));
    let percInssEmp = 1.2;
    let tlCusto=0; 

    if (Number.isNaN(vrServBruto)){
        vrServBruto = 0;
        }

    if(vrServBruto!="" && vrServBruto!=0){
      tlCusto = vrServBruto * percInssEmp;
    }else{
        tlCusto ="Informe um valor válido.";
   }
    return tlCusto;
}

function custEmp(){
    document.getElementById("custo-patr").innerHTML=gastoTotalEmp().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

function servicoLiquido(){
    let vrServBruto = parseFloat(document.getElementById("servico").value.replace(/\./g,''));

    let inss = previRpa(vrServBruto);
    let iss = issFonteRpa(vrServBruto);
    let irpf = irpfRpa(vrServBruto);
    let vrServLiq = 0;

    if (Number.isNaN(vrServBruto)){
        vrServBruto = 0;
        }

    if(vrServBruto!="" && vrServBruto!=0){
    vrServLiq = vrServBruto - inss - iss - irpf;
    }else{
    vrServLiq ="Informe um valor válido.";
   }
   return vrServLiq;
}

function liqServ(){
    document.getElementById("serv-liq").innerHTML=servicoLiquido().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

function validadorIss(){
    let vrServBruto = parseFloat(document.getElementById("servico").value.replace(/\./g,''));
    let validador = issFonteRpa();
    let respUsuario = 0;

    if(validador ==0){
        respUsuario = alert('Atencão! alíquota do ISS não informada!!!')
    }
    return respUsuario;
}

/* ----------------------------------------- Cálculo  do Vale Transporte -----------------------------------*/

function totalValeTransporte(){
    let numvales = document.getElementById("num-vale").value;
    let diasjob = document.getElementById("dias-uteis").value;
    let tlvales = numvales * diasjob;
    return tlvales;
}
function valeTrasp(){
    document.getElementById("total-vale-un").innerHTML=totalValeTransporte()+" Un";
}

function valoresValeTransporte(){
    let tlvales = totalValeTransporte();
    let vrvales = parseFloat(document.getElementById("vr-vale").value.replace(/\./g,''));

    if (Number.isNaN(vrvales)){
        vrvales = 0;
        }

    let vrtlvales = vrvales * tlvales;
    return vrtlvales;
}

function valorVale(){
    document.getElementById("total-vale-vr").innerHTML=valoresValeTransporte().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

function descontoValeTransporte(){
    let salbase = parseFloat(document.getElementById("sal-base").value.replace(/\./g,''));
    let aliqvale = .06;

    if (Number.isNaN(salbase)){
        salbase = 0;
        }
    let descper = salbase * aliqvale;
    
    return descper;
}
function descVale(){
    document.getElementById("desc-vale").innerHTML=descontoValeTransporte().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

function custoEmpregado(){
    let salbase = parseFloat(document.getElementById("sal-base").value.replace(/\./g,''));
    let vrtlvales = valoresValeTransporte();
    let descper = descontoValeTransporte();
    let parteempregado = 0;
    let aliqvale = .06;

    if (descper>=vrtlvales){
        parteempregado = vrtlvales;
    }else{
        parteempregado = salbase * aliqvale;
    }
    return parteempregado;
}
function cusEmp(){
    document.getElementById("custo-emp").innerHTML=custoEmpregado().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

function custoPatrao(){
    let vrtlvales = valoresValeTransporte();
    let parteempregado = custoEmpregado();
    let partepatrao = 0;

    if(parteempregado == 0){
        partepatrao = vrtlvales;
    }else{
        partepatrao = vrtlvales - parteempregado;
    }
    return partepatrao;
}

function cusPatr(){
    document.getElementById("custo-patr").innerHTML=custoPatrao().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

/***************************************************Função monetária****************************************************/ 
function formatarMoeda() {

let ids = "";

    if(document.body.id =="irrf"){ids = ["renda","pensao","outra"]};
    if(document.body.id =="vale"){ids = ["sal-base","vr-vale"]};
    if(document.body.id =="rpa"){ids = ["servico"]};
    
    for (let i = 0; i < ids.length; i++) {
        let elemento = document.getElementById(ids[i]);

    let valor = elemento.value;
        
    if (valor == 0){
        valor ===0;
    }else{

    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g,''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");
    
    
    if (valor.length > 6 ) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
      }
    if (valor.length > 10 ) {
        valor = valor.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,".$1.$2,$3");
      }
      if (valor.length > 14) {
        valor = valor.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,".$1.$2.$3,$4");
      }  
      if (valor.length > 18) {
        valor = valor.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,".$1.$2.$3.$4,$5");
      }
      if (valor.length > 22) {
        valor = valor.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,".$1.$2.$3.$4.$5,$6");
      }
      if (valor.length > 26) {
        valor=0;
      }
            elemento.value = valor;
  }
}
}


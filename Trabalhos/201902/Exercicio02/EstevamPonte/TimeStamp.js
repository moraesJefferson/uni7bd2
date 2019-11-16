function checkSeItemDeValorExiste(TS, itemDeValor){
    let tamanho = TS.length
    for(let i = 0; i < tamanho; i++){
        if(TS[i].id === itemDeValor){
            return true
        }
    }
    return false
}

function realizandoOTimeStamp(transacao, TS) {
    let timeStemp = parseInt(transacao[1])
    for(let i = 0; i < TS.length; i++){
        if(TS[i].id === transacao[3]){
            if(transacao[0] === "r"){
                if( timeStemp >= TS[i].write){
                    if(TS[i].read < timeStemp){
                        TS[i].read = timeStemp
                    }
                }else{
                    return true
                }
            }else{
                if(timeStemp >= TS[i].read && timeStemp >= TS[i].write){
                    if(TS[i].write < timeStemp){
                        TS[i].write = timeStemp
                    }
                }else{
                    return true
                }
            }
        }
    }   
}

function TimeStamp(transacoes) {
    let TS = []
    for(let i = 0; i < transacoes.length; i++){
        if(transacoes[i][0] !== "c"){
            let itemDeValor = transacoes[i][3]
            if(checkSeItemDeValorExiste(TS, itemDeValor)){
                if(realizandoOTimeStamp(transacoes[i], TS)){
                    return true
                }
            }else{
                TS.push({id: itemDeValor, read: 0, write: 0 } )
                realizandoOTimeStamp(transacoes[i], TS)
            }
        }
    }
    return(TS)
}
// Para testar se uma trasação é valida, digite na variavel "transacoes" abaixo como no exemplo
let transacoes = ["r2(a)", "w2(a)", "w1(a)", "r2(a)", "c1", "c2"]
let result = TimeStamp(transacoes)
if(result === true){
    console.log("Sua operação foi invalida, por isso sofreu aborto")
}else{
    console.log("Sua operação foi valida")
    result.map(item => console.log(item))
}
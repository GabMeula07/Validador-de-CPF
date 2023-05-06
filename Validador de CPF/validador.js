
//Classe principal
class ValidaCPF {
  constructor(cpfEnviado) {
    Object.defineProperty(this, "limpo", {
      get: function () {
        return cpfEnviado.replace(/\D+/g, "");
      },
    });
  }

  //Cria os digistos para serem comparados depois;
  criaDigito(cpfPacial) {
    const cpfArray = Array.from(cpfPacial);
    let regressivo = cpfPacial.length + 1;
    const total = cpfArray.reduce((ac, val) => {
      ac += Number(val) * regressivo;
      regressivo--;
      return ac;
    }, 0);

    const digito = 11 -  (total %11)
    // para digitos com valores acima de 9 é utilizado a norma de se substituir por 0;
    return digito > 9 ? 0 : digito;
  }

  // aqui compara o cpf fatiado mais os dois digitos gerados com cpf enviado originalmente; 
  valida() {
    if(typeof this.limpo === 'undefined') return false;
    if (this.limpo.length !== 11) return false;

    const cpfParcial = this.limpo.slice(0, -2);
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 =this.criaDigito(cpfParcial + digito1);

    if(cpfParcial + digito1 + digito2 == this.limpo){
        console.log('esse CPF é valido!')
    }
    else{
        console.log('cpf Invalido!')
    }

  }


}
//este cpf utilizado de exemplo foi gerado apenas para teste;
const cpf = new ValidaCPF("541.412.275-01");
cpf.valida()



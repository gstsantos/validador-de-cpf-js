export default class ValidarCpf {
  constructor(inputCpf) {
    this.element = inputCpf;
  }

  limpar(cpf) {
    return cpf.replace(/\D/g,"");
  }

  formatar(cpf){
    return cpf.replace( /(\d{3})(\d{3})(\d{3})(\d{2})/g,"$1.$2.$3-$4");
  }

  atualizar(cpf) {
    const cpfAtualizado = this.formatar(this.limpar(cpf));
    return cpfAtualizado;
  }

  validar(cpfDigitado) {
    const cpfAtualizado = this.atualizar(cpfDigitado);
    const matchCpf = cpfAtualizado.match(/(?:\d{3}[-.\s]?){3}\d{2}/g);
    
    if(matchCpf && matchCpf[0] === cpfAtualizado) {
      this.corrigir(cpfAtualizado);
      this.element.classList.remove("invalido");
      this.element.classList.add("valido");
      this.element.nextElementSibling.classList.remove("ativo");
    } else {
      this.element.classList.remove("valido");
      this.element.classList.add("invalido");
      this.element.nextElementSibling.classList.add("ativo");
    }
    return this;
  }

  gerarErro() {
    const spanErro = document.createElement("span");
    spanErro.classList.add("cpf--erro");
    spanErro.innerText = "CPF Inválido";
    this.element.parentElement.insertBefore(spanErro,this.element.nextElementSibling);
    return this
  }

  corrigir(cpfAtualizado) {
    this.element.value = cpfAtualizado;
    return this;
  }

  adicionarEvento() {
    this.element.addEventListener("change",cpf => this.validar(cpf.target.value));
    return this;
  }

  iniciar() {
    this.adicionarEvento();
    this.gerarErro();
    return this;
  }
}
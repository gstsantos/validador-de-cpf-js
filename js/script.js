import ValidarCpf from "./modules/validar-cpf.js";

const cpf = document.querySelector("#cpf");
const validarCpf = new ValidarCpf(cpf);

validarCpf.iniciar();
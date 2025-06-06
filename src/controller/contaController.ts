import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository"; 
import { colors } from "../util/Colors";

export class ContaController implements ContaRepository {

    private listacontas: Array<Conta> = new Array<Conta>();
    numero: number = 0;

    procurarPorNumero(numero: number): void {
        let buscarConta = this.buscarNoArray(numero);

        if (buscarConta != null) {
            buscarConta.visualizar();
        }else
            console.log(colors.fg.red, "\nA Conta numero: " + numero
                + " não foi encontrada!", colors.reset);
    }
    listarTodas(): void {
        for (let Conta of this.listacontas) {
            Conta.visualizar();
        };
    }
    cadastrar(conta: Conta): void {
        this.listacontas.push(conta);
        console.log(colors.fg.green, "\nA conta número: " + conta.numero +
            " foi criada com sucesso!", colors.reset);
    }
    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero);

        if (buscaConta != null) {
            this.listacontas[this.listacontas.indexOf(buscaConta)] = conta;
            console.log(colors.fg.green, "\nA conta numero: " + conta.numero +
                " Foi atualizada com sucesso!", colors.reset);
        }else
            console.log(colors.fg.red, "\nA conta numero: " + conta.numero +
                " não foi encontrada!", colors.reset);

    }
    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta != null) {
            this.listacontas.splice(this.listacontas.indexOf(buscaConta), 1);
            console.log(colors.fg.green, "\nA conta numero: " + numero + 
                " foi apagada com sucesso!", colors.reset);
        }else
        console.log(colors.fg.red,"\nA conta numero: " + numero +
            " não foi encontrada!", colors.reset);

    }
    public sacar(numero: number, valor: number): void {
        let conta = this.buscarNoArray(numero);

        if (conta != null) {

            if(conta.sacar(valor) == true)
                console.log(colors.fg.green, "\nSaque na conta numero: " + numero +
            "foi efetuado com sucesso!", colors.reset);
        }else
        console.log(colors.fg.red, "\nA conta numero: " + numero +
            "não foi encontrada!", colors.reset);

    }
    public depositar(numero: number, valor: number): void {
        let conta = this.buscarNoArray(numero);

        if (conta != null) {
            conta.depositar(valor);
            console.log(colors.fg.green, "\nO depósito na conta numero: " + numero +
                " foi efetuado com sucesso!", colors.reset);
        }else
        console.log(colors.fg.red,"\nA conta numero: " + numero + 
            " não foi encontrada!", colors.reset);

    }
    public transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        let contaOrigem = this.buscarNoArray(numeroOrigem);
        let contaDestino = this.buscarNoArray(numeroDestino);

        if (contaOrigem != null && contaDestino != null) {
            if(contaOrigem.sacar(valor) == true){
                contaDestino.depositar(valor);
                console.log(colors.fg.green, "\nA transferência da conta numero: " + numeroOrigem + 
                    " para a conta numero: " + numeroDestino + " foi efetuada com sucesso!",
                    colors.reset)
            }
        }else
        console.log(colors.fg.red,"\nA conta numero: " + numeroOrigem +
            " e/ou a conta numero: " + numeroDestino + " não foram encontradas!");
            
    }
    public gerarNumero(): number {
        return ++ this.numero;
    }
    public buscarNoArray(numero: number): Conta | null {

        for (let Conta of this.listacontas) {
            if (Conta.numero === numero)
                return Conta;
        }

        return null;
    }
    }


class Parquimetro {
    constructor() {
        this.tabelaPrecos = [
            { valor: 3.00, tempo: 120 },
            { valor: 1.75, tempo: 60 },
            { valor: 1.00, tempo: 30 }
        ];
    }

    processarPagamento(valorInserido) {
        if (valorInserido < 1.00) {
            return { 
                sucesso: false, 
                mensagem: "Valor insuficiente. O mínimo é R$ 1,00." 
            };
        }

        let planoSelecionado = null;

        for (let plano of this.tabelaPrecos) {
            if (valorInserido >= plano.valor) {
                planoSelecionado = plano;
                break;
            }
        }

        const troco = valorInserido - planoSelecionado.valor;

        return {
            sucesso: true,
            tempo: planoSelecionado.tempo,
            troco: troco
        };
    }
}

class ParquimetroUI {
    constructor() {
        this.parquimetro = new Parquimetro();
        
        this.formulario = document.getElementById('form-parquimetro');
        this.inputValor = document.getElementById('valor-inserido');
        this.areaResultado = document.getElementById('area-resultado');

        this.iniciarEventos();
    }

    iniciarEventos() {
        this.formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            this.lidarComSubmissao();
        });
    }

    lidarComSubmissao() {
        const valorInserido = parseFloat(this.inputValor.value);

        if (isNaN(valorInserido)) {
            this.exibirErro("Por favor, insira um valor numérico válido.");
            return;
        }

        const resultado = this.parquimetro.processarPagamento(valorInserido);

        if (resultado.sucesso) {
            this.exibirSucesso(resultado.tempo, resultado.troco);
        } else {
            this.exibirErro(resultado.mensagem);
        }
    }

    exibirSucesso(tempo, troco) {
        this.areaResultado.className = 'resultado sucesso';
        
        const trocoFormatado = troco.toFixed(2).replace('.', ',');

        let mensagemHTML = `<strong>Ticket Emitido!</strong><br> Tempo liberado: ${tempo} minutos.`;
        
        if (troco > 0) {
            mensagemHTML += `<br><br><em>Seu troco: R$ ${trocoFormatado}</em>`;
        } else {
            mensagemHTML += `<br><br><em>Sem troco.</em>`;
        }

        this.areaResultado.innerHTML = mensagemHTML;
    }

    exibirErro(mensagem) {
        this.areaResultado.className = 'resultado erro';
        this.areaResultado.innerHTML = `<strong>Atenção:</strong> ${mensagem}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ParquimetroUI();
});
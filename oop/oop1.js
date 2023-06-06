class Copo {
    constructor(cor, tamanho, material) {
        this.cor = cor;
        this.tamanho = tamanho;
        this.material = material;
        this.volume = 0;
    }

    encher(porcentagem) {
        if (this.volume + porcentagem > 100) {
            this.volume = 100;
            console.log(`Você colocou ${this.volume + porcentagem - 100} do que o copo suporta`)
            return;
        }
        this.volume += porcentagem;
    }

    esvaziar(porcentagem) {
        if (this.volume - porcentagem < 0) {
            this.volume = 0;
            console.log(`Você tentou tirar mais ${porcentagem - this.volume} do que o copo tinha`)
            return;
        }
        this.volume -= porcentagem;
    }
}

const copo1 = new Copo('azul', 'pequeno', 'vidro')
const copo2 = new Copo('vermelho', 'grande', 'plástico')

console.log(copo1.volume)
copo1.encher(50)
copo1.encher(70)
console.log(copo1.volume)

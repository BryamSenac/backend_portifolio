const cors = require('cors');
const express = require('express');

const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());

let cartoes = [
    {
        linguagem: 'WEB - API Maps',
        nome: 'Transporte Publico',
        img: "https://th.bing.com/th/id/R.946a290b98381829deefd64faef6c605?rik=djUs5Mq0z3ZRiQ&pid=ImgRaw&r=0"
    },
    {
        linguagem: 'CARTAO 2',
        nome: 'R$90.23',
        img: "https://th.bing.com/th/id/OIP.zZcHBkUfwUmtek-sWpnjaAHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain"
    },
    {
        linguagem: 'CARTAO 3',
        nome: 'R$27.79',
        img: "https://th.bing.com/th/id/OIP.9kvRZ7zLIEE2umY0x-g9QwHaHa?w=544&h=544&rs=1&pid=ImgDetMain"
    },
    {
        linguagem: 'CARTAO 4',
        nome: 'R$86.49',
        img: "https://cdnv2.moovin.com.br/sandycalcados/imagens/produtos/original/tenis-nike-flyknit-max-85e744676043564192c692461cdb747f.jpg"
    },
    {
        linguagem: 'CARTAO 5',
        nome: 'R$11.55',
        img: "https://th.bing.com/th/id/OIP.Oe1oRos3_P7NZW5k8A6VqAAAAA?w=474&h=474&rs=1&pid=ImgDetMain"
    },
    {
        linguagem: 'CARTAO 6',
        nome: 'R$33.77',
        img: "https://th.bing.com/th/id/OIP.X7wo2DnEcRJdI9oMPh2RMQHaHa?w=650&h=650&rs=1&pid=ImgDetMain0"
    },
    {
        linguagem: 'CARTAO 7',
        nome: 'R$12.36',
        img: "https://th.bing.com/th/id/OIP.oru-V2rGQt6PTXXuh2qFDgHaIq?w=850&h=995&rs=1&pid=ImgDetMain"
    },
    {
        linguagem: 'CARTAO 8',
        nome: 'R$38.80',
        img: "https://th.bing.com/th/id/OIP.mODcPB1d4wGyUkxwD63-yQHaHa?w=2000&h=2000&rs=1&pid=ImgDetMain"
    },
    {
        linguagem: 'CARTAO 9',
        nome: 'R$14.87',
        img: "https://th.bing.com/th/id/OIP.O5S1ytIVLkSa8ZuqsNOongHaHa?rs=1&pid=ImgDetMain"
    },
    {
        linguagem: 'CARTAO 10',
        nome: 'R$53.40',
        img: "https://th.bing.com/th/id/OIP.O5S1ytIVLkSa8ZuqsNOongHaHa?rs=1&pid=ImgDetMain"
    }
];


app.get('/cartoes', (req, res) => {
    res.status(200).json({ cartoes });
    console.log('Cartões devolvidos com sucesso!');
});

app.post('/cartoes', (req, res) => {
    const { linguagem, nome, img } = req.body;

    if (linguagem == null || linguagem === '') {
        res.status(400).json({ mensagem: 'linguagem do cartão invalido!' });
        console.log('Novo cartão não cadastrado, linguagem invalido!');

    } else if (nome == null || nome === '') {
        res.status(400).json({ mensagem: 'nome do cartão invalido!' });
        console.log('Novo cartão não cadastrado, nome invalidao');

    } else if (img == null || img === '') {
        res.status(400).json({ mensagem: 'Imagem do cartão invalido!' });
        console.log('Novo cartão não cadastrado, imagem invalida');

    } else {
        cartoes.push({ linguagem: linguagem, nome: nome, img: img });
        res.status(201).json({ mensagem: 'Cartão cadastrado com sucesso!!' });
        console.log('Novo cartão cadastrado!');
    }
});

app.delete('/cartoes', (req, res) => {
    const { cartao } = req.body;

    if (!cartao || cartao < 0 || cartao > cartoes.length) {
        res.status(400).json({ mensagem: 'Cartão ' + cartao + ' não encontrado' });
        console.log('Cartão não deletado');
    } else {
        cartoes.splice(cartao, 1);
        res.status(201).json({ mensagem: 'Cartão ' + cartao + ' deletado' });
        console.log('Cartão ' + cartao + ' deletado');
    }

});

app.put('/cartoes', (req, res) => {
    let { linguagem, nome, img, id } = req.body;
    if (!id || id < 0 || id > cartoes.length) {
        res.status(400).json({ mensagem: 'Cartão ' + id + ' não encontrado' });
        console.log('Cartão não atualizado, id invalido.');
    } else {
        if (linguagem === null || linguagem === '') {
            linguagem = cartoes[id].linguagem;
        } 
        if (nome == null || nome === '') {
            nome = cartoes[id].nome;
        } 
        if (img == null || img === '') {
            img = cartoes[id].img;
        }
        cartoes[id] = { linguagem: linguagem, nome: nome, img: img };
        res.status(201).json({ mensagem: 'Cartão ' + id + ' atualizado' });
        console.log('Cartão ' + id + ' atualizado');
    }
});

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});

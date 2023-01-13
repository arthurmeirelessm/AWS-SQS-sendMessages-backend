import aws from "aws-sdk";
import express from "express";


const app = express()

app.set('view engine', 'ejs')

app.use(express.json());

aws.config.update({ region: 'sa-east-1' })

const sqs = new aws.SQS();

app.get('/', (req, res) => {
    res.render('../view/index')
})

app.post('/solicitar_imagens', (req, res) => {

    const qtdImagens = req.body.qtdImagens
    console.log(qtdImagens)

    for (let i = 0; i < qtdImagens; i++) {
        sqs.sendMessage(
            {
                MessageBody: "Gerar Mensagem!",
                QueueUrl: 'https://sqs.sa-east-1.amazonaws.com/517554276447/DeixeSeuLike'

            },
            (error, data) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log("Successo.", data)

                }
            }
        )
    }

    //console.log(req.body)
    res.json({
        body: req.body,
        
        ok: true
    })
})

app.listen(3000, () => {
    console.log("APP RODANDO!")
})


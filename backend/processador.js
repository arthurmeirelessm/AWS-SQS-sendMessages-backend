import aws from "aws-sdk"
import fs from "fs"
import cron from "node-cron"
import request from "request"

// Setar a region que está o seu SQS criado lá na AWS
aws.config.update({ region: 'sa-east-1' })

const sqs = new aws.SQS()

const gerarImagem = (nomeArquivo) => {
    request('https://cataas.com/cat').pipe(
        fs.createWriteStream('imgs/' + nomeArquivo + '.png')
    )
}

const processar = () => {
    sqs.receiveMessage(
        {
            MaxNumberOfMessages: 10,
            QueueUrl: 'https://sqs.sa-east-1.amazonaws.com/517554276447/DeixeSeuLike',
            WaitTimeSeconds: 5
        },
        (error, data) => {
            if (error) {
                console.log("Error: " + error)
            } else if (data.Messages) {
                console.log('Mensagem recebidas: ' + data.Messages.length)
                data.Messages.forEach(element => {
                    gerarImagem(element.MessageId)
                }
                )
            }
        }
    )
}


cron.schedule('*/5*****', () => {
    processar()
})
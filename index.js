var avro = require('avro-js');
var fs = require('fs')

var type = avro.parse('./Paciente.json');

const stream = fs.createReadStream('clinica-xpto-schema.json', 'utf-8')

let data = ""
stream.on('data', chunk => data += chunk)
stream.on('end', _ => {
    let pacientes = JSON.parse(data)

    let invalids = 0

    for (paciente of pacientes) {
        let isNotValid = !type.isValid(paciente)

        if (isNotValid) {
            invalids++            
            console.log(`paciente invalido`, JSON.stringify(paciente))
        }
    }

    console.log(`dados invalidos ${invalids}/${pacientes.length} - ${(invalids/pacientes.length) * 100}%`, )
})
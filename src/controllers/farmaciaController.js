const mongoose = require('mongoose')
const FarmaciaSchema = require('../models/farmaciaSchema')

// Cadastra uma farmácia
const cadastrarFarmacia = async (request, response) => {
  
  // Criando objeto Farmácia
  const farmacia = new FarmaciaSchema({
    _id: new mongoose.Types.ObjectId(),
    nome: request.body.nome,
    telefoneDeContato: request.body.telefoneDeContato,
    whatsapp: request.body.whatsapp,
    horarioFuncionamento: request.body.horarioFuncionamento,
    endereco: request.body.endereco,
    numero: request.body.numero,
    localizacao: request.body.localizacao,
    // plantao: request.body.plantao,
    criadoEm: request.body.criadoEm
  })

  // Não permitir o cadastro de uma farmácia que já existe
  const farmaciaJaExiste = await FarmaciaSchema.findOne({
    nome: request.body.nome
  })

  if (farmaciaJaExiste) {
    return response.status(400).json({
      message: 'Farmácia já cadastrada!'
    })
  }

  // Salvando no banco
  try {
    const novaFarmacia = await farmacia.save()
    response.status(201).json({
      success: 'Farmácia cadastrada com sucesso!',
      novaFarmacia
    })
  } catch (err) {
    response.status(400).json({
      error: err.message
    })
  }
}

// Retorna todas as farmácias cadastradas
const mostrarFarmacias = async (request, response) => {
  try {
    const farmacias = await FarmaciaSchema.find().populate('endereco')

    response.status(200).json({
      success: 'Farmácias listadas com sucesso!',
      farmacias
    })
  } catch (err) {
    response.status(500).json({
      error: err.message
    })
  }
}

// Retorna uma farmácia pelo id
const getById = async (request, response) => {
  try {
    const farmacia = await FarmaciaSchema.findById({ _id: request.params.id }).populate('endereco')
    if (farmacia == null) {
      return response.status(404).json({
        message: 'Farmácia não encontrada!'
      })
    }
    response.status(200).json(farmacia)
  } catch (err) {
    response.status(500).json({
      error: err.message
    })
  }
}

// Retorna uma farmácia por nome
const getByNome = async (request, response) => {
  try {

    const nomeFarmacia = request.params.nome
    
    const farmacias = await FarmaciaSchema.find()
    const farmaciasEncontradas = farmacias.filter(farmacia => farmacia.nome.toLowerCase().includes(nomeFarmacia.toLowerCase()))

    if (farmaciasEncontradas.length == 0) {
      return response.status(404).json({
        message: 'Farmácia não encontrada!'
      })
    }
    response.status(200).json(farmaciasEncontradas)
  } catch (err) {
    response.status(500).json({
      error: err.message
    })
  }
}



// Retorna uma farmácia por bairro = Parque Dourado
const mostrarFarmaciasParqueDourado = async (request, response) => {
  try {
    const farmacias = await FarmaciaSchema.find().populate("endereco")  
    const farmaciasFiltradas = farmacias.filter(farmacia => farmacia.endereco.bairro == "parque dourado")

    response.status(200).json(farmaciasFiltradas)

  } catch (err) {
    response.status(500).json({
      error: err.message
    })
  }
}

// Retorna uma farmácia por bairro = centro
const mostrarFarmaciasCentro = async (request, response) => {
  try {
    const farmacias = await FarmaciaSchema.find().populate("endereco")
    
    const farmaciasFiltradas = farmacias.filter(farmacia => farmacia.endereco.bairro == "centro")
    
    response.status(200).json({
      success: "Farmácias listados com sucesso!",
      farmaciasFiltradas
    })

  } catch (err) {
    response.status(500).json({
      error: err.message
    })
  }
}
// Retorna uma farmácia por bairro = jk
const mostrarFarmaciasJK = async (request, response) => {
  try {
    const farmacias = await FarmaciaSchema.find().populate("endereco")
    const farmaciasFiltradas = farmacias.filter(farmacia => farmacia.endereco.bairro == "jk")
    console.log(farmaciasFiltradas)

    response.status(200).json({
      success: "Farmácias listados com sucesso!",
      farmacia: farmaciasFiltradas
    })
  } catch (err) {
    response.status(500).json({
      error: err.message
    })
  }
}

// Atualiza uma farmácia
const atualizarFarmacia = async (request, response) => {
  try {

    const farmacia = await FarmaciaSchema.findById(request.params.id)

    if (farmacia == null || farmacia == "") {
      return response.status(404).json({
        message: "Farmácia não encontrada!"
      })
    }
    if (request.body.nome != null) {
      farmacia.nome = request.body.nome
    }
    if (request.body.telefoneDeContato != null) {
      farmacia.telefoneDeContato = request.body.telefoneDeContato
    }
    if (request.body.whatsapp != null) {
      farmacia.whatsapp = request.body.whatsapp
    }
    if (request.body.horarioFuncionamento != null) {
      farmacia.horarioFuncionamento = request.body.horarioFuncionamento
    }
    if (request.body.endereco != null) {
      farmacia.endereco = request.body.endereco
    }
    if (request.body.numero != null) {
      farmacia.numero = request.body.numero
    }
    if (request.body.localizacao != null) {
      farmacia.localizacao = request.body.localizacao
    }
    if (request.body.plantao != null) {
      farmacia.plantao = request.body.plantao
    }
    if (request.body.criadoEm != null) {
      farmacia.criadoEm = request.body.criadoEm
    }
    const farmaciaAtualizada = await farmacia.save()
    // response.json(farmaciaAtualizada)
    response.status(201).json({
      success: 'Farmácia atualizada com sucesso!',
      farmaciaAtualizada
    })
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
}

// Deleta uma farmácia
const deletarFarmacia = async (request, response) => {
  try {
    const farmacia = await FarmaciaSchema.findById({ _id: request.params.id })
    if (farmacia == null || farmacia == '') {
      return response.status(404).json({
        message: 'Farmácia não encontrada!'
      })
    }
    await farmacia.remove()
    response.status(204).json({
      success: 'Farmácia deletada com sucesso!'
    })
  } catch (err) {
    response.status(500).json({ error: err.message })
  }
}

module.exports = {
  cadastrarFarmacia,
  mostrarFarmacias,
  getById,
  getByNome,
  mostrarFarmaciasParqueDourado,
  mostrarFarmaciasCentro,
  mostrarFarmaciasJK,
  atualizarFarmacia,
  deletarFarmacia
}

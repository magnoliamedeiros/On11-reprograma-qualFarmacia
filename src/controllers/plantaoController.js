const mongoose = require("mongoose")
const PlantaoSchema = require("../models/plantaoSchema")
const FarmaciaSchema = require("../models/farmaciaSchema")
// const EnderecoSchema = require("../models/enderecoSchema")

// Cadastra um plantão
const cadastrarPlantao = async (request, response) => {

  const plantao = new PlantaoSchema({
    _id: new mongoose.Types.ObjectId(),
    farmacia: request.body.farmacia,
    // endereco: request.body.endereco,
    dataPlantao: request.body.dataPlantao,
    horarioPlantao: request.body.horarioPlantao,
    criadoEm: request.body.criadoEm
  })

  try {
    const novoPlantao = await plantao.save()

    response.status(201).json({
      success: "Plantão cadastrado com sucesso!",
      novoPlantao
    })
    
  } catch (err) {
    response.status(400).json({
      error: err.message,
    })
  }
}

// Retorna todos os plantões
const mostrarPlantao = async (request, response) => {
  try {

    const listaPlantao = await PlantaoSchema.find()
    const listaFarmacias = await FarmaciaSchema.find().populate('endereco')

    const farmaciaPopulada = listaPlantao.map( (plantao, index) => {
    
      const farmacia = listaFarmacias.find(farmacia => {
      
        const existeFarmacia = farmacia._id.toString() == plantao.farmacia.toString()
        return existeFarmacia
      
      })
      plantao.farmacia = farmacia
      return plantao
    });

    response.status(200).json({
      success: "Plantão listados com sucesso!",
      plantao: farmaciaPopulada
    })

  } catch (err) {
    response.status(500).json({
      error: err.message
    })
  }
}

// Retorna um plantão por id
const getById = async (request, response) => {
  try {
    const plantao = await PlantaoSchema.findById({ _id: request.params.id })
    if (plantao == null) {
      return response.status(404).json({
        message: "Plantão não encontrado!"
      })
    }
    response.status(200).json(plantao)
  } catch (err) {
    response.status(404).json({
      message: "Desculpa! Não existe plantão cadastrado", 
      error: err.message
    })
  }
}

// Deleta um plantão
const deletarPlantao = async (request, response) => {
  try {
    const plantao = await PlantaoSchema.findById({ _id: request.params.id })
    if (plantao == null || plantao == "") {
      return response.status(404).json({
        message: "Plantão não encontrado!"
      })
    }
    await plantao.remove()
    response.json({
      success: "Plantão deletado com sucesso!"
    })
  } catch (err) {
    response.status(500).json({
      error: err.message
    })
  }
}

module.exports = {
  cadastrarPlantao,
  mostrarPlantao,
  getById,
  deletarPlantao
}

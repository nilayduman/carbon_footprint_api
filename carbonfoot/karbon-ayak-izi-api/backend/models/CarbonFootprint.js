const mongoose = require('mongoose');

const carbonFootprintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  electricity_consumption: { type: Number, required: true }, 
  car_travel: { type: Number, required: true },             
  public_transport: { type: Number, required: true },       
  air_travel: { type: Number, required: true },             
  water_consumption: { type: Number, required: true },      
  waste_production: { type: Number, required: true },       
  recycling: {
    plastic: { type: Number, default: 0 },                 
    metal: { type: Number, default: 0 },                   
  },
  calculatedCO2: { type: Number, required: true },         
  date: { type: Date, default: Date.now },                  
});

// Modeli oluşturmak içim
const CarbonFootprint = mongoose.model('CarbonFootprint', carbonFootprintSchema);

// Modülü dışa aktar
module.exports = CarbonFootprint;


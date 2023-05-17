const sequelize = require('../utils/connection');
const Role = require('../models/Role');
const Shift = require('../models/Shift');
const Specialty = require('../models/Specialty');
const User = require('../models/User');
const AppointmentStatus = require('../models/AppointmentStatus');
const Vet = require('../models/Vet');
const Pet = require('../models/Pet');
require("../models")

const roles = [
    {name: "admin"}, {name: "vet"}, {name: "client"}
]
const shift = [{name: "Mañana"}, {name: "Tarde"}]

const specialities = [{name: "Medicina interna"}, {name: "Cirugía"}, 
    {name: "Dermatología"}, {name: "Oncología"}, {name: "Odontología"}, 
    {name: "Oftalmología"}, {name: "Cardiología "}, {name: "Neurología"},
    {name: "Emergencia y cuidados críticos"}]

const appointmentStatus = [{name: "active"}, {name: "completed"}, {name: "canceled"}]

const users = [
  { firstname: "User1", lastname: 'Cardenas', email: 'john1@example.com', 
  password: "12345678", roleId: 3, isVerified: true },
  { firstname: "User2", lastname: 'Cardenas', email: 'john2@example.com', 
  password: "12345678", roleId: 3, isVerified: true },
  { firstname: "User3", lastname: 'Cardenas', email: 'john3@example.com', 
  password: "12345678", roleId: 3, isVerified: true },
  { firstname: "Vet4", lastname: 'Cardenas', email: 'john4@example.com', 
  password: "12345678", roleId: 2, isVerified: true },
  { firstname: "Vet5", lastname: 'Cardenas', email: 'john5@example.com', 
  password: "12345678", roleId: 2, isVerified: true },
  { firstname: "Vet6", lastname: 'Cardenas', email: 'john6@example.com', 
  password: "12345678", roleId: 2, isVerified: true },
  { firstname: "Vet7", lastname: 'Cardenas', email: 'john7@example.com', 
  password: "12345678", roleId: 2, isVerified: true },
  { firstname: "Admin8", lastname: 'Cardenas', email: 'john8@example.com', 
  password: "12345678", roleId: 1, isVerified: true }
];

const vets = [
  {userId: 4, specialtyId: 2}, {userId: 5, specialtyId: 3}, {userId: 6, specialtyId: 4}, {userId: 7, specialtyId: 5}
]

const pets = [
  {name: "pet 1", specie: "Perro", userId: 1}, {name: "Pet 2", specie: "Tortugas", userId: 1}, 
  {name: "Pet 3", specie: "Gatos", userId: 2}, {name: "Pet 4", specie: "Hurones", userId: 2}, 
  {name: "Pet 5", specie: "Hamsters", userId: 3}, {name: "Pet 6", specie: "Gatos", userId: 3}, 
  {name: "Pet 7", specie: "Hurones", userId: 1}, {name: "Pet 8", specie: "Pájaros", userId: 2}, 
  {name: "Pet 9", specie: "Gatos", userId: 1}, {name: "Pet 10", specie: "Perro", userId: 3}, 
]
// Perros
// Gatos
// Conejos
// Hurones
// Ratas
// Ratones
// Cobayas
// Chinchillas
// Hamsters
// Jerbos
// Ardillas
// Pájaros (como canarios, periquitos, loros, etc.)
// Reptiles (como serpientes, iguanas, lagartos, etc.)
// Peces
// Tortugas
// Anfibios (como ranas, sapos, etc.)

async function seedCreate() {
    await Role.bulkCreate(roles)
    await Shift.bulkCreate(shift)
    await Specialty.bulkCreate(specialities)
    await User.bulkCreate(users);
    await AppointmentStatus.bulkCreate(appointmentStatus)
    await Vet.bulkCreate(vets)
    await Pet.bulkCreate(pets)
}


// agregar force: true a la configuración de Sequelize
sequelize.sync({ force: true }).then(async () => {
  await seedCreate();
  console.log('Seeding completed successfully.');
}).catch((error) => {
  console.error('Error seeding database:', error);
});


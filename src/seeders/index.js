const sequelize = require('../utils/connection');
const Category = require('../models/Category');
const User = require('../models/User');
const Role = require('../models/Role');
require("../models")

const categories = [
    {name: "Destacados"}, {name: "Viniles"}, {name: "Cintas"}, 
    {name: "Apliques"}, {name: "Decorables"}, {name: "Herramientas"}, 
    {name: "Creaciones"}
  ]



const users = [
  { firstname: "Isabel", lastname: 'Urdaneta', email: 'isabelcurdanetam48@gmail.com', 
  password: "12345678", roleId: 1, isVerified: true }]

const role = [
  {name: "Admin"}, {name: "Client"},
]
//   { firstname: "User2", lastname: 'Cardenas', email: 'john2@example.com', 
//   password: "12345678", roleId: 3, isVerified: true },
//   { firstname: "User3", lastname: 'Cardenas', email: 'john3@example.com', 
//   password: "12345678", roleId: 3, isVerified: true },
//   { firstname: "Vet4", lastname: 'Cardenas', email: 'john4@example.com', 
//   password: "12345678", roleId: 2, isVerified: true },
//   { firstname: "Vet5", lastname: 'Cardenas', email: 'john5@example.com', 
//   password: "12345678", roleId: 2, isVerified: true },
//   { firstname: "Vet6", lastname: 'Cardenas', email: 'john6@example.com', 
//   password: "12345678", roleId: 2, isVerified: true },
//   { firstname: "Vet7", lastname: 'Cardenas', email: 'john7@example.com', 
//   password: "12345678", roleId: 2, isVerified: true },
//   { firstname: "Admin8", lastname: 'Cardenas', email: 'john8@example.com', 
//   password: "12345678", roleId: 1, isVerified: true }
// ];


async function seedCreate() {
    await Role.bulkCreate(role)
    await Category.bulkCreate(categories)
    await User.bulkCreate(users);
}


// agregar force: true a la configuración de Sequelize
sequelize.sync({ force: true }).then(async () => {
  await seedCreate();
  console.log('Seeding completed successfully.');
}).catch((error) => {
  console.error('Error seeding database:', error);
});


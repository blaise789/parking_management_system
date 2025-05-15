import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
const prisma = new PrismaClient()
async function main() {
    const password = await hash('{Test123}', 10)
    // const categories = await prisma.menuCategory.createMany({
    //     data: [
    //       { name: 'Drink' },
    //       { name: 'Starter' },
    //       { name: 'Appetizer' },
    //       { name: 'Dessert' },
    //       { name: 'Main' }
    //     ],
    //     skipDuplicates: true
    //   });
    
    const user = await prisma.user.upsert({
        where: { email: "precieuxadmin@gmail.com" },
        update: {},
        create: {
            email: 'precieuxadmin@gmail.com',
            firstName:"preciuex",
            lastName:"admin",
            password,
            role: 'ADMIN',

        },
        
    })
    console.log({ user })
    
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
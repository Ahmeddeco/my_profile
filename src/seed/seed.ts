import prisma from "@/lib/prisma"
import { faker } from '@faker-js/faker'


async function main() {
  console.log('⏳ Starting database cleanup...')

  // Clean up existing data to avoid unique constraint errors on rerun
  await prisma.project.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verification.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ Database cleaned up successfully.')

  console.log('🌱 Starting database seeding...')

  // 1. Create a static Admin user for development and testing
  const adminUser = await prisma.user.create({
    data: {
      name: 'Ahmed Abdelfattah (Admin)',
      email: 'admin@flux.com',
      emailVerified: true,
      role: 'admin',
      image: faker.image.avatar(),
    },
  })
  console.log(`👑 Admin user created: ${adminUser.email}`)

  // 2. Create a pool of Clients and Regular Users
  const clientsList = []
  const totalClients = 5
  const totalRegularUsers = 5

  // Create clients who will own projects
  for (let i = 0; i < totalClients; i++) {
    const client = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        emailVerified: faker.datatype.boolean(),
        role: 'client',
        image: faker.image.avatar(),
      },
    })
    clientsList.push(client)
  }
  console.log(`👥 Created ${totalClients} users with the (client) role.`)

  // Create regular users
  for (let i = 0; i < totalRegularUsers; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        emailVerified: faker.datatype.boolean(),
        role: 'user',
        image: faker.image.avatar(),
      },
    })
  }
  console.log(`👤 Created ${totalRegularUsers} regular users with the (user) role.`)

  // 3. Create projects and link them to Clients
  console.log('🚀 Starting project creation...')

  for (const clientUser of clientsList) {
    // Each client will have 1 to 3 random projects
    const projectsCount = faker.number.int({ min: 1, max: 3 })

    for (let p = 0; p < projectsCount; p++) {
      await prisma.project.create({
        data: {
          title: faker.commerce.productName() + ' Platform',
          miniDescription: faker.commerce.productDescription(),
          description: faker.lorem.paragraphs(3),
          mainImage: faker.image.url(),
          images: [
            faker.image.url(),
            faker.image.url(),
            faker.image.url(),
          ],
          userId: clientUser.id, // Linking project to current client
        },
      })
    }
  }
  console.log('✅ Projects created and linked to clients successfully.')

  // 4. Create dummy verification data as examples
  console.log('🔑 Creating temporary verification data...')
  for (let i = 0; i < 3; i++) {
    await prisma.verification.create({
      data: {
        id: faker.string.uuid(),
        identifier: faker.internet.email().toLowerCase(),
        value: faker.string.alphanumeric(32),
        expiresAt: faker.date.future(),
      },
    })
  }

  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error occurred during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
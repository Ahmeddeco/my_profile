import { ProductType, Role } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"
import { faker } from '@faker-js/faker'


async function main() {
  console.log('⏳ Starting database seeding...')

  // 1. Clean existing data (Optional but recommended for fresh seeding)
  console.log('🧹 Cleaning existing data...')
  await prisma.project.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verification.deleteMany()
  await prisma.user.deleteMany()
  console.log('✅ Database cleaned.')

  // 2. Create Admin User
  console.log('👤 Creating admin user...')
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@flux-agency.com',
      emailVerified: true,
      role: Role.admin,
      mobile: '+201000000000',
      city: 'Sadat City',
      state: 'Menofia',
      country: 'Egypt',
    },
  })
  console.log(`✅ Admin created with ID: ${admin.id}`)

  // 3. Create Clients and their Projects
  console.log('👥 Creating clients and projects...')
  const clientRoles = [Role.client, Role.user]

  for (let i = 0; i < 5; i++) {
    // Generate fake client details
    const clientName = faker.person.fullName()
    const client = await prisma.user.create({
      data: {
        name: clientName,
        email: faker.internet.email(),
        emailVerified: faker.datatype.boolean(),
        role: faker.helpers.arrayElement(clientRoles),
        mobile: faker.phone.number({ style: 'international' }),
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
      },
    })

    console.log(`   └─ Created User: ${client.name} (${client.role})`)

    // Create 2-3 projects for each client
    const projectCount = faker.number.int({ min: 2, max: 3 })
    for (let j = 0; j < projectCount; j++) {
      const projectTitleEn = faker.commerce.productName() + ' Platform'
      const projectSlug = faker.helpers.slugify(projectTitleEn).toLowerCase() + '-' + faker.string.alphanumeric(5)

      const project = await prisma.project.create({
        data: {
          slug: projectSlug,
          titleEn: projectTitleEn,
          titleAr: `منصة ${faker.commerce.productName()}`, // Fallback Arabic title
          miniDescriptionEn: faker.company.catchPhrase(),
          miniDescriptionAr: 'وصف مصغر باللغة العربية يوضح طبيعة هذا المشروع الإبداعي.',
          descriptionEn: faker.lorem.paragraphs(2),
          descriptionAr: 'تفاصيل المشروع بالكامل باللغة العربية تشمل كل المميزات والخصائص البرمجية التي تم بناؤها.',
          url: faker.internet.url(),
          mainImage: faker.image.url(),
          images: [
            faker.image.url(),
            faker.image.url(),
          ],
          type: faker.helpers.arrayElement([ProductType.web, ProductType.mobile, ProductType.ai]),
          userId: client.id,
        },
      })

      console.log(`      ├── Project Created: ${project.titleEn} [Type: ${project.type}]`)
    }
  }

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error encountered:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
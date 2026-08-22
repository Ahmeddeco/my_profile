import { BatchStatus, EnrollmentStatus, Field, ProductType, Role } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"

async function main() {
  console.log('Starting database seeding...')

  // 1. Clean existing data
  console.log('Cleaning up existing database records...')
  await prisma.enrollment.deleteMany()
  await prisma.group.deleteMany()
  await prisma.course.deleteMany()
  await prisma.article.deleteMany()
  await prisma.project.deleteMany()
  await prisma.branch.deleteMany()
  await prisma.academy.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()

  // 2. Create Users
  console.log('Seeding users...')
  const usersData = [
    { name: 'Ahmed Mansour', email: 'ahmed.admin@example.com', mobile: '+201000000001', role: Role.admin },
    { name: 'Sarah Hassan', email: 'sarah.owner@example.com', mobile: '+201000000002', role: Role.owner },
    { name: 'Omar Khaled', email: 'omar.instructor@example.com', mobile: '+201000000003', role: Role.instructor },
    { name: 'Mona Elsayed', email: 'mona.instructor@example.com', mobile: '+201000000004', role: Role.instructor },
    { name: 'Tarek Ibrahim', email: 'tarek.client@example.com', mobile: '+201000000005', role: Role.client },
    { name: 'Youssef Ali', email: 'youssef.student@example.com', mobile: '+201000000006', role: Role.user },
    { name: 'Nour Mahmoud', email: 'nour.student@example.com', mobile: '+201000000007', role: Role.user },
    { name: 'Laila Hany', email: 'laila.student@example.com', mobile: '+201000000008', role: Role.user },
  ]

  const createdUsers = await Promise.all(
    usersData.map((user) => prisma.user.create({ data: user }))
  )

  const [admin, owner, instructor1, instructor2, client, student1, student2, student3] = createdUsers

  // 3. Create Academies & Branches
  console.log('Seeding academies and branches...')
  const academy1 = await prisma.academy.create({
    data: {
      name: 'Tech Code Academy',
      slug: 'tech-code-academy',
      tel: '+20222334455',
      description: 'Leading academy for software development and modern technologies',
      userId: owner.id,
      branches: {
        create: [
          {
            name: 'Cairo Main Branch',
            slug: 'cairo-main-branch',
            city: 'Cairo',
            country: 'Egypt',
            lat: 30.0444,
            lng: 31.2357,
            tel: '+20222334456',
          },
          {
            name: 'Alexandria Branch',
            slug: 'alexandria-branch',
            city: 'Alexandria',
            country: 'Egypt',
            lat: 31.2001,
            lng: 29.9187,
            tel: '+20333445566',
          },
        ],
      },
    },
    include: { branches: true },
  })

  // 4. Create Courses
  console.log('Seeding courses...')
  const course1 = await prisma.course.create({
    data: {
      titleAr: 'تطوير تطبيقات الويب الكاملة باستخدام Next.js',
      titleEn: 'Fullstack Web Development with Next.js',
      slug: 'fullstack-nextjs-dev',
      descriptionAr: 'دورة شاملة لبناء تطبيقات ويب حديثة ومتكاملة من البداية إلى الاحتراف.',
      descriptionEn: 'Comprehensive course to build modern fullstack web applications from scratch.',
      detailsAr: 'تتضمن الدورة: React, Next.js, TypeScript, Prisma, و PostgreSQL.',
      detailsEn: 'Includes: React, Next.js, TypeScript, Prisma, and PostgreSQL.',
      price: 2500,
      discountAmount: 300,
      mainImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      images: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97'],
      field: Field.web,
      instructorId: instructor1.id,
    },
  })

  const course2 = await prisma.course.create({
    data: {
      titleAr: 'تطوير تطبيقات الهواتف باستخدام Flutter',
      titleEn: 'Mobile App Development with Flutter',
      slug: 'mobile-app-flutter',
      descriptionAr: 'تعلم بناء تطبيقات تعمل على iOS و Android باستعمال كود واحد.',
      descriptionEn: 'Learn to build cross-platform apps for iOS and Android with a single codebase.',
      detailsAr: 'تغطي الدورة لغة Dart و State Management و REST APIs.',
      detailsEn: 'Covers Dart language, State Management, and REST APIs.',
      price: 2000,
      discountAmount: 200,
      mainImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
      images: ['https://images.unsplash.com/photo-1551650975-87deedd944c3'],
      field: Field.mobile,
      instructorId: instructor2.id,
    },
  })

  const course3 = await prisma.course.create({
    data: {
      titleAr: 'أساسيات الذكاء الاصطناعي وتعلم الآلة',
      titleEn: 'AI & Machine Learning Fundamentals',
      slug: 'ai-ml-fundamentals',
      descriptionAr: 'دورة مدخلية إلى عالم الذكاء الاصطناعي واستخدام مكتبات بايثون.',
      descriptionEn: 'Introductory course to AI using Python libraries.',
      detailsAr: 'تتضمن: Python, NumPy, Pandas, Scikit-Learn.',
      detailsEn: 'Includes: Python, NumPy, Pandas, Scikit-Learn.',
      price: 3000,
      discountAmount: null,
      mainImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a',
      images: [],
      field: Field.ai,
      instructorId: instructor1.id,
    },
  })

  // 5. Create Groups
  console.log('Seeding groups...')
  const group1 = await prisma.group.create({
    data: {
      title: 'Group Web-01 (Fall 2026)',
      slug: 'group-web-01-fall-2026',
      courseId: course1.id,
      branchId: academy1.branches[0].id,
      startAt: new Date('2026-09-15T16:00:00Z'),
      endAt: new Date('2026-12-15T18:00:00Z'),
      capacity: 15,
      price: 2200,
      status: BatchStatus.OPEN,
    },
  })

  const group2 = await prisma.group.create({
    data: {
      title: 'Group Mobile-01 (Alex)',
      slug: 'group-mobile-01-alex',
      courseId: course2.id,
      branchId: academy1.branches[1].id,
      startAt: new Date('2026-10-01T14:00:00Z'),
      endAt: new Date('2026-12-01T16:00:00Z'),
      capacity: 12,
      price: 1800,
      status: BatchStatus.UPCOMING,
    },
  })

  // 6. Create Enrollments
  console.log('Seeding enrollments...')
  await prisma.enrollment.createMany({
    data: [
      { userId: student1.id, groupId: group1.id, price: 2200, status: EnrollmentStatus.CONFIRMED },
      { userId: student2.id, groupId: group1.id, price: 2200, status: EnrollmentStatus.CONFIRMED },
      { userId: student3.id, groupId: group2.id, price: 1800, status: EnrollmentStatus.PENDING },
    ],
  })

  // 7. Create Articles
  console.log('Seeding articles...')
  await prisma.article.createMany({
    data: [
      {
        titleAr: 'مستقبل تطوير الويب في عام 2026',
        titleEn: 'The Future of Web Development in 2026',
        slug: 'future-of-web-dev-2026',
        descriptionAr: 'استعراض لأهم التقنيات والاتجاهات الحديثة في عالم الويب.',
        descriptionEn: 'Overview of the latest technologies and web trends.',
        topicAr: 'محتوى تفصيلي يشرح Server Actions ودور AI في كتابة الكود...',
        topicEn: 'Detailed content covering Server Actions and AI assistance...',
        mainImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
        userId: instructor1.id,
      },
      {
        titleAr: 'لماذا يجب أن تتعلم Flutter اليوم؟',
        titleEn: 'Why You Should Learn Flutter Today?',
        slug: 'why-learn-flutter-today',
        descriptionAr: 'مقارنة بين Flutter والإطارات الأخرى لتطوير الهواتف.',
        descriptionEn: 'Comparison between Flutter and other mobile frameworks.',
        topicAr: 'محتوى يشرح الأداء الممتاز لـ Flutter والمجتمع النشط...',
        topicEn: 'Content explaining Flutter performance and community...',
        mainImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
        userId: instructor2.id,
      },
    ],
  })

  // 8. Create Projects
  console.log('Seeding projects...')
  await prisma.project.createMany({
    data: [
      {
        titleAr: 'تطبيق إدارة المهام الذكي',
        titleEn: 'Smart Task Manager',
        slug: 'smart-task-manager',
        miniDescriptionAr: 'تطبيق ويب لتنظيم المهام باستخدام الذكاء الاصطناعي.',
        miniDescriptionEn: 'Web app for task management using AI.',
        descriptionAr: 'مشروع ختامي يتضمن نظام مصادقة، تنبيهات، وإدارة فريق.',
        descriptionEn: 'Final project with auth, notifications, and team features.',
        url: 'https://smart-tasks.demo.com',
        mainImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b',
        type: ProductType.web,
        userId: client.id,
      },
      {
        titleAr: 'تطبيق متجر للتجارة الإلكترونية',
        titleEn: 'E-Commerce Mobile App',
        slug: 'ecommerce-mobile-app',
        miniDescriptionAr: 'تطبيق متجر إلكتروني متكامل للهواتف.',
        miniDescriptionEn: 'Full-featured mobile e-commerce application.',
        descriptionAr: 'يدعم بوابة دفع إلكترونية وتتبع الشحنات.',
        descriptionEn: 'Supports payment gateway and order tracking.',
        url: 'https://shop-mobile.demo.com',
        mainImage: 'https://images.unsplash.com/photo-1556742049-0a674685c700',
        type: ProductType.mobile,
        userId: student1.id,
      },
    ],
  })

  console.log('✅ Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during database seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
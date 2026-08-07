import { ProductType, Role } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"
import { faker } from '@faker-js/faker'


async function main() {
  console.log('⏳ Starting database seeding...')
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


const author = await prisma.user.upsert({
  where: {
    email: "ahmed@example.com" // الإيميل المحدد للكاتب
  },
  update: {}, // لا داعي لتحديث أي بيانات إذا كان موجوداً
  create: {
    name: "أحمد محمد",
    email: "ahmed@example.com",
    role: "admin",
  },
})

console.log(`سيتم إسناد المقالات للمستخدم: ${author.name} (ID: ${author.id})`)

// 2. قائمة المقالات المعرفة وفقاً للـ Schema
const articles = [
  {
    userId: author.id,
    slug: "building-ai-agents-with-nextjs-and-mastra",
    titleAr: "بناء وكلاء الذكاء الاصطناعي (AI Agents) باستخدام Next.js و Mastra",
    titleEn: "Building Autonomous AI Agents with Next.js and Mastra",
    descriptionAr: "دليل شامل لبناء وإنشاء وكلاء ذكاء اصطناعي موجهين بالمهام وتكاملهم بسلاسة داخل تطبيقات Next.js باستخدام إطار العمل Mastra.",
    descriptionEn: "A comprehensive guide on building task-driven AI agents and seamlessly integrating them into Next.js applications using Mastra framework.",
    topicAr: `
        <h2>مقدمة في بناء وكلاء الذكاء الاصطناعي</h2>
        <p>تعتبر إطارات عمل الذكاء الاصطناعي الحديثة مثل <strong>Mastra</strong> نقلة نوعية في كيفية تطوير تطبيقات الويب المعززة بالذكاء الاصطناعي. عند دمج Mastra مع <strong>Next.js 15/16</strong>، يمكنك بناء وكلاء يتفاعلون مع الأدوات الخارجية (Tools) وينفذون مهاماً معقدة مثل استدعاء API ومعالجة البيانات بشكل مستقل.</p>
        
        <h3>لماذا نستخدم Mastra مع Next.js؟</h3>
        <ul>
          <li><strong>الأداء العالي:</strong> Mastra مصمم خصيصاً لبيئات TypeScript و Server Actions في Next.js.</li>
          <li><strong>دعم كامل للأدوات (Tools & Workflows):</strong> يسهل تعريف الأدوات وتمريرها للوكيل.</li>
          <li><strong>التكامل مع النماذج المختلفة:</strong> يمكنك استخدام Google GenAI أو OpenAI بسلاسة.</li>
        </ul>

        <h3>كيفية البدء</h3>
        <p>قم بإنشاء وكيل Mastra بسيط واستدعائه داخل Route Handler أو Server Action في Next.js لإرجاع إجابات منظمة ومحدثة لحظياً.</p>
      `,
    topicEn: `
        <h2>Introduction to Building AI Agents</h2>
        <p>Modern AI frameworks like <strong>Mastra</strong> represent a paradigm shift in how we build AI-enhanced web applications. When integrating Mastra with <strong>Next.js 15/16</strong>, you can construct agents that interact with external tools and execute complex workflows independently.</p>
        
        <h3>Why Use Mastra with Next.js?</h3>
        <ul>
          <li><strong>Type Safety & Performance:</strong> Built natively for TypeScript and Next.js Server Actions.</li>
          <li><strong>Robust Workflows & Tools:</strong> Easily define tools and chains for your agents.</li>
          <li><strong>Model Agnostic:</strong> Effortlessly switch between Google GenAI, OpenAI, and other LLMs.</li>
        </ul>

        <h3>Getting Started</h3>
        <p>Create a basic Mastra agent and invoke it inside a Next.js Route Handler or Server Action to handle streaming and structured responses.</p>
      `,
    mainImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200"
    ]
  },
  {
    userId: author.id,
    slug: "streamline-rag-workflows-using-mastra-and-nextjs",
    titleAr: "تحسين أنظمة الـ RAG وتوليد النصوص بالذكاء الاصطناعي في Next.js بواسطة Mastra",
    titleEn: "Streamlining RAG Workflows in Next.js using Mastra Engine",
    descriptionAr: "تعلم كيفية إعداد مسارات RAG (Retrieval-Augmented Generation) المتقدمة لربط بياناتك الخاصة بنماذج الذكاء الاصطناعي بكل سهولة.",
    descriptionEn: "Learn how to build advanced Retrieval-Augmented Generation (RAG) workflows connecting your custom datasets with AI LLMs using Mastra and Next.js.",
    topicAr: `
        <h2>ما هو الـ RAG وكيف يغير تطوير الويب؟</h2>
        <p>يتيح تقنية <strong>Retrieval-Augmented Generation (RAG)</strong> لنماذج الذكاء الاصطناعي الوصول إلى قواعد بيانات مخصصة ومستندات خاصة للحصول على إجابات دقيقة دون الحاجة لإعادة تدريب النموذج.</p>

        <h3>دور Mastra في إدارة الـ RAG Workflows</h3>
        <p>تساعدك Mastra في تقسيم النصوص إلى Vector Embeddings وحفظها واسترجاعها بسهولة عند استعلام المستخدم في تطبيق Next.js.</p>

        <h3>خطوات التنفيذ الأساسية:</h3>
        <ol>
          <li>تجميع البيانات وتجهيز المجموعات (Chunks).</li>
          <li>توليد الـ Embeddings واستخدام قاعدة بيانات موجهة (Vector DB).</li>
          <li>استدعاء Mastra Agent داخل مكونات Next.js لإظهار الإجابات المحدثة.</li>
        </ol>
      `,
    topicEn: `
        <h2>What is RAG and Why Is It Essential?</h2>
        <p><strong>Retrieval-Augmented Generation (RAG)</strong> empowers AI models to query external databases and custom private documents, returning accurate context-aware responses without retraining.</p>

        <h3>Mastra's Role in Managing RAG Workflows</h3>
        <p>Mastra provides seamless abstractions for chunking text, generating embeddings, and retrieving contextually relevant data within Next.js apps.</p>

        <h3>Core Implementation Steps:</h3>
        <ol>
          <li>Data ingestion and chunking strategy.</li>
          <li>Generating Embeddings & storing them in a Vector DB.</li>
          <li>Invoking Mastra agents inside Next.js components to serve real-time user queries.</li>
        </ol>
      `,
    mainImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200"
    ]
  },
  {
    userId: author.id,
    slug: "testing-and-evaluating-ai-workflows-with-vitest-and-mastra",
    titleAr: "اختبار وتقييم سير عمل الذكاء الاصطناعي باستخدام Vitest و Mastra",
    titleEn: "Testing and Evaluating AI Workflows using Vitest and Mastra",
    descriptionAr: "استكشف أساليب اختبار استجابات وكلاء الذكاء الاصطناعي والتأكد من جودتها وموثوقيتها في تطبيقات Next.js باستعمال Vitest.",
    descriptionEn: "Explore strategies to test AI agent responses and ensure reliability in Next.js applications using Vitest and Mastra evaluations.",
    topicAr: `
        <h2>أهمية اختبار التطبيقات الذكية</h2>
        <p>على عكس البرامج التقليدية، تتميز مخرجات نماذج الذكاء الاصطناعي بعدم التحديد الكامل (Non-deterministic). لذا يصبح اختبار الوكلاء مسألة حيوية لضمان جودة النظام.</p>

        <h3>استخدام Vitest مع Mastra</h3>
        <p>يمكنك كتابة اختبارات وحدة (Unit Tests) باستخدام <strong>Vitest</strong> للتحقق من المخرجات المتوقعة واستدعاءات الأدوات (Tool Calls) التي ينفذها الوكيل قبل النشر إلى البيئة الحية (Production).</p>
      `,
    topicEn: `
        <h2>The Importance of Testing AI Systems</h2>
        <p>Unlike traditional software, AI LLM outputs can be non-deterministic. Thus, testing and evaluating AI agents becomes critical to ensuring accuracy and system reliability.</p>

        <h3>Leveraging Vitest with Mastra</h3>
        <p>By integrating <strong>Vitest</strong>, you can write automated unit tests to validate tool executions and agent outputs before deploying your Next.js application to production.</p>
      `,
    mainImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200"
    ]
  }
]

// 3. إضافة أو تحديث المقالات
for (const article of articles) {
  await prisma.article.upsert({
    where: { slug: article.slug },
    update: article,
    create: article,
  })
}

console.log("تم إضافة المقالات وربطها بالمستخدم بنجاح!")


main()
  .catch((e) => {
    console.error('❌ Seeding error encountered:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
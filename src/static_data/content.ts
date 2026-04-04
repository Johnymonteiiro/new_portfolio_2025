import thumb from "../app/assets/capa.png";

export const content_data = {
  service: {
    service_1: {
      title: "Web Development",
      description: `I develop modern websites and software featuring high performance, clean code, and seamless AI integration. My focus is on creating intuitive experiences and scalable solutions that drive real impact. If you're looking for innovation and results, let's build the future together! 🚀`,
    },
    service_2: {
      title: "UI/UX Design",
      description: `As a UI designer, I craft modern, user-centered designs that blend aesthetics, functionality, and seamless experiences. By focusing on detail and accessibility, I create interfaces that connect with users and elevate digital products. Let's bring your vision to life with precision! 🎨`,
    },
  },

  projects: [
    {
      title: "Noria UI Components",
      recent: true,
      link: "https://noria-core.vercel.app/",
      category: "WEB DEVELOPMENT",
      thumbnail_image: thumb,
      description: `An open-source library of high-performance React components built for speed and accessibility. Designed to streamline the development workflow with a focus on modularity.`,
    },
    {
      title: "Fintech Dashboard",
      recent: false,
      link: "https://johnymonteiro.netlify.app/",
      category: "UI DESIGN",
      thumbnail_image: thumb,
      description: `A complex financial interface focused on data visualization and user experience. Built with a clean aesthetic to make financial management intuitive and stress-free.`,
    },
    {
      title: "AI Chat Assistant",
      recent: false,
      link: "https://johnymonteiro.netlify.app/",
      category: "WEB DEVELOPMENT",
      thumbnail_image: thumb,
      description: `Integration of OpenAI's API into a custom-built interface, providing real-time support and automated workflows for small businesses.`,
    },
    {
      title: "E-commerce Redesign",
      recent: false,
      link: "https://johnymonteiro.netlify.app/",
      category: "UI DESIGN",
      thumbnail_image: thumb,
      description: `Full visual overhaul for a fashion retailer, focusing on mobile-first navigation and increasing conversion rates through improved checkout flows.`,
    },
  ],

  sidebar: [
    { section_title: "About" },
    { section_title: "Service" },
    { section_title: "Projects" },
    { section_title: "My journey" },
    { section_title: "Latest blog" },
    { section_title: "Recommendations" },
  ],
  blog: [
    {
      title: "Fetching data with Next.js 14",
      description: "Modern data fetching in Next.js.",
      data: new Date(),
      slug: "fetching-data-nextjs-14",
      content: [
        {
          sub_title: "Server Fetch",
          text: `Fetch data directly in Server Components with built-in caching and performance benefits.`,
          language: "ts",
          code: `async function getData() {
  const res = await fetch('https://api.example.com', {
    cache: 'force-cache'
  });
  return res.json();
}`,
        },
        {
          sub_title: "Revalidation",
          text: `Control how often data updates using incremental static regeneration.`,
          language: "ts",
          code: null,
        },
      ],
    },
    {
      title: "NestJS Controller Basics",
      description: "Create REST endpoints with NestJS.",
      data: new Date(),
      slug: "nestjs-controller",
      content: [
        {
          sub_title: "Controller",
          text: `Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. 
          It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).`,
          language: "ts",
          code: `@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return [{ id: 1, name: 'John' }];
  }
}`,
        },
        {
          sub_title: "Providers",
          text: `Providers are a core concept in Nest. Many of the basic Nest classes, such as services, repositories, factories, and helpers, can be treated as providers. The key idea behind a provider is that it can be injected as a dependency, allowing objects to form various relationships with each other. The responsibility of "wiring up" these objects is largely handled by the Nest runtime system.`,
          language: "ts",
          code: `
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
`,
        },
        {
          sub_title: "Modules",
          text: `Every Nest application has at least one module, the root module, which serves as the starting point for Nest to build the application graph. This graph is an internal structure that Nest uses to resolve relationships and dependencies between modules and providers. While small applications might only have a root module, this is generally not the case. Modules are highly recommended as an effective way to organize your components. For most applications, you'll likely have multiple modules, each encapsulating a closely related set of capabilities.`,
          language: "ts",
          code: `import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}

`,
        },
      ],
    },
    {
      title: "gRPC Communication",
      description: "Define contracts using protobuf.",
      data: new Date(),
      slug: "grpc-communication",
      content: [
        {
          sub_title: "Proto File",
          text: `gRPC uses .proto files to define strict service contracts between systems.`,
          language: "proto",
          code: `syntax = "proto3";

service UserService {
  rpc FindOne (UserById) returns (User);
}`,
        },
      ],
    },
    {
      title: "Semantic Search",
      description: "Search by meaning using embeddings.",
      data: new Date(),
      slug: "semantic-search",
      content: [
        {
          sub_title: "Embeddings",
          text: `Transform text into vectors to enable similarity-based search.`,
          language: "ts",
          code: `const embedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: "What is AI?"
});`,
        },
      ],
    },
    {
      title: "JWT Auth in NestJS",
      description: "Secure APIs with JWT.",
      data: new Date(),
      slug: "jwt-auth",
      content: [
        {
          sub_title: "Strategy",
          text: `JWT enables stateless authentication across distributed systems.`,
          language: "ts",
          code: `@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({ secretOrKey: 'secret' });
  }
}`,
        },
      ],
    },
    {
      title: "RabbitMQ Events",
      description: "Async communication with events.",
      data: new Date(),
      slug: "rabbitmq-events",
      content: [
        {
          sub_title: "Emit Event",
          text: `Send events to decouple services and enable async workflows.`,
          language: "ts",
          code: `this.client.emit('user_created', {
  id: '1'
});`,
        },
      ],
    },
    {
      title: "React Server Components",
      description: "Improve performance with server rendering.",
      data: new Date(),
      slug: "react-server-components",
      content: [
        {
          sub_title: "Example",
          text: `Server Components reduce bundle size by running logic on the server.`,
          language: "tsx",
          code: `export default async function Page() {
  const res = await fetch('https://api.example.com');
  const data = await res.json();

  return <div>{data.title}</div>;
}`,
        },
      ],
    },
  ],
};

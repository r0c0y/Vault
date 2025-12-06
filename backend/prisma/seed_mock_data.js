const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const mockData = [
    {
        name: "Google DeepMind",
        email: "deepmind@google.com",
        projects: [
            {
                title: "DeepMind Research",
                description: "Research from Google DeepMind.",
                repoUrl: "https://github.com/google-deepmind/deepmind-research",
                liveUrl: "https://www.deepmind.com/",
                techStack: ["Python", "JAX", "TensorFlow", "AI"],
                images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/DeepMind_Logo.svg/1200px-DeepMind_Logo.svg.png"]
            }
        ],
        socials: { github: "https://github.com/google-deepmind" }
    },
    {
        name: "Lingo.dev",
        email: "hello@lingo.dev",
        projects: [
            {
                title: "Lingo.dev",
                description: "The best way to learn languages.",
                repoUrl: "https://github.com/lingodotdev/lingo.dev",
                liveUrl: "https://lingo.dev/en",
                techStack: ["TypeScript", "React", "Next.js"],
                images: ["https://lingo.dev/og.png"]
            }
        ],
        socials: { github: "https://github.com/lingodotdev", discord: "https://lingo.dev/go/discord" }
    },
    {
        name: "Hashnode",
        email: "hello@hashnode.com",
        projects: [
            {
                title: "Hashnode Starter Kit",
                description: "Hashnode Headless Starter Kit.",
                repoUrl: "https://github.com/Hashnode/starter-kit",
                liveUrl: "https://hashnode.com/headless",
                techStack: ["TypeScript", "React", "TailwindCSS", "GraphQL"],
                images: ["https://cdn.hashnode.com/res/hashnode/image/upload/v1611242318063/7-vG1kL8x.png"]
            }
        ],
        socials: { github: "https://github.com/Hashnode" }
    },
    {
        name: "Operese",
        email: "contact@operese.org",
        projects: [
            {
                title: "Operese",
                description: "Open source operating system research.",
                repoUrl: "https://codeberg.org/Operese/operese",
                techStack: ["C", "Assembly", "OS"],
                images: []
            }
        ],
        socials: {}
    },
    {
        name: "Meta Research",
        email: "research@meta.com",
        projects: [
            {
                title: "Segment Anything 2",
                description: "Segment Anything Model 2.",
                repoUrl: "https://github.com/facebookresearch/segment-anything-2",
                liveUrl: "https://sam2.metademolab.com/demo",
                techStack: ["Python", "PyTorch", "AI"],
                images: ["https://github.com/facebookresearch/segment-anything-2/raw/main/assets/sam2_logo.png"]
            },
            {
                title: "Segment Anything",
                description: "Segment Anything Model.",
                repoUrl: "https://github.com/facebookresearch/segment-anything",
                techStack: ["Python", "PyTorch", "AI"],
                images: ["https://github.com/facebookresearch/segment-anything/raw/main/assets/model_diagram.png"]
            }
        ],
        socials: { github: "https://github.com/facebookresearch" }
    },
    {
        name: "Oumi",
        email: "contact@oumi.ai",
        projects: [
            {
                title: "Oumi",
                description: "Open Universal Machine Intelligence.",
                repoUrl: "https://github.com/oumi-ai/oumi",
                liveUrl: "https://oumi.ai/",
                techStack: ["Python", "AI", "ML"],
                images: ["https://oumi.ai/images/og-image.png"]
            }
        ],
        socials: { github: "https://github.com/oumi-ai" }
    },
    {
        name: "AsyncAPI",
        email: "info@asyncapi.com",
        projects: [
            {
                title: "AsyncAPI Specification",
                description: "Open source tools to easily build and maintain your event-driven architecture.",
                repoUrl: "https://github.com/asyncapi",
                liveUrl: "https://www.asyncapi.com/en",
                techStack: ["JavaScript", "Go", "Java"],
                images: ["https://www.asyncapi.com/img/social/card.png"]
            }
        ],
        socials: { github: "https://github.com/asyncapi" }
    },
    {
        name: "RethinkDNS",
        email: "hello@rethinkdns.com",
        projects: [
            {
                title: "Serverless DNS",
                description: "Fast, private, and secure DNS.",
                repoUrl: "https://github.com/serverless-dns/serverless-dns",
                liveUrl: "https://rethinkdns.com/configure",
                techStack: ["Go", "Cloudflare Workers"],
                images: ["https://rethinkdns.com/assets/images/logo.svg"]
            }
        ],
        socials: { github: "https://github.com/serverless-dns" }
    },
    {
        name: "Motia",
        email: "contact@motia.dev",
        projects: [
            {
                title: "Motia",
                description: "Developer tools and resources.",
                repoUrl: "https://github.com/MotiaDev/motia",
                liveUrl: "https://motia.dev/",
                techStack: ["TypeScript", "React"],
                images: ["https://motia.dev/og.png"]
            }
        ],
        socials: { github: "https://github.com/MotiaDev" }
    },
    {
        name: "Ola Krutrim",
        email: "contact@olakrutrim.com",
        projects: [
            {
                title: "Krutrim AI",
                description: "India's own AI model.",
                repoUrl: "https://github.com/ola-krutrim",
                liveUrl: "https://ai-labs.olakrutrim.com/",
                techStack: ["Python", "AI", "LLM"],
                images: ["https://ai-labs.olakrutrim.com/images/og.png"]
            }
        ],
        socials: { github: "https://github.com/ola-krutrim" }
    },
    {
        name: "Cactus Compute",
        email: "hello@cactuscompute.com",
        projects: [
            {
                title: "Cactus",
                description: "Compute platform.",
                repoUrl: "https://github.com/cactus-compute/cactus",
                liveUrl: "https://www.cactuscompute.com/",
                techStack: ["Rust", "Wasm"],
                images: ["https://www.cactuscompute.com/og.png"]
            }
        ],
        socials: { github: "https://github.com/cactus-compute" }
    },
    {
        name: "Cua",
        email: "hello@cua.ai",
        projects: [
            {
                title: "Cua",
                description: "AI tools.",
                repoUrl: "https://github.com/trycua/cua",
                liveUrl: "https://cua.ai/",
                techStack: ["TypeScript", "AI"],
                images: ["https://cua.ai/og.png"]
            }
        ],
        socials: { github: "https://github.com/trycua" }
    },
    {
        name: "Supermemory",
        email: "hello@supermemory.ai",
        projects: [
            {
                title: "Supermemory",
                description: "Build your own second brain with AI.",
                repoUrl: "https://github.com/supermemoryai/supermemory",
                liveUrl: "https://supermemory.ai/",
                techStack: ["TypeScript", "Next.js", "AI"],
                images: ["https://supermemory.ai/og.png"]
            }
        ],
        socials: { github: "https://github.com/supermemoryai" }
    },
    {
        name: "OpenRocket",
        email: "contact@openrocket.info",
        projects: [
            {
                title: "OpenRocket",
                description: "Model rocket simulator.",
                repoUrl: "https://github.com/openrocket/openrocket",
                liveUrl: "https://openrocket.info/",
                techStack: ["Java", "Swing"],
                images: ["https://openrocket.info/images/logo.png"]
            }
        ],
        socials: { github: "https://github.com/openrocket" }
    },
    {
        name: "Napkin Math",
        email: "sirupsen@example.com",
        projects: [
            {
                title: "Napkin Math",
                description: "Techniques for quick performance estimation.",
                repoUrl: "https://github.com/sirupsen/napkin-math",
                liveUrl: "https://www.youtube.com/watch?v=IxkSlnrRFqc",
                techStack: ["Math", "Performance"],
                images: []
            }
        ],
        socials: { github: "https://github.com/sirupsen" }
    },
    {
        name: "Starship",
        email: "hello@starship.rs",
        projects: [
            {
                title: "Starship",
                description: "The minimal, blazing-fast, and infinitely customizable prompt for any shell.",
                repoUrl: "https://github.com/starship/starship",
                liveUrl: "https://starship.rs/",
                techStack: ["Rust", "Shell"],
                images: ["https://starship.rs/icon.png"]
            }
        ],
        socials: { github: "https://github.com/starship" }
    },
    {
        name: "Symfony AI",
        email: "hello@symfony.com",
        projects: [
            {
                title: "Symfony AI",
                description: "AI integration for Symfony.",
                repoUrl: "https://github.com/symfony/ai",
                liveUrl: "https://ai.symfony.com/",
                techStack: ["PHP", "Symfony", "AI"],
                images: ["https://symfony.com/logos/symfony_black_03.svg"]
            }
        ],
        socials: { github: "https://github.com/symfony" }
    },
    {
        name: "Entropy Research",
        email: "contact@randomlabs.ai",
        projects: [
            {
                title: "Random Labs",
                description: "Research labs.",
                repoUrl: "https://github.com/entropy-research",
                liveUrl: "https://randomlabs.ai/",
                techStack: ["Research", "AI"],
                images: []
            }
        ],
        socials: { github: "https://github.com/entropy-research" }
    },
    {
        name: "Context Labs",
        email: "hello@contextlabs.ai",
        projects: [
            {
                title: "Context Labs",
                description: "Context Labs projects.",
                repoUrl: "https://github.com/context-labs",
                techStack: ["AI", "Context"],
                images: []
            }
        ],
        socials: { github: "https://github.com/context-labs" }
    },
    {
        name: "Mem0",
        email: "hello@mem0.ai",
        projects: [
            {
                title: "Mem0",
                description: "The memory layer for AI apps.",
                repoUrl: "https://github.com/mem0ai/mem0",
                liveUrl: "https://mem0.ai/",
                techStack: ["Python", "AI", "Memory"],
                images: ["https://mem0.ai/images/og.png"]
            }
        ],
        socials: { github: "https://github.com/mem0ai" }
    },
    {
        name: "APITable",
        email: "hello@apitable.com",
        projects: [
            {
                title: "APITable",
                description: "API-first, low-code platform for building collaborative apps.",
                repoUrl: "https://github.com/apitable/apitable",
                liveUrl: "https://aitable.ai/",
                techStack: ["TypeScript", "React", "Java"],
                images: ["https://apitable.com/og.png"]
            }
        ],
        socials: { github: "https://github.com/apitable" }
    }
];

async function main() {
    console.log('Start seeding ...');
    const password = await bcrypt.hash('Password123!', 10);

    for (const data of mockData) {
        const user = await prisma.user.upsert({
            where: { email: data.email },
            update: {},
            create: {
                email: data.email,
                name: data.name,
                password: password,
                socials: data.socials,
                isVerified: true,
            },
        });

        console.log(`Created/Updated user: ${user.name} (${user.email})`);

        for (const projectData of data.projects) {
            await prisma.project.create({
                data: {
                    title: projectData.title,
                    description: projectData.description,
                    repoUrl: projectData.repoUrl,
                    liveUrl: projectData.liveUrl,
                    techStack: projectData.techStack,
                    images: projectData.images,
                    isPublished: true,
                    userId: user.id,
                },
            });
            console.log(`  - Created project: ${projectData.title}`);
        }
    }
    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

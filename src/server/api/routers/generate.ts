import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";

import { Configuration, OpenAIApi } from "openai";
import {env} from "~/env.mjs";
import {b64Image} from "~/data/b64Image";
import AWS from 'aws-sdk';

const BUCKET_NAME = env.BUCKET_NAME;
const AWS_REGION = env.AWS_REGION;

const configuration = new Configuration({
    apiKey: env.DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
    region: AWS_REGION,
});

async function generateIcon(prompt: string): Promise<string> {
    if (env.MOCK_DALLE === 'true') {
        return b64Image;
    }
    const response = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
        response_format: 'b64_json'
    });

    return response.data.data[0]?.b64_json || "";
}

export const generateRouter = createTRPCRouter({
    generateIcon: protectedProcedure.input(z.object({
        prompt: z.string(),
        color: z.string(),
        shape: z.string(),
        style: z.string(),
        numberOfIcons: z.number().min(1).max(10),
    })).mutation(async ({ctx, input}) => {
        const {count} = await ctx.prisma.user.updateMany({
            where: {
                id: ctx.session.user.id,
                credits: {
                    gte: 1
                },
            },
            data: {
                credits: {
                    decrement: 1
                }
            }
        });

        if (count === 0) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'you do not have enough credits'
            });
        }

        const finalPrompt = `a modern ${input.shape} icon in ${input.color} of ${input.prompt}, ${input.style}, minimialistic, high quality, trending on art station, unreal engine graphics quality`;

        const base64EncodedImage = await generateIcon(finalPrompt);

        const icon = await ctx.prisma.icon.create({
            data: {
                prompt: input.prompt,
                userId: ctx.session.user.id
            }
        });

        await s3.putObject({
            Bucket: BUCKET_NAME,
            Body: Buffer.from(base64EncodedImage, 'base64'),
            Key: icon.id,
            ContentEncoding: 'base64',
            ContentType: 'image/png'
        }).promise();

        return {
            imageUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${icon.id}`
        }
    })
});

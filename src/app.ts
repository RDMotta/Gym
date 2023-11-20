import fastify from "fastify";
import { ZodError } from "zod";
import { appRoutes } from "./http/routes";

export const app = fastify();
app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({
                message: 'Validation.',
                content: error.format()
            })
    }

    return reply
        .status(400)
        .send({
            message: 'Internal server error.',
            content: error.message
        })
})
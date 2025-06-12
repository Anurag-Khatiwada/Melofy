import winston from 'winston';

const {combine, timestamp,json, errors, splat, colorize, simple} = winston.format

const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production"?"info":"debug",
    format: combine(
        timestamp(),
        errors({stack: true}),
        splat(),
        json()
    ),
    defaultMeta: {service:'api-gateway'},
    transports:[
        new winston.transports.Console({
            format:combine(
                colorize(),
                simple()
            )
        }),
        new winston.transports.File({filename: 'error.log', level:'error'}),
        new winston.transports.File({filename: "conbined.log"})
    ]
})

export default logger;
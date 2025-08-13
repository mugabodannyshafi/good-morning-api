import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: false,
            envFilePath: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env',
        }),
        TypeOrmModule.forRoot({
            type: process.env.DB_CONNECTION as 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT ?? '5432', 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [
                Submission
            ],
            synchronize: process.env.NODE_ENV !== 'production',
            autoLoadEntities: true,
        }),
    ],
})
export class DatabaseModule {}

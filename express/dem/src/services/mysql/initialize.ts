import connection from "./connection";
import fs from 'fs';
import path from 'path';

async function initializeDatabase() {
    console.log('Initializing database...');

    const useConnection = await connection;

    try {
        await useConnection.beginTransaction();

        const sqlInitDir = path.join(__dirname, 'schema/init');
        const sqlFiles = fs.readdirSync(sqlInitDir);

        for (const sqlFile of sqlFiles) {
            const sqlContent = fs.readFileSync(path.join(sqlInitDir, sqlFile), 'utf-8');

            console.log(`Applying ${sqlFile}`);
            await useConnection.execute(sqlContent);
            console.log(`${sqlFile} applied successfully`);
        }

        console.log('Tables created successfully');
        await useConnection.commit();

    } catch (error) {
        await useConnection.rollback();
        console.error('Error initializing database:', error);

    } finally {
        await useConnection.end();
    }
}

initializeDatabase();
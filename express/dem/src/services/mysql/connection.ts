import mysql from 'mysql2/promise';
import config from './config';

const createConnection = async () => {
  try {
    console.log('mysql connection established with:', config);
    const connection = await mysql.createConnection(config);
    return connection;
  } catch (error : any) {
    console.error('Error creating MySQL connection:', error.message);
    throw error;
  }
};

export default createConnection();
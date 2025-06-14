//import {onCall} from "firebase-functions/v2/https";
//import {onDocumentWritten} from "firebase-functions/v2/firestore";
//import * as admin from 'firebase-admin';
//admin.initializeApp();

import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { Client } from 'pg';

const neonDBUrl = defineSecret('NEON_DB_URL');

export const neondb = onRequest(
  {
    secrets: [neonDBUrl],
  },
  async (request, response) => {
    //bypass CORS between angular app and google firebase functions
    //change in production to allow github pages
    const origin = request.get('origin');

    if (origin) {
      console.log('Request origin:', origin); // for debugging in logs
      // Allow any localhost origin (with any port)
      if (origin.startsWith('http://localhost')) {
        response.set('Access-Control-Allow-Origin', origin);
      }
    }

    response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (request.method === 'OPTIONS') {
      response.status(204).send('');
      return;
    }
    const searchTerm = request.query.search?.toString().trim().toLowerCase();
    const productID = parseInt(request.query.productID as string);

    try {
      const client = new Client({
        connectionString: neonDBUrl.value(),
        ssl: {
          rejectUnauthorized: false,
        },
      });
      await client.connect();

      let query: string;
      let values: any[];

      if (!isNaN(productID)) {
        console.log('looking for productID:', productID);
        query = `SELECT * FROM products WHERE id = $1`;
        values = [productID];

        const data = await client.query(query, values);
        await client.end();
        response.status(200).json(data.rows[0]);
        return;
      } else if (searchTerm) {
        console.log('searching for: ', searchTerm);
        query = `SELECT * FROM products WHERE name ILIKE $1`;
        values = [`%${searchTerm}%`];
      } else {
        query = `SELECT * FROM products`;
        values = [];
      }

      const data = await client.query(query, values);
      await client.end();
      response.status(200).json(data.rows);
    } catch (error) {
      console.log('DB Error: ', error);
      response.status(500).send('Internal Server Error');
    }
  }
);

import { NextResponse } from 'next/server';

import db from '@/lib/firebase/firestore';
import { collection, getDocs, addDoc, query, where, Timestamp } from 'firebase/firestore';

/* Example API route
    * GET http://localhost:3000/api/example
*/
export async function GET() {
  try {
    const per_page = 100;
    const page = 1;

    const targetDate = new Date('2025-10-24T00:00:00Z');
    const q = query(
      collection(db, 'sensor_readings'),
      where('timestamp', '<', targetDate)
    );

    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toDate?.().toISOString() ?? data.timestamp
      };
    });

    // pagination
    const total_pages = Math.ceil(results.length / per_page);
    const paginatedResults = results.slice(
      (page - 1) * per_page,
      page * per_page
    );
    

    return NextResponse.json({
      success: true,
      response: {
        data: paginatedResults,
        pagination: {
          total: results.length,
          page: page,
          per_page: per_page,
          total_pages: total_pages
        }
      },
      errors: []
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        response: {
          data: [],
          pagination: {}
        },
        errors: [
          {
            code: 500,
            message: 'server 500 Error'
          }
        ]
      },
      { status: 500 }
    );
  }
}

/*
    * POST http://localhost:3000/api/example
    * Body (JSON):
    * {
    *   "timestamp": "2025-10-24T12:00:00Z",
    *   "temperature": 25.5,
    *   "humidity": 60,
    *   "light": 300,
    *   "sound_level": 50
    * }
*/

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      timestamp,
      temperature,
      humidity,
      light,
      sound_level
    } = body;

    if (!timestamp) {
      return NextResponse.json(
        {
          success: false,
          response: { data: [], pagination: {} },
          errors: [{ code: 400, message: 'timestamp is required' }]
        },
        { status: 400 }
      );
    }

    const ts = Timestamp.fromDate(new Date(timestamp));
    const docRef = await addDoc(collection(db, 'sensor_readings'), {
      timestamp: ts,
      temperature,
      humidity,
      light,
      sound_level
    });

    const newData = {
      id: docRef.id,
      timestamp,
      temperature,
      humidity,
      light,
      sound_level
    };

    return NextResponse.json({
      success: true,
      response: {
        data: newData,
        pagination: {}
      },
      errors: []
    });
  } catch (error) {
    console.error('Firestore POST Error:', error);
    return NextResponse.json(
      {
        success: false,
        response: { data: [], pagination: {} },
        errors: [{ code: 500, message: 'server 500 Error' }]
      },
      { status: 500 }
    );
  }
}

//There will be no to PUT and Delete because its sensor bro
//ei ei
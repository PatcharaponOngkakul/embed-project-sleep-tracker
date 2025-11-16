import { NextResponse } from 'next/server';
import db from '@/lib/firebase/firestore';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

export async function GET(req: Request) {
  try {

    const sensorsRef = collection(db, "sensor_readings");

    const q = query(sensorsRef, orderBy("timestamp", "desc"), limit(1));
    const snapshot = await getDocs(q);

    let latest = null;

    if (snapshot.docs.length) {
      const docData = snapshot.docs[0].data();

      // Convert Firestore Timestamp to ISO string
      latest = {
        id: snapshot.docs[0].id,
        ...docData,
        timestamp: docData.timestamp instanceof Timestamp
          ? docData.timestamp.toDate().toISOString()
          : docData.timestamp
      };
    }

    return NextResponse.json(
      {
        success: true,
        response: { data: latest, pagination: {} },
        errors: []
      },
      { status: 200 }
    );
    
  } catch (err) {
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
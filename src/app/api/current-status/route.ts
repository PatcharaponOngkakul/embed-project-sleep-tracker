import { NextResponse } from 'next/server';

import db from '@/lib/firebase/firestore';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import { time } from 'console';
import { create } from 'domain';

export async function GET() {
    try {

        const sessionQuery = query(
        collection(db, 'sleep_sessions'),
        orderBy('timestamp', 'desc'),
        limit(1)
        );
        const sessionSnap = await getDocs(sessionQuery);

        if (sessionSnap.empty) {
        return NextResponse.json(
            {
            success: false,
            response: { data: [], pagination: {} },
            errors: [{ code: 400, message: 'No active sleep session. Cannot record sensor data.' }]
            },
            { status: 400 }
        );
        }

        const latestSession = sessionSnap.docs[0];

        const firestoreTimestamp = latestSession.data().timestamp;

        const jsDate = firestoreTimestamp.toDate();

        const latestSessionData = {
            id: latestSession.id,
            createAt: jsDate + '',
            type: latestSession.data().type, 
        };

        return NextResponse.json({
        success: true,
        response: {
            data: latestSessionData,
            pagination: {}
        },
        errors: []
        });

    } catch (error) {
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
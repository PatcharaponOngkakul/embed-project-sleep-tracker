import { NextResponse } from 'next/server';
import db from '@/lib/firebase/firestore';
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

type StatusType = "START" | "END";

export async function POST(req: Request) {
  try {

    const url = new URL(req.url);
    const type = url.searchParams.get('type') as StatusType;

    // Validate type
    if (!type || !["START", "END"].includes(type)) {
      return NextResponse.json(
        {
          success: false,
          response: null,
          errors: [{ code: 400, message: 'Invalid type, must be START or END' }]
        },
        { status: 400 }
      );
    }

    // Validate type must not be the same with the latest status
    const statusRef = collection(db, "sleep_sessions");

    const q = query(statusRef, orderBy("timestamp", "desc"), limit(1));
    const snapshot = await getDocs(q);

    let latestType: StatusType | null = null;
    if (snapshot.docs.length) {
        latestType = snapshot.docs[0].data().type as StatusType;
    }

    if (latestType === type) {
        return NextResponse.json(
            {
                success: false,
                response: null,
                errors: [{ code: 400, message: `Cannot send ${type} again. Last status is already ${latestType}` }]
            },
            { status: 400 }
        );
    }
    
    // --------------------------------------------------------------------------------------------
    // This part is to send api to Cloud AI, which should be implemented later

    // const cloudResponse = await fetch('PUT_URL_HERE_NA_JA', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ type, timestamp: Timestamp.now().toDate().toISOString() })
    // });

    // if (!cloudResponse.ok) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       response: null,
    //       errors: [{ code: cloudResponse.status, message: 'Failed to send to Cloud AI' }]
    //     },
    //     { status: cloudResponse.status }
    //   );
    // }
    // --------------------------------------------------------------------------------------------

    // Save status in Firestore
    const docRef = await addDoc(statusRef, {
      type,
      timestamp: Timestamp.now()
    });

    return NextResponse.json(
      {
        success: true,
        response: { 
            id: docRef.id, 
            timestamp: Timestamp.now().toDate().toISOString(),
            type
        },
        errors: []
      },
      { status: 201 }
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
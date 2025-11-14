import { NextResponse } from 'next/server';
import db from '@/lib/firebase/firestore';
import {
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dateRaw = searchParams.get('date');
    const date = dateRaw ?? new Date().toISOString().split('T')[0];

    const [y, m, d] = date.split('-').map(Number);
    if (!y || !m || !d || m < 1 || m > 12 || d < 1 || d > 31) {
      return NextResponse.json(
        {
          success: false,
          response: { data: [], pagination: {} },
          errors: [{ code: 400, message: 'Invalid date format.' }]
        },
        { status: 400 }
      );
    }
    console.log('Parsed date:', { y, m, d });

    //@param year — The full year designation is required for cross-century date accuracy. If year is between 0 and 99 is used, then year is assumed to be 1900 + year.
    // @param monthIndex — The month as a number between 0 and 11 (January to December).
    // @param date — The date as a number between 1 and 31.
    const start = new Date(y, m-1, d);
    const end = new Date(y, m-1, d, 23, 59, 59, 999);

    const sessionQuery = query(
      collection(db, 'session_records'),
      where('date', '>=', start),
      where('date', '<=', new Date(end))
    );

    const sessionSnap = await getDocs(sessionQuery);

    const sleepReport = sessionSnap.docs[0]?.data() ?? null;

    return NextResponse.json({
      success: true,
      response: {
        data: { sleepReport },
        pagination: {}
      },
      errors: []
    });

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

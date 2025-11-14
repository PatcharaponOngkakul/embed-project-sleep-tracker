import { NextResponse } from 'next/server';
import db from '@/lib/firebase/firestore';
import {
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { report } from 'process';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const startDateRaw = searchParams.get('start');
    const endDateRaw = searchParams.get('end');
    const startDate = startDateRaw ?? new Date().toISOString().split('T')[0];
    const endDate = endDateRaw ?? new Date().toISOString().split('T')[0];
    console.log('Received date range:', { startDate, endDate });

    const [s_y, s_m, s_d] = startDate.split('-').map(Number);
    const [e_y, e_m, e_d] = endDate.split('-').map(Number);
    if (!s_y || !s_m || !s_d || s_m < 1 || s_m > 12 || s_d < 1 || s_d > 31 ||
       !e_y || !e_m || !e_d || e_m < 1 || e_m > 12 || e_d < 1 || e_d > 31) {
      return NextResponse.json(
        {
            success: false,
            response: { data: [], pagination: {} },
            errors: [{ code: 400, message: 'Invalid date format.' }]
        },
        { status: 400 }
        );
    }
    //@param year — The full year designation is required for cross-century date accuracy. If year is between 0 and 99 is used, then year is assumed to be 1900 + year.
    // @param monthIndex — The month as a number between 0 and 11 (January to December).
    // @param date — The date as a number between 1 and 31.
    const start = new Date(s_y, s_m-1, s_d);
    const end = new Date(e_y, e_m-1, e_d, 23, 59, 59, 999);

    const sessionQuery = query(
      collection(db, 'session_records'),
      where('date', '>=', start),
      where('date', '<=', new Date(end))
    );

    const sessionSnap = await getDocs(sessionQuery);

    const reports = sessionSnap.docs.map(doc => ({
      id: doc.id,
      date: doc.data().date,
      sleepQualityScore: doc.data().sleepQualityScore,
      totalSleepDuration: doc.data().totalSleepDuration,
    }));

    reports.sort((a, b) => a.date.toDate() - b.date.toDate());

    return NextResponse.json({
      success: true,
      response: {
        data: { reports: reports },
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

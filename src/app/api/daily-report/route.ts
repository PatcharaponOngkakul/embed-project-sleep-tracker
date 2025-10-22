import { NextResponse } from 'next/server';

import db from '@/lib/firebase/firestore';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit
} from 'firebase/firestore';

export async function GET() {
    try {
        // the api call to will be sent in this format GET /api/report?date=YYYY-MM-DD
        // query all session in the provided day and all it data that tied with session id 
        // in the session_record and hourly_record collections
        // return the data in the response
        // all will be contained in data:{}
        // state all session id and its session_records should be under dat:{session: {}}
        // if there many session, there must be one summary that is the average of all session session record
        // state all hourly record under hour data: {report: {}}
        // what it mean by the date is include from 18.00 of the previous day to 17:59 of the provided day

    } catch (error) {
    }

}
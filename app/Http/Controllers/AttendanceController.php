<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;

class AttendanceController extends Controller
{
    public function Submit(Request $request)
    {
        $request->validate([
            'status' => 'required|in:attend,sick,leave,permit,business_trip,remote_work',
            'description' => 'required_if:status,sick,leave,permit,business_trip,remote_work'
        ]);

        $attendance = Attendance::create([
            'user_id' => auth()->user()->id ,
            'status' => $request->status,
            'description' => $request->description
        ]);

        return redirect()->back()->with('success', 'Kehadiran berhasil disimpan');
    }
}

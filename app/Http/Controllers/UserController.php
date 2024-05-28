<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Show a listing of the users
     *
     * @return \Inertia\Inertia
     */
    public function index()
    {
        $users = User::paginate(20);
        return Inertia::render('User/index', ['userList' => $users]);
    }

    /**
     * Show the create form for user
     *
     * @return \Inertia\Inertia
     */
    public function create()
    {
        // Render the Inertia component to display the create user form
        return Inertia::render('User/create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request The request object containing the data to be validated and stored.
     * @throws \Illuminate\Validation\ValidationException If the validation fails.
     * @return void
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password',
        ]);

        User::insert([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role
        ]);

        return redirect()->route('user');
    }

    public function edit(User $user){
        return Inertia::render('User/Edit', ['user' => $user]);
    }

    public function update(Request $request, User $user){
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'password' => 'nullable|min:8',
            'password_confirmation' => 'nullable|same:password',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
            'role' => $request->role
        ]);

        return redirect()->route('user');
    }

    public function destroy(User $user){
        $user->delete();
        return redirect()->route('user');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\RegisterProperty;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect(route('property.index'));
    }

    public function registerProperty()
    {
        $registerPropertyRequests = RegisterProperty::all();
        return Inertia::render(
            'Admin/RegisterProperty',
            [
                'registerPropertyRequests' => $registerPropertyRequests
            ]
        );
    }

    public function destroyRegisterProperty(RegisterProperty $registerProperty, Request $request)
    {
        $registerProperty->all()->find($request->id)->delete();

        return redirect(route('admin.registerProperty'));
    }
}
